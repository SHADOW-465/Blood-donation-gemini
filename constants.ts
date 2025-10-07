
import { User, DonationRequest, BloodType, Gender, Urgency, RequestStatus } from './types';

export const MOCK_USER: User = {
    id: 'user-1',
    name: 'Jane Doe',
    age: 28,
    gender: Gender.FEMALE,
    location: 'San Francisco, CA',
    contact: '555-123-4567',
    bloodType: BloodType.A_POSITIVE,
    lastDonationDate: new Date('2024-03-15T10:00:00Z'),
    totalDonations: 5,
    shares: 12,
    livesSaved: 15,
};

export const MOCK_REQUESTS: DonationRequest[] = [
    {
        id: 'req-1',
        patientName: 'John Smith',
        patientAge: 45,
        bloodType: BloodType.O_NEGATIVE,
        unitsNeeded: 2,
        hospital: 'City General Hospital',
        contactNumber: '555-987-6543',
        urgency: Urgency.EMERGENCY,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        status: RequestStatus.PENDING,
        distance: 3.5,
    },
    {
        id: 'req-2',
        patientName: 'Emily White',
        patientAge: 8,
        bloodType: BloodType.B_POSITIVE,
        unitsNeeded: 1,
        hospital: 'Sunshine Pediatrics',
        contactNumber: '555-111-2222',
        urgency: Urgency.URGENT,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        status: RequestStatus.PENDING,
        distance: 8.1,
    },
    {
        id: 'req-3',
        patientName: 'David Green',
        patientAge: 62,
        bloodType: BloodType.A_POSITIVE,
        unitsNeeded: 4,
        hospital: 'Metro Health Center',
        contactNumber: '555-333-4444',
        urgency: Urgency.STANDARD,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        status: RequestStatus.PENDING,
        distance: 12.0,
    },
     {
        id: 'req-4',
        patientName: 'Sarah Connor',
        patientAge: 34,
        bloodType: BloodType.AB_NEGATIVE,
        unitsNeeded: 3,
        hospital: 'St. Jude\'s Medical',
        contactNumber: '555-555-5555',
        urgency: Urgency.URGENT,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: RequestStatus.ACCEPTED,
        distance: 5.2,
    },
];

export const DONATION_ELIGIBILITY_MONTHS = 3;
export const REQUEST_EXPIRY_HOURS = 48;
