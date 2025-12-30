import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, MapPin, Star, Calendar, DollarSign, Clock, Bell, Settings, Plus } from 'lucide-react'

const GuideDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Bookings', value: '47', icon: Calendar, color: 'text-blue-600' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-600' },
    { label: 'Total Earnings', value: '₹1,24,000', icon: DollarSign, color: 'text-green-600' },
    { label: 'Active Hours', value: '320', icon: Clock, color: 'text-purple-600' }
  ]

  const recentBookings = [
    {
      id: 1,
      traveler: 'Priya Sharma',
      date: '2024-01-15',
      duration: '1 day',
      amount: '₹2,500',
      status: 'confirmed'
    },
    {
      id: 2,
      traveler: 'Rajesh Kumar',
      date: '2024-01-18',
      duration: '2 days',
      amount: '₹5,000',
      status: 'pending'
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: Settings }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Guide Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your bookings and grow your guiding business
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Update Availability
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {booking.traveler.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.traveler}</p>
                          <p className="text-gray-500 text-sm">{booking.date} • {booking.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{booking.amount}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label} Section
            </h3>
            <p className="text-gray-600">
              This section is under development. More features coming soon!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default GuideDashboard
