import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Star, Clock, DollarSign, User, Phone, Mail, CreditCard, Send, CheckCircle, XCircle, AlertCircle, Shield, Heart, MessageCircle, Camera } from 'lucide-react'
import { useApp } from '../context/AppContext'

const UserDashboard = () => {
  const navigate = useNavigate()
  const { currentUser, getUserBookings, initiateEscrowPayment, completeTrip, loading, getProviderById } = useApp()
  const [activeTab, setActiveTab] = useState('all-requests')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [viewTripDetails, setViewTripDetails] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')

  const userBookings = getUserBookings()

  // Categorize bookings by status
  const pendingRequests = userBookings.filter(b => b.status === 'pending_acceptance')
  const acceptedRequests = userBookings.filter(b => b.status === 'accepted')
  const activeTrips = userBookings.filter(b => b.status === 'payment_held')
  const completedTrips = userBookings.filter(b => b.status === 'completed')

  const handleEscrowPayment = async (request) => {
    if (!paymentAmount) return
    try {
      await initiateEscrowPayment(request.id, parseFloat(paymentAmount))
      setSelectedRequest(null)
      setPaymentAmount('')
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

  const handleCompleteTrip = async (request) => {
    try {
      await completeTrip(request.id, rating, review)
      setSelectedRequest(null)
      setRating(5)
      setReview('')
    } catch (error) {
      console.error('Trip completion failed:', error)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending_acceptance': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'accepted': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'payment_held': return <Shield className="w-4 h-4 text-blue-500" />
      case 'completed': return <Star className="w-4 h-4 text-purple-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending_acceptance': return 'Waiting for Response'
      case 'accepted': return 'Accepted - Pay to Start'
      case 'payment_held': return 'Trip Active'
      case 'completed': return 'Completed'
      default: return status
    }
  }

  const favorites = [
    { id: 1, name: 'Ravi Kumar', type: 'guide', location: 'Visakhapatnam', rating: 4.8 },
    { id: 2, name: 'Coastal Adventures', type: 'agency', location: 'Goa', rating: 4.6 }
  ]

  const tabs = [
    { id: 'all-requests', label: 'All Requests', icon: Send, count: pendingRequests.length },
    { id: 'accepted', label: 'Accepted Requests', icon: CheckCircle, count: acceptedRequests.length },
    { id: 'active', label: 'Active Trips', icon: Shield, count: activeTrips.length },
    { id: 'completed', label: 'Completed', icon: Star, count: completedTrips.length },
    { id: 'profile', label: 'Profile', icon: User }
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
                My Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Track your journeys and manage your travel experiences
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{currentUser?.name}</p>
                <p className="text-gray-500 text-sm">Travel Enthusiast</p>
              </div>
              <button
                onClick={() => navigate('/destinations')}
                className="btn-primary"
              >
                Plan New Trip
              </button>
            </div>
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
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {tab.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* All Requests Tab */}
        {activeTab === 'all-requests' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
                    Pending Requests ({pendingRequests.length})
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {pendingRequests.map((request) => {
                    const provider = getProviderById(request.providerId, request.providerType)
                    return (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-yellow-300 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                              {provider?.image || '👤'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{request.destination}</h4>
                              <p className="text-primary-600 font-medium text-sm">
                                {provider?.name || 'Provider'}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {request.providerType === 'guide' ? '🗺️ Local Guide' : '🏢 Travel Agency'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                            {getStatusIcon(request.status)}
                            <span className="ml-1 text-xs font-medium">{getStatusText(request.status)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(request.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {request.people} people
                          </div>
                          {provider?.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {provider.location}
                            </div>
                          )}
                        </div>
                        <div className="bg-gray-50 rounded p-2 text-xs text-gray-600">
                          📤 Sent on {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Summary Card */}
            {(pendingRequests.length > 0 || acceptedRequests.length > 0) && (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Pending Requests</p>
                        <p className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</p>
                      </div>
                      <AlertCircle className="w-8 h-8 text-yellow-500" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Waiting for provider response</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Accepted Requests</p>
                        <p className="text-2xl font-bold text-green-600">{acceptedRequests.length}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Ready for payment</p>
                    {acceptedRequests.length > 0 && (
                      <button
                        onClick={() => setActiveTab('accepted')}
                        className="text-xs text-green-600 hover:text-green-700 mt-1 underline"
                      >
                        View accepted requests →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {pendingRequests.length === 0 && acceptedRequests.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Requests Yet</h3>
                <p className="text-gray-600 mb-4">
                  Start by exploring destinations and sending requests to guides and agencies.
                </p>
                <button
                  onClick={() => navigate('/destinations')}
                  className="btn-primary"
                >
                  Plan Your First Trip
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Accepted Requests Tab */}
        {activeTab === 'accepted' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {acceptedRequests.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Accepted Requests ({acceptedRequests.length})
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    These requests have been accepted by providers. Pay to start your trip!
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  {acceptedRequests.map((request) => {
                    const provider = getProviderById(request.providerId, request.providerType)
                    return (
                      <div key={request.id} className="border border-green-200 rounded-lg p-4 bg-green-50 hover:border-green-400 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                              {provider?.image || '👤'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{request.destination}</h4>
                              <p className="text-green-700 font-medium text-sm">
                                ✅ {provider?.name || 'Provider'} accepted your request!
                              </p>
                              <p className="text-gray-600 text-xs">
                                {request.providerType === 'guide' ? '🗺️ Local Guide' : '🏢 Travel Agency'} • Ready for Payment
                              </p>
                              {request.placeNames && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Places: {request.placeNames.join(', ')}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedRequest(request)
                              setPaymentAmount('5000') // Default amount
                            }}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex-shrink-0"
                          >
                            Pay & Start Trip
                          </button>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(request.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {request.people} people
                          </div>
                          {request.duration && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {request.duration}
                            </div>
                          )}
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-green-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-800">
                              ✅ Accepted on {new Date(request.acceptedAt).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-green-600">
                              Ready for escrow payment
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Accepted Requests</h3>
                <p className="text-gray-600 mb-4">
                  Requests that are accepted by providers will appear here.
                </p>
                <button
                  onClick={() => navigate('/destinations')}
                  className="btn-primary"
                >
                  Send New Requests
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Active Trips Tab */}
        {activeTab === 'active' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {activeTrips.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-500" />
                    Active Trips ({activeTrips.length})
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {activeTrips.map((trip) => {
                    const provider = getProviderById(trip.providerId, trip.providerType)
                    return (
                      <div key={trip.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50 hover:border-blue-400 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                              {provider?.image || '👤'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{trip.destination}</h4>
                              <p className="text-blue-700 font-medium text-sm">
                                🛡️ Trip with {provider?.name || 'Provider'}
                              </p>
                              <p className="text-gray-600 text-xs">
                                {trip.providerType === 'guide' ? '🗺️ Local Guide' : '🏢 Travel Agency'} • Payment Held in Escrow
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedRequest(trip)
                              setRating(5)
                              setReview('')
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex-shrink-0"
                          >
                            Complete Trip
                          </button>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(trip.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Shield className="w-4 h-4 mr-1" />
                            ₹{trip.escrowAmount?.toLocaleString()} in escrow
                          </div>
                        </div>
                        <p className="text-xs text-blue-700 font-medium">
                          💰 Payment initiated on {new Date(trip.escrowInitiatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Trips</h3>
                <p className="text-gray-600">Your active trips with escrow payments will appear here.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Completed Trips Tab */}
        {activeTab === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {completedTrips.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-purple-500" />
                    Completed Trips ({completedTrips.length})
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {completedTrips.map((trip) => {
                    const provider = getProviderById(trip.providerId, trip.providerType)
                    return (
                      <div key={trip.id} className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                              {provider?.image || '👤'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{trip.destination}</h4>
                              <p className="text-purple-700 font-medium text-sm">
                                {provider?.name || 'Provider'}
                              </p>
                              <p className="text-gray-600 text-xs">
                                {trip.providerType === 'guide' ? '🗺️ Local Guide' : '🏢 Travel Agency'} • Completed
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: trip.rating || 5 }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(trip.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed {new Date(trip.completedAt).toLocaleDateString()}
                          </div>
                          <button
                            onClick={() => setViewTripDetails(trip)}
                            className="bg-gray-100/50 text-gray-600 hover:text-purple-600 px-3 py-1 rounded-md text-xs font-medium border border-gray-200 hover:border-purple-200 transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                        {trip.review && (
                          <p className="text-sm text-gray-700 bg-white rounded p-2 mt-2">
                            "{trip.review}"
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Completed Trips</h3>
                <p className="text-gray-600">Your completed trips and reviews will appear here.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentUser?.name}</h3>
            <p className="text-gray-600 mb-4">{currentUser?.email}</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">{completedTrips.length}</div>
                <div className="text-sm text-gray-500">Trips Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-600">{pendingRequests.length + acceptedRequests.length}</div>
                <div className="text-sm text-gray-500">Active Requests</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-600">
                  {completedTrips.reduce((sum, trip) => sum + (trip.rating || 0), 0) / (completedTrips.length || 1)}
                </div>
                <div className="text-sm text-gray-500">Avg Rating</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Modal */}
        {selectedRequest && selectedRequest.status === 'accepted' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Initiate Escrow Payment</h3>
              <p className="text-gray-600 mb-4">
                Pay securely to start your trip. Money will be held in escrow until trip completion.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount (₹)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEscrowPayment(selectedRequest)}
                  disabled={loading || !paymentAmount}
                  className="flex-1 bg-primary-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Pay & Start Trip'}
                </button>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Trip Completion Modal */}
        {selectedRequest && selectedRequest.status === 'payment_held' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Trip & Release Payment</h3>
              <p className="text-gray-600 mb-4">
                Rate your experience and release the escrow payment to the provider.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleCompleteTrip(selectedRequest)}
                  disabled={loading}
                  className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Complete & Pay'}
                </button>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Trip Details Modal */}
        {viewTripDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Trip Details</h3>
                  <p className="text-sm text-gray-500">Trip ID: #{viewTripDetails.id}</p>
                </div>
                <button
                  onClick={() => setViewTripDetails(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <h4 className="text-lg font-medium text-purple-900 mb-2">{viewTripDetails.destination}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {viewTripDetails.placeNames?.map((place, index) => (
                      <span key={index} className="px-2 py-1 bg-white text-purple-700 text-xs rounded-full border border-purple-100 shadow-sm">
                        {place}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-purple-700">
                    Provider: <span className="font-semibold">{getProviderById(viewTripDetails.providerId, viewTripDetails.providerType)?.name}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                    <p className="font-medium text-gray-900">{viewTripDetails.duration}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Travelers</p>
                    <p className="font-medium text-gray-900">{viewTripDetails.people} People</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Start Date</p>
                    <p className="font-medium text-gray-900">{new Date(viewTripDetails.date).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Completed On</p>
                    <p className="font-medium text-gray-900">
                      {viewTripDetails.completedAt ? new Date(viewTripDetails.completedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h5 className="font-medium text-gray-900 mb-3">Payment Summary</h5>
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <span className="text-gray-700">Total Paid</span>
                    <span className="text-xl font-bold text-gray-900">₹{viewTripDetails.escrowAmount?.toLocaleString()}</span>
                  </div>
                </div>

                {viewTripDetails.review && (
                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-medium text-gray-900 mb-3">Your Review</h5>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < (viewTripDetails.rating || 5) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-yellow-800">{viewTripDetails.rating}/5.0</span>
                      </div>
                      <p className="text-gray-700 italic">"{viewTripDetails.review}"</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewTripDetails(null)}
                  className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default UserDashboard
