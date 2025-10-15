
export interface CampusEvent {
  id: string;
  title: string;
  department: string;
  date: string;
  imageUrl?: string;
}

export interface Registration {
  studentName: string; // Full Name
  email: string;
  phone: string;
  rollNo: string;
  year: string;
  department: string; // Branch
  section: string;
  eventId: string;
}
