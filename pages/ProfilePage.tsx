
import React, { useMemo } from 'react';
import { User } from '../types';
import { DONATION_ELIGIBILITY_MONTHS } from '../constants';
import { BloodDropIcon } from '../components/icons';


interface ProfilePageProps {
    user: User;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
        <div className="bg-brand-red-100 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-brand-gray-800">{value}</p>
            <p className="text-sm text-brand-gray-500">{label}</p>
        </div>
    </div>
);

const Badge: React.FC<{ title: string; description: string; icon: string; achieved: boolean }> = ({ title, description, icon, achieved }) => (
    <div className={`text-center p-4 rounded-lg ${achieved ? 'bg-yellow-100' : 'bg-brand-gray-100'}`}>
        <div className={`text-4xl mx-auto mb-2 ${achieved ? '' : 'opacity-30'}`}>{icon}</div>
        <h4 className={`font-bold ${achieved ? 'text-yellow-800' : 'text-brand-gray-600'}`}>{title}</h4>
        <p className={`text-xs ${achieved ? 'text-yellow-600' : 'text-brand-gray-400'}`}>{description}</p>
    </div>
);


const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    
     const { daysToWait, nextEligibleDateFormatted } = useMemo(() => {
        if (!user.lastDonationDate) {
            return { daysToWait: 0, nextEligibleDateFormatted: "Now" };
        }
        const lastDonation = new Date(user.lastDonationDate);
        const nextEligibleDate = new Date(lastDonation);
        nextEligibleDate.setMonth(nextEligibleDate.getMonth() + DONATION_ELIGIBILITY_MONTHS);

        const today = new Date();
        const isEligible = today >= nextEligibleDate;
        
        const timeDiff = nextEligibleDate.getTime() - today.getTime();
        const days = isEligible ? 0 : Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        return { daysToWait: days, nextEligibleDateFormatted: nextEligibleDate.toLocaleDateString() };
    }, [user.lastDonationDate]);


    return (
        <div className="bg-brand-gray-50 min-h-full">
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 text-center">
                    <div className="relative w-24 h-24 mx-auto">
                        <img className="rounded-full object-cover w-full h-full" src={`https://picsum.photos/seed/${user.id}/200`} alt="Profile" />
                         <div className="absolute -bottom-2 -right-2 w-10 h-10 flex items-center justify-center bg-brand-red text-white text-lg font-bold rounded-full border-4 border-white">
                            {user.bloodType}
                        </div>
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-brand-gray-800">{user.name}</h2>
                    <p className="text-brand-gray-500">{user.location}</p>
                </div>

                {/* Countdown Timer */}
                 <div className="bg-brand-red text-white p-6 rounded-xl shadow-lg mb-8 text-center">
                    {daysToWait > 0 ? (
                        <>
                            <h3 className="text-xl font-semibold">Next Donation In</h3>
                            <p className="text-5xl font-bold my-2">{daysToWait} <span className="text-3xl font-normal">Days</span></p>
                            <p className="opacity-80">You can donate again on {nextEligibleDateFormatted}</p>
                        </>
                    ) : (
                         <>
                            <h3 className="text-xl font-semibold">Ready to Save Lives!</h3>
                            <p className="text-4xl font-bold my-2">You are eligible to donate</p>
                            <p className="opacity-80">Your contribution is invaluable. Thank you!</p>
                        </>
                    )}
                </div>


                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard label="Total Donations" value={user.totalDonations} icon={<BloodDropIcon className="w-6 h-6 text-brand-red" />} />
                    <StatCard label="Requests Shared" value={user.shares} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>} />
                    <StatCard label="Lives Saved" value={user.livesSaved} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>} />
                </div>

                {/* Badges / Achievements */}
                <div>
                     <h3 className="text-xl font-bold text-brand-gray-700 mb-4">Achievements</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Badge title="First Drop" description="Completed first donation" icon="💧" achieved={user.totalDonations >= 1} />
                        <Badge title="Life Saver" description="Donated 5 times" icon="❤️" achieved={user.totalDonations >= 5} />
                        <Badge title="Super Donor" description="Donated 10 times" icon="🌟" achieved={user.totalDonations >= 10} />
                        <Badge title="Community Hero" description="Shared 10 requests" icon="🤝" achieved={user.shares >= 10} />
                     </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
