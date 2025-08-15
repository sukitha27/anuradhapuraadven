import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Users, Star, MapPin, ArrowLeft, Calendar, Camera, Utensils, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Tour {
  id: number;
  title: string;
  image: string;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  difficulty: string;
  highlights: string[];
  description: string;
  itinerary: string[];
  included: string[];
  notIncluded: string[];
  bestTime: string;
  bookingInfo: string;
}

const Tours = () => {
  const location = useLocation();
  const { tourId } = location.state || {};
  const [expandedCards, setExpandedCards] = useState<Record<number, { itinerary: boolean; included: boolean }>>({});

  const tours: Tour[] = [
    {
      id: 1,
      title: 'Bicycle Adventure Tour',
      image: '/images/bicycle-tour-lg.jpg',
      duration: '6 hours',
      groupSize: '2-8 people',
      rating: 4.9,
      reviews: 145,
      difficulty: 'Moderate',
      highlights: ['Ancient Ruins', 'Local Villages', 'Sacred Gardens'],
      description: 'Embark on an unforgettable cycling journey through the ancient capital of Sri Lanka. This eco-friendly tour takes you off the beaten path to discover hidden temples, traditional villages, and breathtaking landscapes that have remained unchanged for centuries.',
      itinerary: [
        'Start at Anuradhapura Archaeological Museum',
        'Cycle through Mahamewna Uyana',
        'Visit Ruwanwelisaya Stupa',
        'Explore local village and meet craftsmen',
        'Sacred Bo Tree (Jaya Sri Maha Bodhi)',
        'Traditional lunch at local family home',
        'Thuparamaya Temple complex',
        'Return via scenic countryside routes'
      ],
      included: ['Professional guide', 'High-quality bicycle', 'Safety equipment', 'Traditional lunch', 'Refreshments'],
      notIncluded: ['Personal expenses', 'Tips', 'Transportation to starting point'],
      bestTime: 'Early morning (6:00 AM) or late afternoon (2:00 PM)',
      bookingInfo: 'Book 24 hours in advance. Free cancellation up to 12 hours before the tour.'
    },
    {
      id: 2,
      title: 'Wilpattu Safari Tour',
      image: '/images/wilpattu-safari-lg.jpg',
      duration: '8 hours',
      groupSize: '4-6 people',
      rating: 4.8,
      reviews: 89,
      difficulty: 'Easy',
      highlights: ['Leopard Spotting', 'Bird Watching', 'Natural Pools'],
      description: 'Discover Sri Lanka\'s largest national park and one of the world\'s oldest protected areas. Wilpattu National Park is renowned for its leopard population and diverse wildlife ecosystem, offering an authentic wilderness experience.',
      itinerary: [
        'Early morning pickup from Anuradhapura',
        'Enter Wilpattu National Park',
        'First game drive - Leopard territory',
        'Breakfast in the wilderness',
        'Continue safari - Bird watching hotspots',
        'Lunch at inside park',
        'Afternoon game drive',
        'Visit natural pools (Villus)',
        'Return journey with sunset viewing'
      ],
      included: ['4WD safari vehicle', 'Experienced naturalist guide','Breakfast & lunch','Bottled water'],
      notIncluded: ['Personal expenses', 'Alcoholic beverages', 'Tips for guide'],
      bestTime: 'Early morning departure (5:30 AM) for best wildlife viewing',
      bookingInfo: 'Advance booking required. Weather dependent - alternative dates offered for cancellations.'
    },
    {
      id: 3,
      title: 'Cultural TukTuk Tour',
      image: '/images/tuktuk-tour.jpg',
      duration: '4 hours',
      groupSize: '1-3 people',
      rating: 4.7,
      reviews: 203,
      difficulty: 'Easy',
      highlights: ['Local Markets', 'Temples', 'Street Food'],
      description: 'Experience the authentic local culture of Anuradhapura in the most traditional way possible - aboard a colorful TukTuk! This intimate tour offers genuine interactions with locals and access to hidden gems that larger tours miss.',
      itinerary: [
        'Meet your TukTuk driver and guide',
        'Visit bustling local market',
        'Street food tasting experience',
        'Ancient temple complex exploration',
        'Traditional craft workshop visit',
        'Local family home visit',
        'Cooking demonstration',
        'Scenic route through old city',
        'Sunset viewing at sacred site'
      ],
      included: ['TukTuk with driver', 'Local guide', 'Cooking demo', 'Traditional tea'],
      notIncluded: ['Additional meals', 'Personal shopping', 'Tips'],
      bestTime: 'Late afternoon (3:00 PM) for best market experience and sunset',
      bookingInfo: 'Flexible booking. Can accommodate dietary restrictions with advance notice.'
    }
  ];

  const selectedTour = tourId ? tours.find(tour => tour.id === tourId) : null;
  const displayTours = selectedTour ? [selectedTour] : tours;

  const toggleItinerary = (tourId: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [tourId]: {
        ...prev[tourId],
        itinerary: !prev[tourId]?.itinerary
      }
    }));
  };

  const toggleIncluded = (tourId: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [tourId]: {
        ...prev[tourId],
        included: !prev[tourId]?.included
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Anuradhapura Tours - Explore Ancient Sri Lanka</title>
        <meta 
          name="description" 
          content="Discover our best Anuradhapura tours including bicycle adventures, Wilpattu safaris, and cultural TukTuk experiences. Book your authentic Sri Lankan journey today."
        />
        <link rel="canonical" href="https://www.anuradhapurahomestay.com/tours" />

        {/* Google Tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XPTRVPZKM8"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XPTRVPZKM8');
          `}
        </script>

        <script type="application/ld+json">
          {JSON.stringify([
            // Tour listing
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": tours.map((tour, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product", // Changed from Tour
                  "name": tour.title,
                  "description": tour.description,
                  "image": tour.image,
                  "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "priceCurrency": "USD", // Change to your currency
                    "price": "50" // Change to actual price
                  }
                }
              }))
            },
            // Ratings embedded inside each product
            ...tours.map(tour => ({
              "@context": "https://schema.org",
              "@type": "Product", // Changed from AggregateRating root
              "name": tour.title,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": tour.rating,
                "reviewCount": tour.reviews
              }
            }))
          ])}
        </script>

      </Helmet>

      {/* Header */}
      <header className="bg-gradient-to-r from-primary/10 to-primary/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our <span className="text-primary">Tours</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover the rich heritage and natural beauty of Anuradhapura through our expertly crafted experiences
          </p>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-sm">
          <ol className="flex items-center space-x-2">
            <li><Link to="/" className="text-primary hover:underline">Home</Link></li>
            <li>/</li>
            <li className="text-muted-foreground">Tours</li>
          </ol>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {displayTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-full">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {tour.rating} ({tour.reviews} reviews)
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {tour.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground mb-2">{tour.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {tour.groupSize}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{tour.description}</p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        Best Time
                      </div>
                      <p className="text-foreground">{tour.bestTime}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Shield className="w-4 h-4" />
                        Booking
                      </div>
                      <p className="text-foreground">{tour.bookingInfo}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm" className="w-9 p-0">
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>

              {/* Detailed Information */}
              <div className="border-t bg-muted/30 p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Itinerary */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Itinerary
                      </h4>
                      {tour.itinerary.length > 4 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary h-8 px-2"
                          onClick={() => toggleItinerary(tour.id)}
                        >
                          {expandedCards[tour.id]?.itinerary ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {tour.itinerary
                        .slice(0, expandedCards[tour.id]?.itinerary ? undefined : 4)
                        .map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Included */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        What's Included
                      </h4>
                      {tour.included.length > 4 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary h-8 px-2"
                          onClick={() => toggleIncluded(tour.id)}
                        >
                          {expandedCards[tour.id]?.included ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {tour.included
                        .slice(0, expandedCards[tour.id]?.included ? undefined : 4)
                        .map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Not Included */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Not Included</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {tour.notIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready for Your Adventure?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have experienced the magic of Anuradhapura with us. 
            Book your tour today and create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Calendar className="w-4 h-4" />
              Book Any Tour
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tours;