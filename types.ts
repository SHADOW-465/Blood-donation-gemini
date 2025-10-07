
export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

export enum RhFactor {
  POSITIVE = '+',
  NEGATIVE = '-',
}

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
}

export enum Urgency {
  STANDARD = 'Standard',
  URGENT = 'Urgent',
  EMERGENCY = 'Emergency',
}

export enum RequestStatus {
    PENDING = 'Pending',
    ACCEPTED = 'Accepted',
    FULFILLED = 'Fulfilled',
    EXPIRED = 'Expired',
}

export interface User {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  location: string;
  contact: string;
  bloodType: BloodType;
  lastDonationDate: Date | null;
  totalDonations: number;
  shares: number;
  livesSaved: number;
}

export interface DonationRequest {
  id: string;
  patientName: string;
  patientAge: number;
  bloodType: BloodType;
  unitsNeeded: number;
  hospital: string;
  contactNumber: string;
  urgency: Urgency;
  createdAt: Date;
  status: RequestStatus;
  distance: number; // in km
}
