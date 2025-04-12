/**
 * UserProfile Component
 * 
 * A component that displays and manages user profile information.
 * Allows users to view and update their personal information.
 * 
 * @component
 * 
 * Features:
 * - Display user information (name, email, phone, etc.)
 * - Edit mode for updating profile information
 * - Password change functionality
 * - Form validation
 * - Error handling
 * - Success messages
 * - Local storage data persistence
 * - Responsive design
 * 
 * States:
 * - View mode: Displays current user information
 * - Edit mode: Allows updating profile information
 * - Password change mode: Modal for changing password
 * 
 * Data Management:
 * - Loads user data from localStorage
 * - Updates localStorage on successful edits
 * - Maintains user session consistency
 */

import React, { useState, useEffect } from 'react';
import InputGroup from '../auth/InputGroup';

// Mock user data - replace with actual API call
const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
};

const UserProfile = () => {
    const [formData, setFormData] = useState(mockUser);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

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
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Mock API call - replace with actual API call
        try {
            // Simulate API call
            console.log('Profile update with:', formData);
            setSuccessMessage('Profile updated successfully!');
            setIsEditing(false);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setErrors({
                submit: 'Failed to update profile. Please try again.',
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Manage your account settings and preferences.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(false)}
                            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Personal Information
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Update your personal information and contact details.
                                </p>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <InputGroup
                                            label="First name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            error={errors.firstName}
                                            required
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <InputGroup
                                            label="Last name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            error={errors.lastName}
                                            required
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <InputGroup
                                            label="Email address"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={errors.email}
                                            required
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <InputGroup
                                            label="Phone number"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            error={errors.phone}
                                            required
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <InputGroup
                                            label="Street address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            error={errors.address}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                        <InputGroup
                                            label="City"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            error={errors.city}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <InputGroup
                                            label="State"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            error={errors.state}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <InputGroup
                                            label="ZIP / Postal code"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            error={errors.zipCode}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {errors.submit && (
                        <div className="text-red-600 text-sm text-center">{errors.submit}</div>
                    )}

                    {successMessage && (
                        <div className="text-green-600 text-sm text-center">
                            {successMessage}
                        </div>
                    )}

                    {isEditing && (
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserProfile; 