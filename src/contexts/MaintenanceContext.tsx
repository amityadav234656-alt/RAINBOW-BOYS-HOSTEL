import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_COMPLAINTS } from '../data/mockData';
import { Complaint, ComplaintCategory, ComplaintStatus } from '../types';

interface MaintenanceContextType {
  complaints: Complaint[];
  addComplaint: (data: {
    title: string;
    description: string;
    category: ComplaintCategory;
    priority: 'normal' | 'urgent';
    residentId: string;
    residentName: string;
    roomNumber: string;
  }) => Complaint;
  updateComplaintStatus: (id: string, status: ComplaintStatus, notes?: string) => void;
  getResidentComplaints: (residentId: string) => Complaint[];
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

const STORAGE_KEY = 'rainbow_one_complaints';

export const MaintenanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return INITIAL_COMPLAINTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch {
      // Ignore
    }
  }, [complaints]);

  const addComplaint = (data: {
    title: string;
    description: string;
    category: ComplaintCategory;
    priority: 'normal' | 'urgent';
    residentId: string;
    residentName: string;
    roomNumber: string;
  }): Complaint => {
    const newComplaint: Complaint = {
      id: `comp-${Date.now().toString().slice(-4)}`,
      residentId: data.residentId,
      residentName: data.residentName,
      roomNumber: data.roomNumber,
      category: data.category,
      title: data.title.trim(),
      description: data.description.trim(),
      priority: data.priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      internalNotes: 'Request received. Warden office will assign the maintenance technician.',
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    return newComplaint;
  };

  const updateComplaintStatus = (id: string, status: ComplaintStatus, notes?: string) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              updatedAt: new Date().toISOString(),
              internalNotes: notes !== undefined ? notes : c.internalNotes,
            }
          : c
      )
    );
  };

  const getResidentComplaints = (residentId: string) => {
    return complaints.filter((c) => c.residentId === residentId);
  };

  return (
    <MaintenanceContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaintStatus,
        getResidentComplaints,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
};
