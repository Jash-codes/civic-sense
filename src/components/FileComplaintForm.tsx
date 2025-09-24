import { useState } from 'react';
import { Mic, Upload, Send, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { saveComplaint, generateId } from '@/utils/storage';
import { assignDepartment } from '@/utils/aiRouting';
import { Complaint } from '@/types';

export const FileComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    name: '',
    email: '',
  });
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleVoiceInput = async () => {
    setIsListening(true);
    
    // Simulate voice recognition with a delay
    setTimeout(() => {
      setIsListening(false);
      setFormData(prev => ({
        ...prev,
        description: prev.description + "The streetlight on Main Street has been out for three days. It's creating a safety hazard for pedestrians and drivers, especially during evening hours. The area becomes very dark and visibility is poor."
      }));
      
      toast({
        title: "Voice input received",
        description: "Your voice message has been transcribed successfully.",
      });
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate processing delay
    setTimeout(() => {
      const complaint: Complaint = {
        id: generateId(),
        title: formData.title,
        description: formData.description,
        location: formData.location,
        name: formData.name || undefined,
        email: formData.email || undefined,
        department: assignDepartment(formData.description),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveComplaint(complaint);
      
      toast({
        title: "Complaint submitted successfully!",
        description: `Complaint ID: ${complaint.id}. Assigned to ${complaint.department}.`,
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        name: '',
        email: '',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          File a Complaint
        </CardTitle>
        <p className="text-muted-foreground">
          Report issues in your community and help us make it better.
        </p>
      </CardHeader>

      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Issue Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Brief description of the issue"
              className="bg-background border-border/50 focus:border-primary"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Detailed Description *
            </Label>
            <div className="relative">
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide detailed information about the issue"
                className="bg-background border-border/50 focus:border-primary min-h-[120px] pr-12"
              />
              <Button
                type="button"
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                className="absolute top-3 right-3 rounded-full"
                onClick={handleVoiceInput}
                disabled={isListening}
              >
                <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
              </Button>
            </div>
            {isListening && (
              <p className="text-sm text-primary animate-pulse">Listening... Speak now</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location *
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Street address or landmark"
                className="bg-background border-border/50 focus:border-primary pl-10"
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Your Name (optional)
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Full name"
                className="bg-background border-border/50 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                className="bg-background border-border/50 focus:border-primary"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Upload Photo/Video (optional)
            </Label>
            <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload photos or videos
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Max size: 10MB per file
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Complaint
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </div>
  );
};