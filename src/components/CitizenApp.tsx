import { useState } from 'react';
import { Phone, FileText, Search, Gift, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileComplaintForm } from '@/components/FileComplaintForm';
import { TrackComplaints } from '@/components/TrackComplaints';
import { Rewards } from '@/components/Rewards';
import { Help } from '@/components/Help';
import { EmergencyCall } from '@/components/EmergencyCall';

type TabType = 'file' | 'track' | 'rewards' | 'help';

export const CitizenApp = () => {
  const [activeTab, setActiveTab] = useState<TabType>('file');
  const [showEmergencyCall, setShowEmergencyCall] = useState(false);

  const tabs = [
    { id: 'file' as const, label: 'File Complaint', icon: FileText },
    { id: 'track' as const, label: 'Track Complaints', icon: Search },
    { id: 'rewards' as const, label: 'Rewards', icon: Gift },
    { id: 'help' as const, label: 'Help', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'file':
        return <FileComplaintForm />;
      case 'track':
        return <TrackComplaints />;
      case 'rewards':
        return <Rewards />;
      case 'help':
        return <Help />;
      default:
        return <FileComplaintForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      {/* Header */}
      <header className="bg-gradient-card shadow-custom-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CitizenConnect</h1>
                <p className="text-sm text-muted-foreground">Report & Track Issues</p>
              </div>
            </div>
            <Button
              variant="emergency"
              size="icon"
              onClick={() => setShowEmergencyCall(true)}
              className="rounded-full"
            >
              <Phone className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-card border-b border-border/50 shadow-custom-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="tab"
                size="lg"
                onClick={() => setActiveTab(tab.id)}
                data-active={activeTab === tab.id}
                className="flex items-center space-x-2 px-6 py-3"
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gradient-card rounded-xl shadow-custom-lg border border-border/50 overflow-hidden">
          {renderContent()}
        </div>
      </main>

      {/* Emergency Call Modal */}
      {showEmergencyCall && (
        <EmergencyCall onClose={() => setShowEmergencyCall(false)} />
      )}
    </div>
  );
};