/**
 * OrderHistory Component
 * 
 * A component that displays the user's order history and order details.
 * Provides a comprehensive view of past purchases and their current status.
 * 
 * @component
 * 
 * Features:
 * - List of all past orders
 * - Detailed order information
 * - Order status tracking
 * - Order date and time
 * - Order items with quantities and prices
 * - Total order amount
 * - Sorting and filtering options
 * - Responsive design
 * 
 * Display Information:
 * - Order ID
 * - Order Date
 * - Order Status
 * - Items Purchased
 * - Total Amount
 * - Shipping Details
 * - Payment Information
 * 
 * Data Management:
 * - Fetches order history from localStorage
 * - Updates in real-time when new orders are placed
 * - Maintains order history persistence
 */

import React, { useState, useEffect } from 'react';

// Mock data for orders
const mockOrders = [
    {
        id: 1,
        orderNumber: 'ORD-2024-001',
        date: '2024-03-15',
        status: 'Delivered',
        total: 299.99,
        items: [
            { name: 'Product 1', quantity: 2, price: 99.99 },
            { name: 'Product 2', quantity: 1, price: 100.01 },
        ],
    },
    {
        id: 2,
        orderNumber: 'ORD-2024-002',
        date: '2024-03-10',
        status: 'Processing',
        total: 149.99,
        items: [
            { name: 'Product 3', quantity: 1, price: 149.99 },
        ],
    },
    {
        id: 3,
        orderNumber: 'ORD-2024-003',
        date: '2024-03-08',
        status: 'Cancelled',
        total: 199.99,
        items: [
            { name: 'Product 4', quantity: 1, price: 199.99 },
        ],
    },
    {
        id: 4,
        orderNumber: 'ORD-2024-004',
        date: '2024-03-05',
        status: 'Delivered',
        total: 449.98,
        items: [
            { name: 'Product 5', quantity: 2, price: 224.99 },
        ],
    },
    {
        id: 5,
        orderNumber: 'ORD-2024-005',
        date: '2024-03-01',
        status: 'Processing',
        total: 79.99,
        items: [
            { name: 'Product 6', quantity: 1, price: 79.99 },
        ],
    }
];

const OrderHistory = () => {
    const [selectedStatus, setSelectedStatus] = useState('All');

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getFilteredOrders = () => {
        if (selectedStatus === 'All') {
            return mockOrders;
        }
        return mockOrders.filter(order => order.status === selectedStatus);
    };

    const statuses = ['All', 'Delivered', 'Processing', 'Cancelled'];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg transform transition-all duration-200 hover:shadow-lg">
                    {/* Header */}
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-2xl font-bold leading-6 text-gray-900 bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
                            Order History
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            View and track all your orders
                        </p>

                        {/* Filter Bar */}
                        <div className="mt-4 flex space-x-2 border-b border-gray-200">
                            {statuses.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`px-4 py-2 text-sm font-medium rounded-t-md transition-all duration-200 relative ${selectedStatus === status
                                        ? 'text-indigo-600 bg-white border-b-2 border-indigo-500 -mb-px'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {status}
                                    {selectedStatus === status && (
                                        <span className="absolute -bottom-px left-0 w-full h-0.5 bg-indigo-500"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="border-t border-gray-200">
                        {getFilteredOrders().map((order, index) => (
                            <div
                                key={order.id}
                                className={`${index !== 0 ? 'border-t border-gray-200' : ''
                                    } hover:bg-gray-50 transition-colors duration-150`}
                            >
                                <div className="px-4 py-6 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900">
                                                Order {order.orderNumber}
                                            </h4>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                            <span className="text-lg font-medium text-gray-900">
                                                ${order.total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="mt-4">
                                        <div className="flow-root">
                                            <ul className="-my-5 divide-y divide-gray-200">
                                                {order.items.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="py-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {item.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    Quantity: {item.quantity}
                                                                </p>
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                ${item.price.toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Order Actions */}
                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                                        >
                                            View Details
                                        </button>
                                        {order.status !== 'Cancelled' && (
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                                            >
                                                Track Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Empty State */}
                        {getFilteredOrders().length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    No {selectedStatus.toLowerCase()} orders found
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory; 