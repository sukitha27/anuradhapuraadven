import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Shield, FileText, Map } from "lucide-react";
import Footer from "@/components/Footer";

const Sitemap = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Scroll to top when the pathname changes (Solution 3)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const pages = [
    {
      title: "Home",
      description: "Main landing page",
      path: "/",
      icon: Home,
    },
    {
      title: "Privacy Policy",
      description: "Information about data collection and usage",
      path: "/privacy-policy",
      icon: Shield,
    },
    {
      title: "Terms of Service",
      description: "Legal terms and conditions",
      path: "/terms-of-service",
      icon: FileText,
    },
    {
      title: "Sitemap",
      description: "Overview of all website pages",
      path: "/sitemap",
      icon: Map,
    },
  ];

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
          
          <h1 className="text-4xl font-bold mb-8 text-foreground">Sitemap</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Find all the pages available on our website
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            {pages.map((page) => {
              const IconComponent = page.icon;
              return (
                <Card key={page.path} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-primary" />
                      {page.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{page.description}</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate(page.path);
                        window.scrollTo(0, 0); // Also scroll to top when navigating to other pages
                      }}
                      className="w-full"
                    >
                      Visit Page
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sitemap;