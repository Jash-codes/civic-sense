import { Link } from 'react-router-dom';
import { FileText, Shield, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-custom-xl">
                <FileText className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              CitizenConnect
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your voice matters. Report issues, track progress, and help build a better community together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="gradient" size="lg" className="w-full sm:w-auto">
                <Link to="/citizen">
                  <Users className="w-5 h-5 mr-2" />
                  Citizen Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/admin">
                  <Shield className="w-5 h-5 mr-2" />
                  Admin Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Simple steps to make your community better</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-border/50 bg-gradient-card shadow-custom-lg hover:shadow-custom-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Report Issues</h3>
              <p className="text-muted-foreground">
                Easily report problems in your community with photos, location details, and voice descriptions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-card shadow-custom-lg hover:shadow-custom-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your complaints in real-time and get updates when issues are being addressed.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-card shadow-custom-lg hover:shadow-custom-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Earn Rewards</h3>
              <p className="text-muted-foreground">
                Get recognized for your contributions with points, achievements, and community rewards.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 CitizenConnect. Making communities better, one report at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
