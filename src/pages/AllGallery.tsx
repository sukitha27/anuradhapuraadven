import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllGallery = () => {
  const navigate = useNavigate();

  const galleryImages = [
    {
      id: 1,
      src: "/images/gallery/G1.png",
      alt: "Mountain landscape hit by sun rays",
      title: "Majestic Mountains"
    },
    {
      id: 2,
      src: "/images/gallery/G2.jpg",
      alt: "Foggy mountain summit",
      title: "Misty Peaks"
    },
    {
      id: 3,
      src: "/images/gallery/G3.jpg",
      alt: "Ocean wave at beach",
      title: "Ocean Waves"
    },
    {
      id: 4,
      src: "/images/gallery/G5.jpg",
      alt: "Trees near rocky mountain under blue skies",
      title: "Natural Wonders"
    },
    {
      id: 5,
      src: "/images/gallery/G6.png",
      alt: "Forest heated by sunbeam",
      title: "Forest Light"
    },
    {
      id: 6,
      src: "/images/gallery/G7.png",
      alt: "Body of water surrounded by trees",
      title: "Serene Waters"
    },
    {
      id: 7,
      src: "/images/gallery/G8.jpg",
      alt: "Bird's eye view of green mountains",
      title: "Aerial Views"
    },
    {
      id: 8,
      src: "images/gallery/G9.jpg",
      alt: "Green grass and rocky mountain during daytime",
      title: "Mountain Meadows"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover-scale"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">All Gallery</h1>
              <p className="text-muted-foreground">Discover the beauty of Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg bg-card shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.alt}</p>
                </div>
              </div>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
};

export default AllGallery;