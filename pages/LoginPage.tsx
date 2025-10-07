
import React, { useState } from 'react';
import { BloodType, Gender, User } from '../types';
import { MOCK_USER } from '../constants';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [name, setName] = useState('Jane Doe');
    const [age, setAge] = useState('28');
    const [bloodType, setBloodType] = useState<BloodType>(BloodType.A_POSITIVE);
    const [agreed, setAgreed] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (agreed) {
            // In a real app, this would involve authentication.
            // Here, we'll just use the mock user data and overwrite some fields.
            const user: User = {
                ...MOCK_USER,
                name,
                age: parseInt(age),
                bloodType,
            };
            onLogin(user);
        } else {
            alert("You must agree to the terms and conditions.");
        }
    };

    const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm";
    const labelClass = "block text-sm font-medium text-brand-gray-700";

    return (
        <div className="min-h-screen bg-brand-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                     <div className="flex items-center justify-center gap-2">
                        <svg className="w-12 h-12 text-brand-red" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2.031c-5.297 0-9.584 4.287-9.584 9.584 0 4.195 2.703 7.766 6.414 9.008.313.055.446-.133.446-.297v-1.09c-2.625.562-3.172-1.266-3.172-1.266-.281-.726-.695-1.023-.695-1.023-.57-.383.047-.375.047-.375.633.047.96.648.96.648.562 1.016 1.476.719 1.836.555.055-.422.219-.719.398-.883-1.406-.156-2.89-7.03-2.89-1.57 0-.344.125-.633.328-.852-.03-.156-.14-.406.03-.836 0 0 .53-.172 1.734.648.5-.14 1.03-.21 1.562-.219.53 0 1.062.07 1.562.219 1.203-.82 1.734-.648 1.734-.648.172.43.063.68.031.836.203.219.328.508.328.852 0 .828-1.484 1.414-2.898 1.57.227.195.422.586.422 1.18v1.734c0 .164.133.352.445.297 3.71-.1242 6.414-4.813 6.414-9.008 0-5.297-4.287-9.584-9.584-9.584z"/>
                        </svg>
                        <span className="text-3xl font-bold text-brand-red-dark">LifeLink</span>
                    </div>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                        Join our community of lifesavers
                    </h2>
                </div>
                <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className={labelClass}>Full Name</label>
                            <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                        </div>
                         <div className="pt-4">
                            <label htmlFor="age" className={labelClass}>Age</label>
                            <input id="age" name="age" type="number" required value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} />
                        </div>
                        <div className="pt-4">
                            <label htmlFor="bloodType" className={labelClass}>Blood Type</label>
                            <select id="bloodType" value={bloodType} onChange={e => setBloodType(e.target.value as BloodType)} className={inputClass} required>
                                {Object.values(BloodType).map(bt => <option key={bt} value={bt}>{bt}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="agree-terms" name="agree-terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300 rounded" />
                            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the <a href="#" className="font-medium text-brand-red hover:text-brand-red-dark">Terms & Conditions</a>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-red hover:bg-brand-red-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:bg-brand-gray-400" disabled={!agreed}>
                            Register & Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
