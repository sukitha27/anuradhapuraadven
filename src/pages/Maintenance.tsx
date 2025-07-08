import { Construction, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMaintenanceMode } from '@/contexts/MaintenanceContext';

const Maintenance = () => {
  const { disableMaintenanceMode } = useMaintenanceMode();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <Construction className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="text-3xl font-bold text-foreground">Under Maintenance</h1>
          <p className="text-muted-foreground text-lg">
            We're currently performing scheduled maintenance to improve your experience.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span>We'll be back shortly</span>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              If you need immediate assistance, please contact us:
            </p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">support@anuradhapuraadventures.com</span>
            </div>
          </div>
        </div>

        {/* Admin control - remove this in production */}
       <div className="pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Admin Control</p>
          <Button 
            onClick={disableMaintenanceMode}
            variant="outline"
            size="sm"
          >
            Exit Maintenance Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;