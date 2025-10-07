
import React from 'react';
import { DonationRequest, Urgency } from '../types';
import { ClockIcon, LocationMarkerIcon, ShareIcon } from './icons';
import { REQUEST_EXPIRY_HOURS } from '../constants';

interface RequestCardProps {
    request: DonationRequest;
    isEligible: boolean;
}

const UrgencyBadge: React.FC<{ urgency: Urgency }> = ({ urgency }) => {
    const urgencyClasses = {
        [Urgency.STANDARD]: 'bg-blue-100 text-blue-800',
        [Urgency.URGENT]: 'bg-yellow-100 text-yellow-800 animate-pulse',
        [Urgency.EMERGENCY]: 'bg-red-100 text-red-800 font-bold animate-pulse',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${urgencyClasses[urgency]}`}>{urgency}</span>;
};

const BloodTypeBadge: React.FC<{ bloodType: string }> = ({ bloodType }) => (
    <div className="w-12 h-12 flex items-center justify-center bg-brand-red-light rounded-full border-2 border-white shadow-md">
        <span className="text-lg font-bold text-white">{bloodType}</span>
    </div>
);

const RequestCard: React.FC<RequestCardProps> = ({ request, isEligible }) => {
    
    const timeSinceRequest = (): string => {
        const now = new Date();
        const diff = now.getTime() - new Date(request.createdAt).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) {
            const minutes = Math.floor(diff / (1000 * 60));
            return `${minutes} min ago`;
        }
        return `${hours} hr ago`;
    };

    const timeLeft = (): string => {
        const expiryDate = new Date(new Date(request.createdAt).getTime() + REQUEST_EXPIRY_HOURS * 60 * 60 * 1000);
        const diff = expiryDate.getTime() - new Date().getTime();
        if (diff <= 0) return 'Expired';
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m left`;
    };


    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <BloodTypeBadge bloodType={request.bloodType} />
                        <div>
                            <h3 className="text-lg font-bold text-brand-gray-800">
                                {request.unitsNeeded} {request.unitsNeeded > 1 ? 'Units' : 'Unit'} Needed
                            </h3>
                            <p className="text-sm text-brand-gray-500">For {request.patientName}, Age {request.patientAge}</p>
                        </div>
                    </div>
                    <UrgencyBadge urgency={request.urgency} />
                </div>

                <div className="mt-4 space-y-2 text-sm text-brand-gray-600">
                    <div className="flex items-center gap-2">
                        <LocationMarkerIcon className="w-4 h-4 text-brand-red" />
                        <span>{request.hospital} ({request.distance} km away)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-brand-red" />
                        <span>Posted {timeSinceRequest()}  &bull; <span className="font-semibold">{timeLeft()}</span></span>
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-brand-gray-200 flex items-center justify-between gap-3">
                    <button 
                        disabled={!isEligible}
                        className="w-full text-center px-4 py-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold rounded-lg shadow-md transition-colors duration-300 disabled:bg-brand-gray-300 disabled:cursor-not-allowed">
                        Accept
                    </button>
                    <button className="p-2 text-brand-gray-500 hover:bg-brand-gray-100 rounded-full transition-colors">
                        <ShareIcon className="w-6 h-6" />
                    </button>
                </div>
                 {!isEligible && <p className="text-xs text-center text-yellow-600 mt-2">You are not eligible to accept requests now.</p>}
            </div>
        </div>
    );
};

export default RequestCard;
