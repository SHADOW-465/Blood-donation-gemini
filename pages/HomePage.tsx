
import React, { useMemo, useState } from 'react';
import { DonationRequest, Urgency, User } from '../types';
import EligibilityBanner from '../components/EligibilityBanner';
import RequestCard from '../components/RequestCard';
import CreateRequestModal from '../components/CreateRequestModal';
import { PlusIcon } from '../components/icons';
import { DONATION_ELIGIBILITY_MONTHS } from '../constants';

interface HomePageProps {
    user: User;
    requests: DonationRequest[];
    addRequest: (request: Omit<DonationRequest, 'id' | 'createdAt' | 'status' | 'distance'>) => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, requests, addRequest }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const isUserEligible = useMemo(() => {
        if (!user.lastDonationDate) return true;
        const lastDonation = new Date(user.lastDonationDate);
        const nextEligibleDate = new Date(lastDonation.setMonth(lastDonation.getMonth() + DONATION_ELIGIBILITY_MONTHS));
        return new Date() >= nextEligibleDate;
    }, [user.lastDonationDate]);

    const sortedRequests = useMemo(() => {
        return [...requests].sort((a, b) => {
            const urgencyOrder = { [Urgency.EMERGENCY]: 0, [Urgency.URGENT]: 1, [Urgency.STANDARD]: 2 };
            if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
                return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
            }
            if (a.createdAt !== b.createdAt) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            return a.distance - b.distance;
        });
    }, [requests]);

    return (
        <div className="container mx-auto px-4 py-6">
            <EligibilityBanner user={user} />

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-brand-gray-800 mb-4">Nearby Emergency Requests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedRequests.map(req => (
                        <RequestCard key={req.id} request={req} isEligible={isUserEligible} />
                    ))}
                </div>
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110"
                aria-label="Create new request"
            >
                <PlusIcon className="w-8 h-8" />
            </button>

            <CreateRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={addRequest}
            />
        </div>
    );
};

export default HomePage;
