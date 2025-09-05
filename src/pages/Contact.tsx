/* ------------------------------------------------------------------ */
/*  Dependencies                                                      */
/* ------------------------------------------------------------------ */
import { useState, type FC } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Star,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Firebase imports
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Your firebase.js file

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactSubmission extends FormData {
  timestamp: any;
  status: string;
  source: string;
}

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                 */
/* ------------------------------------------------------------------ */
const fadeIn = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { duration: 0.6 } } 
};

const slideUp = (delay = 0) => ({
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay } },
});

const scaleIn = { 
  hidden: { scale: 0.95, opacity: 0 }, 
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } 
};

const stagger = { 
  visible: { transition: { staggerChildren: 0.1 } } 
};

/* ------------------------------------------------------------------ */
/*  Icon wrapper                                                      */
/* ------------------------------------------------------------------ */
const IconWrapper: FC<{ icon: React.ElementType }> = ({ icon: Icon }) => (
  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center">
    <Icon className="w-6 h-6 text-sky-600" />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
const Contact: FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({ 
    name: "", 
    email: "", 
    phone: "", 
    message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Email, and Message).",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create submission object for Firebase
      const submission: ContactSubmission = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        timestamp: serverTimestamp(),
        status: 'new',
        source: 'website_contact_form'
      };
      
      // Submit to Firebase Firestore
      await addDoc(collection(db, 'contact_submissions'), submission);
      
      // Show success message
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // Show error message
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* =========================== RENDER =========================== */
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* HERO ---------------------------------------------------- */}
      <motion.section
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url(/images/cbanner.jpg)" }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 text-center px-4"
          variants={stagger}
        >
          <motion.h1 variants={slideUp(0.2)} className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
            Contact Us
          </motion.h1>
          <motion.p variants={slideUp(0.3)} className="max-w-2xl text-lg text-white/90">
            Plan your authentic Sri Lankan adventure with us.
          </motion.p>
          <motion.div variants={slideUp(0.4)} className="flex gap-4">
            <Button
              size="lg"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold gap-2"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Send className="w-4 h-4" />
              Send Message
            </Button>

            <a href="https://wa.me/94701306430" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/20 border-white text-white hover:bg-white/30 gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* QUICK INFO CARDS ---------------------------------------- */}
      <motion.section
        className="container mx-auto px-4 -mt-16 relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        {[
          { icon: MapPin, title: "Visit Us", lines: ["Vinandharama mawatha", "Pothanegama , Anuradhapura, Sri Lanka"] },
          { icon: Phone, title: "Call Us", lines: ["+94 70 130 6430"] },
          { icon: Mail, title: "Email Us", lines: ["info@anuradhapurahomestay.com", "admin@anuradhapurahomestay.com"] },
          { icon: Clock, title: "Open Hours", lines: ["Daily: 6 AM – 10 PM", "Tours: 5 AM – 9 PM"] },
        ].map(({ icon, title, lines }, idx) => (
          <motion.div key={idx} variants={scaleIn} whileHover={{ y: -6 }} className="h-full">
            <Card className="bg-white border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-sky-500/10 transition-shadow duration-300 h-full">
              <IconWrapper icon={icon} />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                {lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* MAIN GRID: FORM + SIDEBAR ------------------------------- */}
      <motion.section
        className="container mx-auto px-4 py-20 grid lg:grid-cols-3 gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        {/* FORM */}
        <motion.div id="contact-form" variants={slideUp()} className="lg:col-span-2">
          <Card className="bg-white border-slate-200 rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-slate-800">Send us a Message</CardTitle>
              <CardDescription className="text-slate-600">
                Share your travel plans or questions and we'll craft the perfect itinerary for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Label className="text-sm font-medium">Full Name *</Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-slate-300 focus:border-sky-500"
                      placeholder="Your full name"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Label className="text-sm font-medium">Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-slate-300 focus:border-sky-500"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Label className="text-sm font-medium">Phone (optional)</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-sky-500"
                    placeholder="+94 70 123 4567"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <Label className="text-sm font-medium">Message *</Label>
                  <Textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border-slate-300 focus:border-sky-500 resize-none"
                    placeholder="Tell us about your interests, dates, or questions..."
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-sky-600 hover:bg-sky-700 text-white w-full md:w-auto gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* SIDEBAR */}
        <aside className="flex flex-col gap-8">
          <motion.div variants={slideUp(0.2)}>
            <Card className="bg-white border-slate-200 rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <IconWrapper icon={MessageCircle} />
                  <span>Quick Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.a
                  href="https://wa.me/94701306430"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </motion.a>
                <motion.a
                  href="tel:+94701306430"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </motion.a>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reviews */}
          <motion.div variants={slideUp(0.3)}>
            <Card className="bg-white border-slate-200 rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <IconWrapper icon={Star} />
                  <span>Guest Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                    </motion.div>
                  ))}
                  <span className="ml-2 font-bold text-lg">4.9 / 5</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">Based on 500+ reviews</p>
                <blockquote className="border-l-2 border-amber-500 pl-4 text-sm italic text-slate-700">
                  "Authentic experience with incredible hospitality!"
                  <span className="block not-italic mt-2 text-slate-600">– Sarah M., Australia</span>
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={slideUp(0.4)}>
            <Card className="bg-white border-slate-200 rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <IconWrapper icon={MapPin} />
                  <span>Location Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">Address</p>
                    <p>Vinandharama mawatha</p>
                    <p>Pothanegama , Anuradhapura</p> 
                    <p>Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">Distance to Sites</p>
                    <p>Sacred City: 5 minutes</p>
                    <p>Mihintale: 15 minutes</p>
                    <p>Sigiriya: 1.5 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </aside>
      </motion.section>

      {/* EMBEDDED GOOGLE MAP ------------------------------------- */}
      <motion.section
        className="container mx-auto px-4 pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Card className="bg-white border-slate-200 rounded-2xl shadow-md overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <IconWrapper icon={MapPin} />
              <span>Find Us</span>
            </CardTitle>
            <CardDescription className="text-slate-600">
              Centrally located in the cultural triangle – minutes away from Anuradhapura's UNESCO sites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.7659447821884!2d80.3677777750108!3d8.326040691709865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf5a121d2413b%3A0x1efaa81e9aca52f0!2sChipmunk%20Home%20Stay!5e0!3m2!1sen!2slk!4v1754155251225!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Anuradhapura Homestay Map"
              />
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* ADDITIONAL CONTACT OPTIONS ---------------------------- */}
      <motion.section
        className="bg-slate-50 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={slideUp()}>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Other Ways to Reach Us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose the method that works best for you. We're here to help plan your perfect Sri Lankan experience.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={stagger}
          >
            <motion.div variants={scaleIn} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
              <p className="text-slate-600 text-sm mb-4">Instant messaging for quick questions</p>
              <a href="https://wa.me/94701306430" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Chat Now
                </Button>
              </a>
            </motion.div>

            <motion.div variants={scaleIn} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Phone Call</h3>
              <p className="text-slate-600 text-sm mb-4">Speak directly with our team</p>
              <a href="tel:+94701306430">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Call +94 70 130 6430
                </Button>
              </a>
            </motion.div>

            <motion.div variants={scaleIn} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-slate-600 text-sm mb-4">Detailed inquiries and planning</p>
              <a href="mailto:info@anuradhapurahomestay.com">
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Send Email
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;