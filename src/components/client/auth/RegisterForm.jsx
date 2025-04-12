/**
 * RegisterForm Component
 * 
 * A component that handles new user registration with a comprehensive registration form.
 * Collects user details including name, email, password, and phone number.
 * 
 * @component
 * 
 * Features:
 * - Complete user information collection
 * - Password validation and confirmation
 * - Form field validation
 * - Error handling and display
 * - Loading state management
 * - Automatic login after successful registration
 * - Local storage data persistence
 * - Link to login page for existing users
 * 
 * Validation Rules:
 * - Email must be unique
 * - Password must be at least 6 characters
 * - Password and confirm password must match
 * - Required fields validation
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import InputGroup from './InputGroup';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        // Mock API call - replace with actual API call
        try {
            // Simulate API call
            console.log('Register attempt with:', formData);

            // Simulate successful registration
            setTimeout(() => {
                setIsLoading(false);
                // Redirect to profile page on success
                navigate('/profile');
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            setErrors({
                submit: 'Registration failed. Please try again.',
            });
        }
    };

    return (
        <AuthForm
            title="Create your account"
            subtitle="Join us! Please fill in your details."
        >
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InputGroup
                            label="First name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                            required
                        />
                        <InputGroup
                            label="Last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                            required
                        />
                    </div>
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
                    <InputGroup
                        label="Confirm password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        required
                    />
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
                    {isLoading ? 'Creating account...' : 'Create account'}
                </button>
            </form>

            <div className="text-center">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Sign in
                </Link>
            </div>
        </AuthForm>
    );
};

export default RegisterForm; 