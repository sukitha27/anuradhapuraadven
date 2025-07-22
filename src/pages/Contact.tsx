import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";


const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <div 
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url(/images/cbanner.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white animate-fade-in max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-shadow-lg animate-scale-in">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl opacity-95 mb-8 text-shadow animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Get in touch for your authentic Sri Lankan experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="premium" size="xl" asChild>
              <a href="#contact-form">
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Message
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="https://wa.me/94701306430" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Contact Information Cards */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 -mt-20 relative z-20">
          <Card className="text-center shadow-elevated animate-slide-up animate-scale-hover glass-card group" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-teal rounded-2xl flex items-center justify-center mb-6 shadow-glow group-hover:animate-bounce-subtle">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl gradient-text">Visit Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                123 Heritage Road<br />
                Anuradhapura<br />
                Sri Lanka
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elevated animate-slide-up animate-scale-hover glass-card group" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-teal rounded-2xl flex items-center justify-center mb-6 shadow-glow group-hover:animate-bounce-subtle">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl gradient-text">Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                +94 70 130 6430<br />
                +94 25 222 3456
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elevated animate-slide-up animate-scale-hover glass-card group" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-teal rounded-2xl flex items-center justify-center mb-6 shadow-glow group-hover:animate-bounce-subtle">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl gradient-text">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                info@anuradhapurahomestay.com<br />
                tours@anuradhapurahomestay.com
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-elevated animate-slide-up animate-scale-hover glass-card group" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-teal rounded-2xl flex items-center justify-center mb-6 shadow-glow group-hover:animate-bounce-subtle">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl gradient-text">Open Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Daily: 6:00 AM - 10:00 PM<br />
                Tours: 5:00 AM - 9:00 PM
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Contact Form and Quick Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2" id="contact-form">
            <Card className="shadow-elevated glass-card animate-scale-hover">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl gradient-text mb-2">Send us a Message</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Planning your visit to Anuradhapura? We'd love to help you create an unforgettable experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-semibold text-foreground">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="h-12 border-2 focus:border-soft-teal transition-all duration-300"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="h-12 border-2 focus:border-soft-teal transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+94 70 XXX XXXX"
                      className="h-12 border-2 focus:border-soft-teal transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-semibold text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your travel plans, interests, or any questions you have..."
                      className="min-h-[140px] border-2 focus:border-soft-teal transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="premium" size="xl" className="w-full md:w-auto min-w-[200px]">
                      <Mail className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Quick Contact & Reviews */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <Card className="shadow-elevated glass-card animate-scale-hover">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-teal rounded-xl flex items-center justify-center shadow-glow">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="gradient-text">Quick Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Need immediate assistance? Contact us directly for instant replies and personalized support.
                </p>
                <div className="space-y-4">
                  <Button variant="premium" size="xl" className="w-full" asChild>
                    <a href="https://wa.me/94701306430" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Us
                    </a>
                  </Button>
                  <Button variant="warm" size="xl" className="w-full" asChild>
                    <a href="tel:+94701306430">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Reviews Summary */}
            <Card className="shadow-elevated glass-card animate-scale-hover">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl gradient-text flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-teal rounded-xl flex items-center justify-center shadow-glow">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  What Guests Say
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-7 h-7 fill-soft-teal text-soft-teal animate-float" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <p className="text-4xl font-bold gradient-text mb-2">4.9/5</p>
                  <p className="text-muted-foreground text-lg">Based on 500+ reviews</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-card p-5 rounded-2xl shadow-soft border border-border/50">
                    <p className="italic text-foreground text-lg mb-3">"Authentic experience with incredible hospitality!"</p>
                    <p className="text-sm text-muted-foreground font-medium">- Sarah M., Australia</p>
                  </div>
                  <div className="bg-gradient-card p-5 rounded-2xl shadow-soft border border-border/50">
                    <p className="italic text-foreground text-lg mb-3">"Best cultural tours in Sri Lanka. Highly recommended!"</p>
                    <p className="text-sm text-muted-foreground font-medium">- David K., Germany</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Map Section */}
        <div className="mt-20">
          <Card className="shadow-elevated glass-card animate-scale-hover">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl gradient-text mb-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-teal rounded-2xl flex items-center justify-center shadow-glow">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                Find Us
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Located in the heart of Anuradhapura's cultural triangle, we're easily accessible from all major attractions and historical sites.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full bg-gradient-card rounded-2xl flex items-center justify-center shadow-soft border border-border/50">
                <div className="text-center text-muted-foreground">
                  <div className="w-20 h-20 bg-gradient-teal rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow animate-bounce-subtle">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-2xl font-semibold mb-2 gradient-text">Interactive Map</p>
                  <p className="text-lg text-muted-foreground mb-6">Anuradhapura Heritage Location</p>
                  <Button variant="premium" size="xl" asChild>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                      <MapPin className="w-5 h-5 mr-2" />
                      View on Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;