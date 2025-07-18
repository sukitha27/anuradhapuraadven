import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Search, Play, Clock, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Video {
  id: string;
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
  title: string;
  videoCount: number;
  thumbnail: string;
  category: string;
}

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Sample data - replace with actual YouTube API integration
  const videos: Video[] = [
    {
      id: '1',
      title: 'Traditional Sri Lankan Rice & Curry Cooking Class',
      description: 'Learn to cook authentic Sri Lankan rice and curry with traditional spices and techniques.',
      thumbnail: '/placeholder.svg',
      duration: '15:30',
      views: '12.5K',
      uploadDate: '2 weeks ago',
      category: 'Cooking Classes'
    },
    {
      id: '2',
      title: 'Anuradhapura Ancient City Tour Highlights',
      description: 'Explore the magnificent ancient ruins and Buddhist temples of Anuradhapura.',
      thumbnail: '/placeholder.svg',
      duration: '22:45',
      views: '8.2K',
      uploadDate: '1 month ago',
      category: 'Tours'
    },
    {
      id: '3',
      title: 'Coconut Roti Making Masterclass',
      description: 'Step-by-step guide to making perfect coconut roti from scratch.',
      thumbnail: '/placeholder.svg',
      duration: '18:20',
      views: '15.8K',
      uploadDate: '3 weeks ago',
      category: 'Cooking Classes'
    },
    {
      id: '4',
      title: 'Sacred Bodhi Tree & Ruwanwelisaya Stupa',
      description: 'Discover the spiritual significance of these iconic Buddhist landmarks.',
      thumbnail: '/placeholder.svg',
      duration: '12:15',
      views: '6.9K',
      uploadDate: '2 months ago',
      category: 'Culture'
    }
  ];

  const playlists: Playlist[] = [
    {
      id: '1',
      title: 'Cooking Classes Complete Series',
      videoCount: 12,
      thumbnail: '/placeholder.svg',
      category: 'Cooking Classes'
    },
    {
      id: '2',
      title: 'Anuradhapura Heritage Tours',
      videoCount: 8,
      thumbnail: '/placeholder.svg',
      category: 'Tours'
    },
    {
      id: '3',
      title: 'Cultural Experiences',
      videoCount: 15,
      thumbnail: '/placeholder.svg',
      category: 'Culture'
    }
  ];

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
            onClick={() => setSelectedCategory(category)}
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
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <Play className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{selectedVideo.title}</h3>
                    <p className="text-muted-foreground">Video player would be embedded here</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
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

      {/* Playlists Section */}
      {filteredPlaylists.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map((playlist) => (
              <Card key={playlist.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={playlist.thumbnail} 
                      alt={playlist.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{playlist.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {playlist.videoCount} videos
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {playlist.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Videos Grid */}
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
    </div>
  );
};

export default Videos;