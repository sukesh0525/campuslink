
export interface CampusEvent {
  id: string;
  title: string;
  department: string;
  date: string;
}

export interface Registration {
  studentName: string;
  email: string;
  department: string;
  eventId: string;
}
