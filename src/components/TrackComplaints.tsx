import { useState, useEffect } from 'react';
import { Search, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getComplaints } from '@/utils/storage';
import { Complaint } from '@/types';

export const TrackComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const filteredComplaints = complaints.filter(complaint =>
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: Complaint['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in-progress':
        return <AlertCircle className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: Complaint['status']) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'in-progress':
        return 'default';
      case 'resolved':
        return 'destructive';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Track Your Complaints
        </CardTitle>
        <p className="text-muted-foreground">
          Monitor the status of your reported issues.
        </p>
      </CardHeader>

      <CardContent className="px-0">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by complaint ID, title, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border/50 focus:border-primary"
          />
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="border-border/50 hover:shadow-custom-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{complaint.title}</h3>
                    </div>
                    <Badge variant={getStatusVariant(complaint.status)} className="flex items-center space-x-1">
                      {getStatusIcon(complaint.status)}
                      <span className="capitalize">{complaint.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {complaint.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>ID: {complaint.id}</span>
                      <span>📍 {complaint.location}</span>
                      <span>🏢 {complaint.department}</span>
                    </div>
                    <span>{formatDate(complaint.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchTerm ? 'No complaints found' : 'No complaints yet'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Start by filing your first complaint to help improve your community'
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
};