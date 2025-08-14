import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Scroll to top when the component mounts or path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0); // Scroll to top when navigating home
            }}
            className="mb-8"
          >
            ← Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p className="text-muted-foreground text-sm">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Payment information for transactions</li>
                <li>Usage data and service preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, and communicate with you.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To personalize your experience</li>
                <li>To process transactions and bookings</li>
                <li>To improve customer service</li>
                <li>To send periodic emails and updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy.
              </p>
              <p className="mb-2 font-medium">We may share information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist with our business operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners in case of mergers or acquisitions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Regular security audits</li>
                <li>Limited access to personal data</li>
                <li>Secure payment processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="mb-4">
                You have the right to access, correct, or delete your personal information.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your experience.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies for site functionality</li>
                <li>Analytics cookies to improve our services</li>
                <li>Marketing cookies (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy periodically. We will notify you of significant changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-2">
                If you have any questions about this Privacy Policy, please contact us at:
                <a href="mailto:admin@anuradhapurahomestay.com" className="text-primary hover:underline ml-1">
                  admin@anuradhapurahomestay.com
                </a>
              </p>
              <address className="not-italic">
                    Vinandharama mawatha<br />
                    Pothanegama, Anuradhapura<br />
                    Sri Lanka<br />
                    +94 70 123 4567
                  </address>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;