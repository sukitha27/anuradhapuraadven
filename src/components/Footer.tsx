import React, { useState, useEffect } from "react";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { icon: FaFacebook, href: "#" },
    { icon: FaInstagram, href: "#" },
    { icon: FaTwitter, href: "#" },
    { icon: FaWhatsapp, href: "https://wa.me/94701306430" },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 text-white"
    >
      <div className="relative z-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Company */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  src="/images/logo1.png"
                  alt="logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">Anuradhapura</h3>
                  <p className="text-white/80">Homestay</p>
                </div>
              </div>

              <p className="text-white/80">
                Discover the ancient wonders of Anuradhapura through authentic
                experiences and warm Sri Lankan hospitality.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a key={index} href={social.href}>
                      <Icon className="w-5 h-5 hover:text-emerald-400" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-white/80">
                <li>
                  <a href="#tours">Tours</a>
                </li>
                <li>
                  <a href="#restaurant">Restaurant</a>
                </li>
                <li>
                  <a href="#homestay">Homestay</a>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-white/80">
                <li>Bicycle Adventures</li>
                <li>Wilpattu Safari</li>
                <li>Cultural Tours</li>
                <li>TukTuk Hire</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>

              <div className="space-y-4 text-white/80">

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <p>
                    Vinandharama Mawatha
                    <br />
                    Pothanegama, Anuradhapura
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <a href="tel:+94772687753">+94 77 2687753</a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <a href="mailto:info@anuradhapurahomestay.com">
                    info@anuradhapurahomestay.com
                  </a>
                </div>

              </div>

              <div className="mt-6">
                <a
                  href="https://wa.me/94701306430"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">

            <p className="text-white/60 text-sm">
              © 2026 Anuradhapura Homestay. All rights reserved. Developed by
              <a
                href="https://www.veloratech.com.lk/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-emerald-300 hover:text-emerald-400"
              >
                Velora Technologies
              </a>
            </p>

            <div className="flex space-x-6 text-sm text-white/60">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>

          </div>
        </div>

      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 right-8 w-12 h-12 bg-emerald-500 text-white rounded-full"
        >
          <ArrowUp className="w-6 h-6 mx-auto" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
