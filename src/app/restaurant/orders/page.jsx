'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  CurrencyRupeeIcon,
} from '@heroicons/react/24/outline';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [restaurantId, setRestaurantId] = useState(null);
  const [stats, setStats] = useState({});

  // Get restaurant ID from localStorage
  useEffect(() => {
    const getRestaurantId = () => {
      try {
        const restaurantData = localStorage.getItem('restaurant_data');
        if (restaurantData) {
          const parsed = JSON.parse(restaurantData);
          return parsed._id || parsed.id;
        }
        return '123456789'; // Fallback for demo
      } catch (error) {
        console.error('Error getting restaurant ID:', error);
        return '123456789';
      }
    };

    setRestaurantId(getRestaurantId());
  }, []);

  // Fetch orders
  const fetchOrders = async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);
      const statusParam = selectedStatus !== 'all' ? `&status=${selectedStatus}` : '';
      const response = await fetch(`/api/orders/restaurant/${restaurantId}?limit=50${statusParam}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders || []);
      setStats(data.stats || {});
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [restaurantId, selectedStatus]);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const result = await response.json();
      
      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'served': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate time elapsed
  const getTimeElapsed = (orderTime) => {
    const now = new Date();
    const ordered = new Date(orderTime);
    const diffMinutes = Math.floor((now - ordered) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return `${hours}h ${minutes}m ago`;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <button
          onClick={fetchOrders}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
        >
          Refresh Orders
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2 overflow-x-auto">
        {['all', 'pending', 'confirmed', 'preparing', 'ready', 'served'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedStatus === status
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    #{order.orderNumber}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatTime(order.orderedAt)} • {getTimeElapsed(order.orderedAt)}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Customer:</strong> {order.customerInfo?.name || 'Walk-in'}
                </p>
                {order.tableNumber && (
                  <p className="text-sm text-gray-600">
                    <strong>Table:</strong> {order.tableNumber}
                  </p>
                )}
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
                <div className="space-y-1">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{item.itemTotal}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-4 pt-2 border-t">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-lg text-teal-600">₹{order.total}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {order.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(order._id, 'confirmed')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                  >
                    Confirm
                  </button>
                )}
                {order.status === 'confirmed' && (
                  <button
                    onClick={() => updateOrderStatus(order._id, 'preparing')}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-sm"
                  >
                    Start Preparing
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order._id, 'ready')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
                  >
                    Mark Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order._id, 'served')}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm"
                  >
                    Mark Served
                  </button>
                )}
                {(order.status === 'pending' || order.status === 'confirmed') && (
                  <button
                    onClick={() => updateOrderStatus(order._id, 'cancelled')}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
