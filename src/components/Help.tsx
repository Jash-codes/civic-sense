import { Phone, Mail, MapPin, Clock, MessageCircle, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const Help = () => {
  const emergencyContacts = [
    { label: 'Police Emergency', number: '911', icon: AlertCircle },
    { label: 'Fire Department', number: '911', icon: AlertCircle },
    { label: 'Medical Emergency', number: '911', icon: AlertCircle },
    { label: 'City Hall', number: '(555) 123-4567', icon: Phone },
    { label: 'Public Works', number: '(555) 123-4568', icon: Phone },
  ];

  const faqs = [
    {
      question: 'How do I track my complaint?',
      answer: 'Go to the "Track Complaints" tab and search for your complaint using the complaint ID or keywords. You can also see the current status and department assigned.',
    },
    {
      question: 'How long does it take to resolve complaints?',
      answer: 'Resolution time varies by issue type. Emergency issues are prioritized and typically addressed within 24-48 hours. Non-emergency issues may take 3-10 business days.',
    },
    {
      question: 'Can I submit anonymous complaints?',
      answer: 'Yes, providing your name and email is optional. However, including contact information helps us follow up if we need additional details.',
    },
    {
      question: 'What types of issues can I report?',
      answer: 'You can report various civic issues including road problems, sanitation issues, park maintenance, utility problems, traffic concerns, and public safety matters.',
    },
    {
      question: 'How do I earn rewards points?',
      answer: 'You earn points for each valid complaint submitted. Points can be redeemed for various community rewards like transport passes, vouchers, and special access.',
    },
  ];

  return (
    <div className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Help & Support
        </CardTitle>
        <p className="text-muted-foreground">
          Get assistance and find answers to common questions.
        </p>
      </CardHeader>

      <CardContent className="px-0 space-y-6">
        {/* Emergency Contacts */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-destructive" />
            Emergency Contacts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <contact.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{contact.label}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${contact.number}`}>{contact.number}</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-primary" />
            Contact Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Call Us</h4>
                <p className="text-sm text-muted-foreground">Mon-Fri, 8AM-6PM</p>
                <p className="text-sm font-medium">(555) 123-4567</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Email Us</h4>
                <p className="text-sm text-muted-foreground">24/7 Support</p>
                <p className="text-sm font-medium">support@cityconnect.gov</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Visit Us</h4>
                <p className="text-sm text-muted-foreground">City Hall Office</p>
                <p className="text-sm font-medium">123 Main St, Suite 100</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Hours */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Office Hours
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Monday - Friday</p>
                <p className="text-muted-foreground">8:00 AM - 6:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Saturday</p>
                <p className="text-muted-foreground">9:00 AM - 3:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Sunday</p>
                <p className="text-muted-foreground">Closed</p>
              </div>
              <div>
                <p className="font-medium">Emergency</p>
                <p className="text-muted-foreground">24/7 Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </div>
  );
};