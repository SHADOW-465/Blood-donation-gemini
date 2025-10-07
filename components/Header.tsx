
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BloodDropIcon, HomeIcon, LogoutIcon, ProfileIcon } from './icons';

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const linkClass = "flex items-center gap-2 px-3 py-2 text-brand-gray-500 hover:bg-brand-red-100 hover:text-brand-red-dark rounded-md transition-colors";
    const activeLinkClass = "bg-brand-red-100 text-brand-red-dark font-semibold";

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                         <svg className="w-8 h-8 text-brand-red" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.031c-5.297 0-9.584 4.287-9.584 9.584 0 4.195 2.703 7.766 6.414 9.008.313.055.446-.133.446-.297v-1.09c-2.625.562-3.172-1.266-3.172-1.266-.281-.726-.695-1.023-.695-1.023-.57-.383.047-.375.047-.375.633.047.96.648.96.648.562 1.016 1.476.719 1.836.555.055-.422.219-.719.398-.883-1.406-.156-2.89-7.03-2.89-1.57 0-.344.125-.633.328-.852-.03-.156-.14-.406.03-.836 0 0 .53-.172 1.734.648.5-.14 1.03-.21 1.562-.219.53 0 1.062.07 1.562.219 1.203-.82 1.734-.648 1.734-.648.172.43.063.68.031.836.203.219.328.508.328.852 0 .828-1.484 1.414-2.898 1.57.227.195.422.586.422 1.18v1.734c0 .164.133.352.445.297 3.71-.1242 6.414-4.813 6.414-9.008 0-5.297-4.287-9.584-9.584-9.584z"/>
                        </svg>
                        <span className="text-xl font-bold text-brand-red-dark">LifeLink</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-2">
                        <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
                            <HomeIcon className="w-5 h-5" />
                            <span>Home</span>
                        </NavLink>
                        <NavLink to="/profile" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
                            <ProfileIcon className="w-5 h-5" />
                            <span>Profile</span>
                        </NavLink>
                    </nav>
                    <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 text-brand-gray-500 hover:bg-brand-red-100 hover:text-brand-red-dark rounded-md transition-colors">
                        <LogoutIcon className="w-5 h-5" />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
