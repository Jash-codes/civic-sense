export interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  name?: string;
  email?: string;
  department: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  isAdmin: boolean;
  workId?: string;
}