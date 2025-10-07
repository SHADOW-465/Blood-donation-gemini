
import React, { useMemo } from 'react';
import { User } from '../types';
import { DONATION_ELIGIBILITY_MONTHS } from '../constants';

interface EligibilityBannerProps {
    user: User;
}

const EligibilityBanner: React.FC<EligibilityBannerProps> = ({ user }) => {
    const { isEligible, daysToWait, nextEligibleDate } = useMemo(() => {
        if (!user.lastDonationDate) {
            return { isEligible: true, daysToWait: 0, nextEligibleDate: null };
        }
        const lastDonation = new Date(user.lastDonationDate);
        const nextEligibleDate = new Date(lastDonation);
        nextEligibleDate.setMonth(nextEligibleDate.getMonth() + DONATION_ELIGIBILITY_MONTHS);

        const today = new Date();
        const isEligible = today >= nextEligibleDate;
        
        const timeDiff = nextEligibleDate.getTime() - today.getTime();
        const daysToWait = isEligible ? 0 : Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        return { isEligible, daysToWait, nextEligibleDate };
    }, [user.lastDonationDate]);

    if (isEligible) {
        return (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-sm" role="alert">
                <div className="flex">
                    <div className="py-1">
                        <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                    </div>
                    <div>
                        <p className="font-bold">You are eligible to donate!</p>
                        <p className="text-sm">Thank you for being a potential lifesaver. Your next donation can make a huge difference.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-sm" role="alert">
            <div className="flex">
                <div className="py-1">
                     <svg className="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5v6h2V5H9zm0 8h2v2H9v-2z"/></svg>
                </div>
                <div>
                    <p className="font-bold">Donation Eligibility Cooldown</p>
                    <p className="text-sm">You can donate again in <span className="font-semibold">{daysToWait} days</span> (on {nextEligibleDate?.toLocaleDateString()}).</p>
                </div>
            </div>
        </div>
    );
};

export default EligibilityBanner;
