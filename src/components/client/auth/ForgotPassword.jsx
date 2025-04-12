/**
 * ForgotPassword Component
 * 
 * A component that handles the password reset functionality.
 * Allows users to reset their password by providing their email and new password.
 * 
 * @component
 * 
 * Features:
 * - Email verification
 * - New password input and confirmation
 * - Password validation
 * - Error handling and display
 * - Success message display
 * - Loading state management
 * - Local storage password update
 * - Automatic redirect after successful reset
 * 
 * Validation Rules:
 * - Email must exist in the system
 * - New password must be at least 6 characters
 * - New password and confirm password must match
 * - All fields are required
 * 
 * Flow:
 * 1. User enters email
 * 2. User enters new password and confirms it
 * 3. System validates inputs
 * 4. Password is updated in localStorage
 * 5. User is redirected to login page
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputGroup from './InputGroup';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');

        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            setErrors({
                confirmPassword: 'Passwords do not match'
            });
            setIsLoading(false);
            return;
        }

        // Validate password length
        if (formData.newPassword.length < 6) {
            setErrors({
                newPassword: 'Password must be at least 6 characters long'
            });
            setIsLoading(false);
            return;
        }

        try {
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Find user with matching email
            const userIndex = users.findIndex(user => user.email === formData.email);

            if (userIndex === -1) {
                setErrors({
                    email: 'No account found with this email address'
                });
                setIsLoading(false);
                return;
            }

            // Update user's password
            users[userIndex].password = formData.newPassword;
            users[userIndex].updatedAt = new Date().toISOString();

            // Save updated users to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // If the current user is the one resetting their password, update their session
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (currentUser && currentUser.email === formData.email) {
                currentUser.password = formData.newPassword;
                localStorage.setItem('user', JSON.stringify(currentUser));
            }

            setSuccessMessage('Password has been reset successfully!');

            // Redirect to login after a short delay
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000);

        } catch (error) {
            console.error('Password reset error:', error);
            setErrors({
                submit: 'An error occurred while resetting your password'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg transform transition-all duration-200 hover:shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email and choose a new password
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {(errors.submit || successMessage) && (
                        <div className={`${errors.submit ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'} border-l-4 p-4 rounded-md`}>
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    {errors.submit ? (
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className={`text-sm ${errors.submit ? 'text-red-700' : 'text-green-700'}`}>
                                        {errors.submit || successMessage}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm space-y-4">
                        <InputGroup
                            label="Email address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                            className="p-3"
                        />
                        <InputGroup
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={errors.newPassword}
                            required
                            className="p-3"
                        />
                        <InputGroup
                            label="Confirm New Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                            className="p-3"
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]`}
                        >
                            {isLoading ? 'Resetting Password...' : 'Reset Password'}
                        </button>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                            >
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword; 