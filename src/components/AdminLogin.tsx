import { useState } from 'react';
import { LogIn, Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

interface AdminLoginProps {
  onLogin: (user: User) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [workId, setWorkId] = useState('');
  const [showId, setShowId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!workId) {
      toast({
        title: "Missing Information",
        description: "Please enter your Work ID or Sign-in Code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (workId === 'admin123') {
        onLogin({ isAdmin: true, workId });
        toast({
          title: "Login Successful",
          description: "Welcome to the admin portal.",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid Work ID or Sign-in Code. Try 'admin123'.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card border-border/50 shadow-custom-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Portal
          </CardTitle>
          <p className="text-muted-foreground">
            Enter your credentials to access the dashboard
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workId" className="text-sm font-medium">
                Work ID / Sign-in Code
              </Label>
              <div className="relative">
                <Input
                  id="workId"
                  type={showId ? "text" : "password"}
                  value={workId}
                  onChange={(e) => setWorkId(e.target.value)}
                  placeholder="Enter your work ID"
                  className="bg-background border-border/50 focus:border-primary pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowId(!showId)}
                >
                  {showId ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Demo: Use "admin123" to login
              </p>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-accent/30 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Security Notice</h4>
            <p className="text-xs text-muted-foreground">
              This portal is for authorized personnel only. All activities are logged and monitored.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};