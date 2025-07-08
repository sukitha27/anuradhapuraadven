import { Construction, Clock, Mail, Wrench, Sparkles } from 'lucide-react';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMaintenanceMode } from '@/contexts/MaintenanceContext';

const Maintenance = () => {
  const { disableMaintenanceMode } = useMaintenanceMode();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-ping delay-700"></div>
      </div>
      
      <div className="relative z-10 max-w-lg w-full text-center space-y-12 animate-fade-in">
        {/* Header section with enhanced animations */}
        <div className="space-y-6">
          <div className="relative">
            {/* Pulsing ring around icon */}
            <div className="absolute inset-0 bg-primary/10 rounded-full w-32 h-32 mx-auto animate-ping opacity-20"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-full w-32 h-32 mx-auto flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <Construction className="h-12 w-12 text-primary animate-pulse" />
              {/* Floating tools */}
              <Wrench className="absolute top-6 right-6 h-6 w-6 text-muted-foreground animate-bounce delay-500" />
              <Sparkles className="absolute bottom-8 left-8 h-4 w-4 text-accent animate-pulse delay-1000" />
              <Zap className="absolute top-8 left-6 h-3 w-3 text-primary/60 animate-ping delay-300" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-pulse">
              🚧 Under Maintenance 🚧
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in delay-200">
              We're upgrading your experience with exciting new features!
            </p>
          </div>
        </div>
        
        {/* Status section with glass morphism */}
        <div className="space-y-6 animate-fade-in delay-300">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-4">
              <Clock className="h-5 w-5 animate-pulse" />
              <span className="font-medium">We'll be back shortly</span>
            </div>
            
            {/* Animated progress bar */}
            <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden mb-3">
              <div className="bg-gradient-to-r from-primary via-accent to-primary h-full w-3/4 rounded-full animate-pulse shadow-sm"></div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Progress: Almost done! Thank you for your patience.
            </p>
          </div>
          
          {/* Contact card with hover effects */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <p className="text-sm text-muted-foreground mb-3">
              Need immediate assistance? We're here to help:
            </p>
            <div className="flex items-center justify-center space-x-2 group">
              <Mail className="h-4 w-4 text-primary group-hover:animate-bounce" />
              <span className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                support@anuradhapuraadventures.com
              </span>
            </div>
          </div>
        </div>

        {/* Admin control with enhanced styling */}
        {/*<div className="pt-6 border-t border-border/30 animate-fade-in delay-500">
          <p className="text-xs text-muted-foreground mb-3">Admin Control</p>
          <Button 
            onClick={disableMaintenanceMode}
            variant="outline"
            size="sm"
            className="bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Exit Maintenance Mode
          </Button>
        </div> */}
      </div>
      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground/60">
          Developed and maintained by Pearlbay Travels
        </p>
      </div>
    </div>
  );
};

export default Maintenance;