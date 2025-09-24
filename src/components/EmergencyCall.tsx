import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmergencyCallProps {
  onClose: () => void;
}

export const EmergencyCall = ({ onClose }: EmergencyCallProps) => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Simulate connecting
    const connectTimer = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (isConnected) {
      const durationTimer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(durationTimer);
    }
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setTimeout(onClose, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 bg-gradient-card border-border/50">
        <CardContent className="p-6">
          <div className="text-center">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Emergency Call</h3>
              <Button variant="ghost" size="icon" onClick={onClose} disabled={isConnected}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Call Status */}
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <Phone className={`w-12 h-12 text-white ${isConnecting ? 'animate-pulse' : ''}`} />
              </div>
              
              <h4 className="text-xl font-semibold mb-2">
                {isConnecting ? 'Connecting...' : 'Emergency Services'}
              </h4>
              
              <p className="text-muted-foreground mb-4">
                {isConnecting 
                  ? 'Contacting emergency dispatch'
                  : 'Connected to 911 Emergency Services'
                }
              </p>

              {isConnected && (
                <div className="text-2xl font-mono font-bold text-primary">
                  {formatDuration(callDuration)}
                </div>
              )}
            </div>

            {/* Call Controls */}
            <div className="space-y-4">
              {isConnecting && (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {isConnected && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Stay on the line. Help is on the way.
                  </p>
                  <Button 
                    variant="destructive" 
                    size="lg" 
                    onClick={handleEndCall}
                    className="w-full"
                  >
                    End Call
                  </Button>
                </>
              )}

              {!isConnected && !isConnecting && (
                <Button variant="outline" onClick={onClose} className="w-full">
                  Close
                </Button>
              )}
            </div>

            {/* Emergency Info */}
            <div className="mt-6 p-4 bg-accent/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                This is a simulated emergency call for demonstration purposes. 
                In a real emergency, call 911 immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};