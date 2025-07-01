
import React, { useState, useEffect } from 'react';
import { ArrowUp, Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { FaGoogle, FaWhatsapp, FaTripadvisor } from 'react-icons/fa'; // Importing icons

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: MessageCircle, href: '#', color: 'hover:text-green-500' }
  ];

  const quickLinks = [
    { name: 'Tours', href: '#tours' },
    { name: 'Restaurant', href: '#restaurant' },
    { name: 'Homestay', href: '#homestay' },
    { name: 'Cookery Classes', href: '#cookery' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Bicycle Adventures',
    'Wilpattu Safari',
    'Cultural Tours',
    'TukTuk Hire',
    'Authentic Dining',
    'Homestay Experience'
  ];

  return (
    <footer id="contact" className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 text-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
            {/* Replace the letter A with a logo */}
              <img 
                src="/images/logo.png" 
                alt="Anuradhapura Adventures Logo" 
                className="w-12 h-12 rounded-full object-cover" 
              />
        <div>
    <h3 className="text-xl font-bold">Anuradhapura</h3>
    <p className="text-white/80">Adventures</p>
  </div>
</div>

              
              <p className="text-white/80 leading-relaxed">
                Discover the ancient wonders of Anuradhapura through authentic experiences, 
                delicious cuisine, and warm Sri Lankan hospitality.
              </p>

              {/* Social Media */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.color} group`}
                  >
                    <social.icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-emerald-300 transition-colors duration-300 relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-300 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center space-x-2 text-white/80">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">
                      Vinandharama mawatha<br />
                      Pothanegama , Anuradhapura<br />
                      Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <a href="tel:+94701234567" className="text-white/80 hover:text-emerald-300 transition-colors duration-300">
                    +94 70 123 4567
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <a href="mailto:info@anuradhapura-adventures.com" className="text-white/80 hover:text-emerald-300 transition-colors duration-300">
                    info@anuradhapura-adventures.com
                  </a>
                </div>
              </div>

              {/* WhatsApp Quick Contact */}
              <div className="mt-6">
                <a
                  href="https://wa.me/94701234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-white/60 text-sm text-center md:text-left">
                © 2024 Anuradhapura Adventures. All rights reserved. Developed by Pearlbay Travels.
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-white/60">
                <a href="#" className="hover:text-emerald-300 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-emerald-300 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-emerald-300 transition-colors duration-300">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 z-50 animate-bounce"
        >
          <ArrowUp className="w-6 h-6 mx-auto" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
