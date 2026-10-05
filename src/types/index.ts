export type UserRole = 'resident' | 'warden' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  roomNumber?: string;
  floor?: number;
  bedLabel?: string; // 'Bed A' or 'Bed B'
  joiningDate?: string;
  monthlyRent?: number;
  emergencyContact?: string;
}

export interface Bed {
  id: string;
  label: string; // 'Bed A' | 'Bed B'
  isOccupied: boolean;
  residentId?: string;
  residentName?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  capacity: number; // 2
  type: string; // 'Double Sharing'
  monthlyRent: number; // 7400
  beds: Bed[];
}

export interface Payment {
  id: string;
  residentId: string;
  residentName: string;
  roomNumber: string;
  monthYear: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string; // 'UPI', 'Cash', 'Bank Transfer'
  receiptNumber?: string;
  notes?: string;
}

export type DietaryType = 'veg' | 'non-veg' | 'egg';

export interface MealItem {
  nameHindi: string;
  nameEnglish: string;
  dietary: DietaryType;
  vegAlternative?: {
    hindi: string;
    english: string;
  };
  isSpecial?: boolean;
  notes?: string;
}

export interface MessMenuDay {
  dayEnglish: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  dayHindi: string;
  breakfast: MealItem;
  lunch: MealItem;
  dinner: MealItem;
}

export type ComplaintCategory =
  | 'Electrical'
  | 'Plumbing'
  | 'Furniture'
  | 'Fan'
  | 'Water'
  | 'Internet'
  | 'Cleaning'
  | 'Other';

export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved';

export interface Complaint {
  id: string;
  residentId: string;
  residentName: string;
  roomNumber: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  priority: 'normal' | 'urgent';
  status: ComplaintStatus;
  createdAt: string;
  updatedAt?: string;
  internalNotes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Mess' | 'Maintenance' | 'Payment' | 'General';
  isPinned: boolean;
  createdAt: string;
  author: string;
}

export interface LeaveRequest {
  id: string;
  residentId: string;
  residentName: string;
  roomNumber: string;
  startDate: string;
  endDate: string;
  reason: string;
  emergencyPhone: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
