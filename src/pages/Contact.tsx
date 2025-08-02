/* ------------------------------------------------------------------ */
/*  Dependencies                                                      */
/* ------------------------------------------------------------------ */
import { useState, type FC } from "react";
import { motion } from "framer-motion";          // <-- added
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Star,
  Send,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                 */
/* ------------------------------------------------------------------ */
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
const slideUp = (delay = 0) => ({
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay } },
});
const scaleIn = { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ------------------------------------------------------------------ */
/*  Re-usable icon wrapper                                            */
/* ------------------------------------------------------------------ */
const IconWrapper: FC<{ icon: React.ElementType; className?: string }> = ({ icon: Icon, className }) => (
  <div
    className={`w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center ${className}`}
  >
    <Icon className="w-6 h-6 text-orange-400" />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
const Contact: FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We’ll get back to you within 24 hours." });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* =========================== RENDER =========================== */
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans overflow-x-hidden">
      {/* HERO ---------------------------------------------------- */}
      <motion.section
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url(/images/cbanner.jpg)" }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 text-center px-4"
          variants={stagger}
        >
          <motion.h1 variants={slideUp(0.2)} className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Contact Us
          </motion.h1>
          <motion.p variants={slideUp(0.3)} className="max-w-2xl text-lg text-neutral-300">
            Plan your authentic Sri Lankan adventure with us.
          </motion.p>
          <motion.div variants={slideUp(0.4)} className="flex gap-4">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold gap-2"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Send className="w-4 h-4" />
              Send Message
            </Button>

            <a href="https://wa.me/94701306430" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-neutral-600 hover:bg-neutral-800 gap-2">
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
          { icon: MapPin, title: "Visit Us", lines: ["123 Heritage Road", "Anuradhapura, Sri Lanka"] },
          { icon: Phone, title: "Call Us", lines: ["+94 70 130 6430", "+94 25 222 3456"] },
          { icon: Mail, title: "Email Us", lines: ["info@anuradhapurahomestay.com", "tours@anuradhapurahomestay.com"] },
          { icon: Clock, title: "Open Hours", lines: ["Daily: 6 AM – 10 PM", "Tours: 5 AM – 9 PM"] },
        ].map(({ icon, title, lines }, idx) => (
          <motion.div key={idx} variants={scaleIn} whileHover={{ y: -6 }} className="h-full">
            <Card className="bg-neutral-900/70 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-orange-500/10 transition-shadow duration-300 h-full">
              <IconWrapper icon={icon} />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-neutral-400">
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
          <Card className="bg-neutral-900 border-neutral-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Send us a Message</CardTitle>
              <CardDescription className="text-neutral-400">
                Share your travel plans or questions and we’ll craft the perfect itinerary for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Label className="text-sm font-medium">Full Name</Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-neutral-800 border-neutral-700 focus:border-orange-500"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Label className="text-sm font-medium">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-neutral-800 border-neutral-700 focus:border-orange-500"
                    />
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Label className="text-sm font-medium">Phone (optional)</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-neutral-800 border-neutral-700 focus:border-orange-500"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <Label className="text-sm font-medium">Message</Label>
                  <Textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-neutral-800 border-neutral-700 focus:border-orange-500 resize-none"
                    placeholder="Tell us about your interests, dates, or questions..."
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* SIDEBAR */}
        <aside className="flex flex-col gap-8">
          {/* Quick actions */}
          <motion.div variants={slideUp(0.2)}>
            <Card className="bg-neutral-900 border-neutral-800 rounded-2xl">
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
                  <Button variant="outline" className="w-full border-neutral-600 hover:bg-neutral-800 gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </motion.a>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reviews */}
          <motion.div variants={slideUp(0.3)}>
            <Card className="bg-neutral-900 border-neutral-800 rounded-2xl">
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
                      <Star className="w-5 h-5 text-orange-400 fill-current" />
                    </motion.div>
                  ))}
                  <span className="ml-2 font-bold text-lg">4.9 / 5</span>
                </div>
                <p className="text-sm text-neutral-400 mb-4">Based on 500+ reviews</p>
                <blockquote className="border-l-2 border-orange-500 pl-4 text-sm italic text-neutral-300">
                  “Authentic experience with incredible hospitality!”
                  <span className="block not-italic mt-2 text-neutral-400">– Sarah M., Australia</span>
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>
        </aside>
      </motion.section>

      {/* MAP ----------------------------------------------------- */}
      <motion.section
        className="container mx-auto px-4 pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Card className="bg-neutral-900 border-neutral-800 rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <IconWrapper icon={MapPin} />
              <span>Find Us</span>
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Centrally located in the cultural triangle – minutes away from Anuradhapura’s UNESCO sites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              className="aspect-video bg-neutral-800 flex items-center justify-center rounded-xl"
              whileHover={{ scale: 1.01 }}
            >
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 text-neutral-400 hover:text-orange-400 transition"
              >
                <MapPin className="w-12 h-12" />
                <span className="font-semibold">Open Google Maps</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default Contact;