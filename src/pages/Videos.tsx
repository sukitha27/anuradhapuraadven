import { useState, useEffect, useCallback } from 'react';
import { Search, Play, Clock, Eye, ListVideo, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  category: string;
}

interface Playlist {
  id: string;
  youtubePlaylistId: string;
  title: string;
  description: string;
  videoCount: number;
  thumbnail: string;
  category: string;
  videos?: Video[]; // For cached playlist videos
}

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedIframes, setLoadedIframes] = useState<Set<string>>(new Set());

  // Sample data - in a real app, you'd fetch this from your API
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // Mock data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - replace with real API calls
        const mockVideos: Video[] = [
          {
            id: '1',
            youtubeId: 'dQw4w9WgXcQ', // Replace with real IDs
            title: 'Traditional Sri Lankan Rice & Curry Cooking Class',
            description: 'Learn to cook authentic Sri Lankan rice and curry with traditional spices and techniques.',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
            duration: '15:30',
            views: '12.5K',
            uploadDate: '2 weeks ago',
            category: 'Cooking Classes'
          },
          // Add more videos...
        ];

        const mockPlaylists: Playlist[] = [
          {
            id: '1',
            youtubePlaylistId: 'PLxyz123', // Replace with real IDs
            title: 'Cooking Classes Complete Series',
            description: 'All our cooking class videos in one playlist',
            videoCount: 12,
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
            category: 'Cooking Classes'
          },
          // Add more playlists...
        ];

        setVideos(mockVideos);
        setPlaylists(mockPlaylists);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch playlist videos when a playlist is selected
  useEffect(() => {
    if (selectedPlaylist && !selectedPlaylist.videos) {
      const fetchPlaylistVideos = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Simulate API call to fetch playlist videos
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock data - replace with real API call to YouTube API
          const mockPlaylistVideos: Video[] = [
            {
              id: 'p1',
              youtubeId: 'dQw4w9WgXcQ',
              title: 'Playlist Video 1',
              description: 'First video in the playlist',
              thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
              duration: '10:25',
              views: '5.2K',
              uploadDate: '1 month ago',
              category: selectedPlaylist.category
            },
            // Add more playlist videos...
          ];

          setPlaylists(prev => prev.map(pl => 
            pl.id === selectedPlaylist.id 
              ? { ...pl, videos: mockPlaylistVideos } 
              : pl
          ));
        } catch (err) {
          setError('Failed to load playlist videos. Please try again later.');
          console.error('Error fetching playlist videos:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchPlaylistVideos();
    }
  }, [selectedPlaylist]);

  const categories = ['All', 'Cooking Classes', 'Tours', 'Culture', 'Adventure'];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPlaylists = playlists.filter(playlist => 
    selectedCategory === 'All' || playlist.category === selectedCategory
  );

  // YouTube embed URL generators
  const getYouTubeEmbedUrl = useCallback((videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`;
  }, []);

  const getYouTubePlaylistEmbedUrl = useCallback((playlistId: string) => {
    return `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0&enablejsapi=1`;
  }, []);

  const handleIframeLoad = (id: string) => {
    setLoadedIframes(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const handleBackToPlaylist = () => {
    setSelectedVideo(null);
  };

  const handlePlaylistSelect = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setSelectedVideo(null);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 text-center">
        <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Content</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (loading && !selectedVideo && !selectedPlaylist) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="aspect-video w-full rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Watch Our Videos</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of cooking classes, cultural tours, and heritage experiences
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => {
              setSelectedCategory(category);
              setSelectedVideo(null);
              setSelectedPlaylist(null);
            }}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Video Player */}
      {selectedVideo && (
        <div className="mb-12">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                {loadedIframes.has(selectedVideo.id) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedVideo.youtubeId)}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedVideo.title}
                    onLoad={() => handleIframeLoad(selectedVideo.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Button 
                      onClick={() => handleIframeLoad(selectedVideo.id)}
                      className="flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" /> Load Video
                    </Button>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                  {selectedPlaylist && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleBackToPlaylist}
                      className="flex items-center gap-1"
                    >
                      <ListVideo className="w-4 h-4" /> Back to Playlist
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{selectedVideo.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views} views
                  </span>
                  <span>{selectedVideo.uploadDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Playlist View */}
      {selectedPlaylist && !selectedVideo && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{selectedPlaylist.title}</h2>
            <Button 
              variant="outline" 
              onClick={() => setSelectedPlaylist(null)}
            >
              Back to All Videos
            </Button>
          </div>
          
          {/* Playlist Player */}
          <Card className="max-w-4xl mx-auto mb-8">
            <CardContent className="p-0">
              <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                {loadedIframes.has(selectedPlaylist.id) ? (
                  <iframe
                    src={getYouTubePlaylistEmbedUrl(selectedPlaylist.youtubePlaylistId)}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedPlaylist.title}
                    onLoad={() => handleIframeLoad(selectedPlaylist.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Button 
                      onClick={() => handleIframeLoad(selectedPlaylist.id)}
                      className="flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" /> Load Playlist
                    </Button>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{selectedPlaylist.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedPlaylist.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{selectedPlaylist.videoCount} videos</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Playlist Videos List */}
          <h3 className="text-xl font-semibold mb-4">Videos in this Playlist</h3>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="aspect-video w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedPlaylist.videos?.map(video => (
                <Card 
                  key={video.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {video.duration}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Playlists Section - Only shown when no playlist is selected */}
      {!selectedPlaylist && filteredPlaylists.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map((playlist) => (
              <Card 
                key={playlist.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePlaylistSelect(playlist)}
              >
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden relative">
                    <img 
                      src={playlist.thumbnail} 
                      alt={playlist.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                        {playlist.videoCount} videos
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{playlist.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {playlist.description}
                  </p>
                  <Badge variant="secondary">
                    {playlist.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Videos Grid - Only shown when no video or playlist is selected */}
      {!selectedVideo && !selectedPlaylist && (
        <div>
          <h2 className="text-2xl font-bold mb-6">All Videos</h2>
          {filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <Card 
                  key={video.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {video.duration}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views}
                      </span>
                      <span>{video.uploadDate}</span>
                    </div>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {video.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Videos;