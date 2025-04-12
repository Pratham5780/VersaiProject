/**
 * LoginForm Component
 * 
 * A component that handles user authentication through a login form.
 * Provides email and password input fields, form validation, and authentication state management.
 * 
 * @component
 * @param {Object} props
 * @param {Function} props.setIsAuthenticated - Function to update authentication state
 * @param {boolean} props.isAuthenticated - Current authentication state
 * 
 * Features:
 * - Email and password validation
 * - Error handling and display
 * - Loading state management
 * - Redirect to profile on successful login
 * - "Forgot password" functionality
 * - Link to registration page
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import InputGroup from './InputGroup';

const LoginForm = ({ setIsAuthenticated, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('Login form submitted');

        // Mock API call - replace with actual API call
        try {
            // Simulate API call
            console.log('Login attempt with:', formData);

            // Simulate successful login
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Set authentication state
            setIsAuthenticated(true);
            setIsLoading(false);

            // Navigate to profile
            navigate('/profile', { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
            setErrors({
                submit: 'Invalid email or password',
            });
        }
    };

    return (
        <AuthForm
            title="Sign in to your account"
            subtitle="Welcome back! Please enter your details."
        >
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm space-y-4">
                    <InputGroup
                        label="Email address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                    />
                    <InputGroup
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <Link
                            to="/forgot-password"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                {errors.submit && (
                    <div className="text-red-600 text-sm text-center">{errors.submit}</div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>

            <div className="text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <Link
                    to="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Sign up
                </Link>
            </div>
        </AuthForm>
    );
};

export default LoginForm; 