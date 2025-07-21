import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer"; // Import your Footer component

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mb-8"
          >
            ← Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <p className="text-muted-foreground text-sm">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using this service, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
              <p className="mb-4">
                To access certain features, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your password</li>
                <li>Accept all risks of unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials on our website 
                for personal, non-commercial transitory viewing only.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>This is the grant of a license, not a transfer of title</li>
                <li>You may not modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to reverse engineer any software on the website</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" on any other server</li>
              </ul>
              <p>
                This license shall automatically terminate if you violate any of these restrictions and may be 
                terminated by us at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services for any illegal purpose</li>
                <li>Post or transmit any harmful or offensive content</li>
                <li>Harass, threaten, or impersonate others</li>
                <li>Interfere with or disrupt the service</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Payments and Refunds</h2>
              <p className="mb-4">
                All payments for services are subject to the following terms:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Prices are subject to change without notice</li>
                <li>We accept various payment methods as displayed</li>
                <li>Refund policies vary by service and will be clearly stated</li>
                <li>Chargebacks may result in account termination</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                All content, trademarks, service marks, and logos are the property of our company or its licensors.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unauthorized use is strictly prohibited</li>
                <li>You may not use our branding without written permission</li>
                <li>User-generated content remains your property but grants us a license to use it</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Disclaimer</h2>
              <p className="mb-4">
                The materials on our website are provided on an 'as is' basis. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties including 
                without limitation:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Implied warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of intellectual property</li>
                <li>Accuracy, reliability, or completeness of content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Limitations of Liability</h2>
              <p className="mb-4">
                In no event shall our company or its suppliers be liable for any damages including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Damages for loss of data or profit</li>
                <li>Business interruption</li>
                <li>Personal injury or property damage</li>
                <li>Any other consequential damages</li>
              </ul>
              <p>
                These limitations apply even if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p className="mb-4">
                These terms shall be governed by and construed in accordance with the laws of Sri Lanka, 
                and you submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Your continued use of the service 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p className="mb-2">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mb-2">
                <a href="mailto:info@anuradhapura-adventures.com" className="text-primary hover:underline">
                  info@anuradhapura-adventures.com
                </a>
              </p>
              <p>
                Vinandharama mawatha<br />
                      Pothanegama , Anuradhapura<br />
                      Sri Lanka<br />
                +94 70 123 4567
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer /> {/* Footer added at the bottom */}
    </div>
  );
};

export default TermsOfService;