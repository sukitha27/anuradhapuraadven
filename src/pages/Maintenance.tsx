import { Construction, Clock, Mail, Wrench, Sparkles } from 'lucide-react';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMaintenanceMode } from '@/contexts/MaintenanceContext';
import { useEffect, useState } from 'react';

const Maintenance = () => {
  const { disableMaintenanceMode } = useMaintenanceMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements - respects prefers-reduced-motion */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl motion-safe:animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl motion-safe:animate-pulse motion-safe:delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full motion-safe:animate-ping motion-safe:delay-500"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/40 rounded-full motion-safe:animate-ping motion-safe:delay-700"></div>
      </div>
      
      <div className={`relative z-10 max-w-lg w-full text-center space-y-12 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header section with enhanced animations */}
        <div className="space-y-6">
          <div className="relative">
            {/* Pulsing ring around icon - mobile optimized */}
            <div className="absolute inset-0 bg-primary/10 rounded-full w-32 h-32 mx-auto motion-safe:animate-ping opacity-20"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-full w-32 h-32 mx-auto flex items-center justify-center shadow-xl active:shadow-2xl transition-all duration-500 active:scale-105 touch-manipulation">
              <Construction className="h-12 w-12 text-primary motion-safe:animate-pulse" />
              {/* Floating tools */}
              <Wrench className="absolute top-6 right-6 h-6 w-6 text-muted-foreground motion-safe:animate-bounce motion-safe:delay-500" />
              <Sparkles className="absolute bottom-8 left-8 h-4 w-4 text-accent motion-safe:animate-pulse motion-safe:delay-1000" />
              <Zap className="absolute top-8 left-6 h-3 w-3 text-primary/60 motion-safe:animate-ping motion-safe:delay-300" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent motion-safe:animate-pulse">
              🚧 Under Maintenance 🚧
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're upgrading your experience with exciting new features!
            </p>
          </div>
        </div>
        
        {/* Status section with glass morphism */}
        <div className="space-y-6">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg active:shadow-xl transition-all duration-300 active:-translate-y-1 touch-manipulation">
            <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-4">
              <Clock className="h-5 w-5 motion-safe:animate-pulse" />
              <span className="font-medium">We'll be back shortly</span>
            </div>
            
            {/* Animated progress bar */}
            <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden mb-3">
              <div className="bg-gradient-to-r from-primary via-accent to-primary h-full w-3/4 rounded-full motion-safe:animate-pulse shadow-sm"></div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Progress: Almost done! Thank you for your patience.
            </p>
          </div>
          
          {/* Contact card with touch-friendly effects */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 active:bg-card/50 transition-all duration-300 active:scale-105 active:shadow-lg touch-manipulation">
            <p className="text-sm text-muted-foreground mb-3">
              Need immediate assistance? We're here to help:
            </p>
            <div className="flex items-center justify-center space-x-2 group">
              <Mail className="h-4 w-4 text-primary group-active:scale-110 transition-transform" />
              <a 
                href="mailto:support@anuradhapuraadventures.com"
                className="text-sm font-medium text-foreground active:text-primary transition-colors cursor-pointer touch-manipulation"
              >
                support@anuradhapuraadventures.com
              </a>
            </div>
          </div>
        </div>

        
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground/60">
          Developed and maintained by Pearlbay Travels
        </p>
      </div>

      {/* Custom CSS for better mobile animation support */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* Custom mobile-friendly animations */
          @keyframes mobile-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @keyframes mobile-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-25%); }
          }
          
          @keyframes mobile-ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
          
          /* Force animations on mobile when motion is safe */
          @media (max-width: 768px) and (prefers-reduced-motion: no-preference) {
            .motion-safe\\:animate-pulse {
              animation: mobile-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite !important;
            }
            
            .motion-safe\\:animate-bounce {
              animation: mobile-bounce 1s infinite !important;
            }
            
            .motion-safe\\:animate-ping {
              animation: mobile-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite !important;
            }
          }
          
          /* Ensure transforms work on mobile */
          .touch-manipulation {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
        `
      }} />
    </div>
  );
};

export default Maintenance;