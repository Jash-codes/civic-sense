import { Complaint } from '@/types';

const COMPLAINTS_KEY = 'citizen-complaints';

export const saveComplaint = (complaint: Complaint): void => {
  const complaints = getComplaints();
  complaints.push(complaint);
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
};

export const getComplaints = (): Complaint[] => {
  const stored = localStorage.getItem(COMPLAINTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const updateComplaintStatus = (id: string, status: Complaint['status']): void => {
  const complaints = getComplaints();
  const index = complaints.findIndex(c => c.id === id);
  if (index !== -1) {
    complaints[index].status = status;
    complaints[index].updatedAt = new Date().toISOString();
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};