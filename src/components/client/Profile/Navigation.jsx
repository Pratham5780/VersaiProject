import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [userInitials, setUserInitials] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [showNotification, setShowNotification] = useState(true);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    useEffect(() => {
        // Check authentication on component mount
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
            return;
        }

        // Get user data
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUserEmail(userData.email);
            // Create initials from email
            const initials = userData.email
                .split('@')[0]
                .split('.')
                .map(part => part[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
            setUserInitials(initials);
        }
    }, [navigate]);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('isAuthenticated');

        // Close menus
        setIsProfileMenuOpen(false);
        setIsMobileMenuOpen(false);

        // Navigate to login page
        navigate('/login', { replace: true });
    };

    const handleNotificationClick = () => {
        setShowNotification(false);
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and primary nav */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">
                                Versai
                            </span>
                        </Link>
                        <div className="hidden md:flex md:ml-10 md:space-x-8">
                            <Link
                                to="/profile"
                                className={`px-3 py-2 text-sm font-medium ${isActive('/profile')
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Profile
                            </Link>
                            <Link
                                to="/orders"
                                className={`px-3 py-2 text-sm font-medium ${isActive('/orders')
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Order History
                            </Link>
                        </div>
                    </div>

                    {/* Right side buttons */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={handleNotificationClick}
                                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                <span className="sr-only">View notifications</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                {/* Red Dot Notification */}
                                {showNotification && (
                                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                                )}
                            </button>

                            {/* Notification Popup */}
                            {isNotificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-3">
                                        <p className="text-sm text-gray-700">
                                            Hope you like the website ~Pratham Khandelwal
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                className="flex items-center rounded-full bg-indigo-600 text-white"
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className="h-8 w-8 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium">{userInitials}</span>
                                </div>
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-2 text-xs text-gray-500">
                                        Signed in as<br />
                                        <span className="font-medium text-gray-900">{userEmail}</span>
                                    </div>
                                    <div className="border-t border-gray-100"></div>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Orders
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMobileMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <div className="px-4 py-2 text-xs text-gray-500">
                            Signed in as<br />
                            <span className="font-medium text-gray-900">{userEmail}</span>
                        </div>
                        <Link
                            to="/profile"
                            className={`block px-3 py-2 text-base font-medium ${isActive('/profile')
                                ? 'text-indigo-600 bg-indigo-50'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Profile
                        </Link>
                        <Link
                            to="/orders"
                            className={`block px-3 py-2 text-base font-medium ${isActive('/orders')
                                ? 'text-indigo-600 bg-indigo-50'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Order History
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full px-3 py-2 text-left text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation; 