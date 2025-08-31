import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  MapPin, 
  Award, 
  Camera, 
  Utensils, 
  Home, 
  ArrowRight,
  Star,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anuradhapura Homestay",
    url: typeof window !== 'undefined' ? window.location.origin : 'https://example.com',
    logo: typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : '/favicon.ico',
    sameAs: [] as string[],
  };

  // SEO: title, meta description, canonical
  useEffect(() => {
    document.title = "About Anuradhapura Homestay | Authentic Tours";
    const description =
      "Learn about Anuradhapura Homestay – local experts in bicycle tours, safaris, cookery classes, and homestays in Sri Lanka.";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/about`);
  }, []);

  const milestones = [
    { year: 2022, title: 'The Beginning', desc: 'Our adventure began on January 21st, 2022 – a date that marked the start of something truly special. What started as a simple dream has now blossomed into three incredible years of shared experiences, cultural exchange, and unforgettable memories.' },
    { year: 2022, title: 'Early Success & Global Connections', desc: 'Within just three months of opening our doors, we welcomed our first 100 guests – an achievement that exceeded our wildest expectations. These early travelers came from 10 different countries, bringing with them diverse stories, traditions, and perspectives that enriched our community from the very beginning.' },
    { year: 2023, title: 'Evolution & Growth', desc: '2023 marked a pivotal year in our journey with the launch of The Green Chilli Restaurant – a natural extension of our passion for sharing authentic local cuisine.This wasnt just about serving food, it was about creating a bridge between cultures through the universal language of cooking.' },
    { year: 2024, title: 'Celebrating Milestones', desc: 'By 2024, we had the privilege of hosting over 1,000 happy travelers from around the world. Each guest brought their own unique energy, and together we created a tapestry of shared experiences that continues to inspire us every day.' },
  ];

  const services = [
    { 
      icon: <MapPin className="w-8 h-8" />, 
      title: 'Adventure Tours', 
      desc: 'Bicycle tours through ancient ruins, wildlife safaris, and cultural experiences',
      features: ['Bicycle Adventures', 'Wilpattu Safari', 'Cultural Tours']
    },
    { 
      icon: <Camera className="w-8 h-8" />, 
      title: 'Video Content', 
      desc: 'Professional video documentation of your journey and our destinations',
      features: ['Tour Documentation', 'Cultural Videos', 'Travel Memories']
    },
    { 
      icon: <Utensils className="w-8 h-8" />, 
      title: 'Cookery Classes', 
      desc: 'Learn authentic Sri Lankan cuisine with traditional recipes and techniques',
      features: ['Traditional Recipes', 'Spice Knowledge', 'Hands-on Learning']
    },
    { 
      icon: <Home className="w-8 h-8" />, 
      title: 'Homestay Experience', 
      desc: 'Stay with local families and experience authentic Sri Lankan hospitality',
      features: ['Local Families', 'Cultural Immersion', 'Authentic Experience']
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      country: 'Australia',
      text: 'The bicycle tour through Anuradhapura was absolutely magical. Our guide was knowledgeable and the ancient ruins were breathtaking!',
      rating: 5
    },
    {
      name: 'Marco Silva',
      country: 'Brazil',
      text: 'The cookery class was the highlight of our trip. We learned so much about Sri Lankan spices and culture.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      country: 'UK',
      text: 'Staying at the homestay felt like being part of the family. The warmth and hospitality were incredible.',
      rating: 5
    }
  ];

  const teamMembers = [
    {
      name: 'Rajesh Bandara',
      role: 'Founder & Head Guide',
      description: 'Born and raised in Anuradhapura, passionate about sharing our heritage',
      image: '/images/team1.jpg'
    },
    {
      name: 'Priya Kumari',
      role: 'Cookery Class Instructor',
      description: 'Traditional Sri Lankan chef with 20+ years of culinary expertise',
      image: '/images/team2.jpg'
    },
    {
      name: 'Thilan Fernando',
      role: 'Safari Guide',
      description: 'Wildlife expert and certified nature guide for Wilpattu National Park',
      image: '/images/team3.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">

      {/* Hero Section */}
      <header className="relative min-h-[80vh] md:min-h-[90vh] flex items-stretch overflow-hidden pt-20" aria-label="About Anuradhapura Homestay hero">
        <img
          src="/images/family.jpg"
          alt="Anuradhapura Adventures – welcoming travelers in the ancient city"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.src = '/images/story.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 grid lg:grid-cols-2 gap-8 items-center">
          {/* Copy */}
          <div className="py-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">About Anuradhapura Homestay</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              Your trusted local partner for authentic Sri Lankan experiences in the heart of ancient Anuradhapura.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/tours" className="inline-flex items-center gap-2">
                  Explore Tours
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/videos" className="inline-flex items-center gap-2">
                  Watch Videos
                  <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats card */}
          <aside className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 lg:ml-auto shadow-lg">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">1000+</div>
                <div className="text-muted-foreground">Happy Travelers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">3</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">25+</div>
                <div className="text-muted-foreground">Countries Served</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-3xl font-bold text-foreground">
                  4.9 <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </aside>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Chipmunk Homestay was born from a deep love for our ancient city and a desire to share its wonders with the world. Founded in 2018 by local guide Rajesh Bandara, we started with simple bicycle tours through the sacred ruins.
              </p>
              <p>
                What began as a small family business has grown into a comprehensive experience provider, offering everything from wildlife safaris to authentic homestays. Yet we've never lost sight of our core mission: creating genuine connections between travelers and our rich cultural heritage.
              </p>
              <p>
                Every tour, every meal, every story we share comes from the heart. We believe that travel should be transformative - not just for the places you see, but for the people you meet and the memories you create together.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/images/story.jpg" 
                alt="Our Story" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl">
              Since<br/>2018
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Journey</h2>
          <p className="text-xl text-muted-foreground">Key milestones in our growth</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary"></div>
          {milestones.map((milestone, index) => (
            <div key={index} className="relative mb-12 ml-16">
              <div className="absolute -left-10 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
              <Card className="hover-scale transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-xl text-muted-foreground">Comprehensive experiences for every traveler</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover-scale transition-all duration-300 hover:shadow-xl bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary-foreground">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.desc}</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground">The passionate locals behind your experience</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover-scale transition-all duration-300 hover:shadow-xl overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={counterRef} className="bg-gradient-to-r from-primary to-accent py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-primary-foreground mb-12">What Our Travelers Say</h2>
          <div className="relative">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-primary-foreground mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="text-primary-foreground font-semibold">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-primary-foreground/80">
                  {testimonials[currentTestimonial].country}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let us create an unforgettable experience tailored just for you
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-5 h-5" />
              <span>+94 77 2687753</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-5 h-5" />
              <span>info@anuradhapurahomestay.com</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link to="/tours" className="inline-flex items-center gap-2">
                Explore Tours
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/videos" className="inline-flex items-center gap-2">
                Watch Videos
                <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;