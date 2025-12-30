import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Users, CheckCircle, XCircle, Send, Bell, Clock, Star, ArrowRight, Sparkles } from 'lucide-react'

const LiveSimulationPage = () => {
  const [tripRequest, setTripRequest] = useState(null)
  const [requestStatus, setRequestStatus] = useState('idle') // idle, sent, accepted, rejected
  const [showUserToast, setShowUserToast] = useState(false)
  const [showAgencyToast, setShowAgencyToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const demoData = {
    user: {
      name: 'Pranathi R',
      avatar: '👩‍💼',
      email: 'pranathi@example.com'
    },
    agency: {
      name: 'Seaside Travels',
      avatar: '🏢',
      rating: 4.8,
      reviews: 145
    },
    trip: {
      destination: 'Visakhapatnam',
      places: ['RK Beach', 'Kailasagiri', 'Rushikonda'],
      date: '10 Nov 2025',
      travelers: 2,
      vehicle: '6-Seater SUV',
      estimatedCost: '₹18,500'
    }
  }

  const showToast = (message, isUser = true) => {
    setToastMessage(message)
    if (isUser) {
      setShowUserToast(true)
      setTimeout(() => setShowUserToast(false), 3000)
    } else {
      setShowAgencyToast(true)
      setTimeout(() => setShowAgencyToast(false), 3000)
    }
  }

  const handleSendRequest = () => {
    setTripRequest(demoData.trip)
    setRequestStatus('sent')
    showToast('Request sent to Seaside Travels!', true)
    
    // Simulate agency notification
    setTimeout(() => {
      showToast('New trip request received!', false)
    }, 500)
  }

  const handleAcceptRequest = () => {
    setRequestStatus('accepted')
    showToast('Trip request accepted!', false)
    
    // Notify user
    setTimeout(() => {
      showToast('Your trip request has been accepted by Seaside Travels!', true)
    }, 500)
  }

  const handleRejectRequest = () => {
    setRequestStatus('rejected')
    showToast('Trip request declined', false)
    
    setTimeout(() => {
      showToast('Your trip request was declined. Try another agency.', true)
    }, 500)
  }

  const resetDemo = () => {
    setTripRequest(null)
    setRequestStatus('idle')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary-500" />
            <h1 className="text-4xl font-bold gradient-text">Live Simulation Demo</h1>
            <Sparkles className="w-6 h-6 text-primary-500" />
          </div>
          <p className="text-gray-600 mb-4">
            Watch real-time interaction between User and Travel Agency
          </p>
          {requestStatus !== 'idle' && (
            <button
              onClick={resetDemo}
              className="text-sm text-primary-600 hover:text-primary-700 underline"
            >
              Reset Demo
            </button>
          )}
        </motion.div>
      </div>

      {/* Split Screen Layout */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
        
        {/* LEFT PANEL - USER VIEW */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* User Toast */}
          <AnimatePresence>
            {showUserToast && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="absolute top-0 left-0 right-0 z-50 mx-4"
              >
                <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{toastMessage}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{demoData.user.avatar}</span>
                <div>
                  <h2 className="text-2xl font-bold">User Dashboard</h2>
                  <p className="text-blue-100 text-sm">{demoData.user.name}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Plan Your Trip</h3>
              
              {/* Trip Details Card */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-200">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Trip Details</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Destination:</span>
                    <span className="font-semibold text-gray-900">{demoData.trip.destination}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600 block mb-2">Selected Places:</span>
                    <div className="flex flex-wrap gap-2">
                      {demoData.trip.places.map((place, idx) => (
                        <span key={idx} className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                          {place}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Date:
                    </span>
                    <span className="font-semibold text-gray-900">{demoData.trip.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Travelers:
                    </span>
                    <span className="font-semibold text-gray-900">{demoData.trip.travelers} people</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-semibold text-gray-900">{demoData.trip.vehicle}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-blue-200">
                    <span className="text-gray-600">Estimated Cost:</span>
                    <span className="font-bold text-primary-600 text-lg">{demoData.trip.estimatedCost}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {requestStatus === 'idle' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendRequest}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Trip Request</span>
                </motion.button>
              )}

              {/* Status Display */}
              {requestStatus === 'sent' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 flex items-center space-x-3"
                >
                  <Clock className="w-6 h-6 text-yellow-600 animate-pulse" />
                  <div>
                    <p className="font-semibold text-yellow-900">Request Sent!</p>
                    <p className="text-sm text-yellow-700">Waiting for agency acceptance...</p>
                  </div>
                </motion.div>
              )}

              {requestStatus === 'accepted' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-50 border-2 border-green-300 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-green-900">Request Accepted! 🎉</p>
                      <p className="text-sm text-green-700">Your trip has been confirmed by {demoData.agency.name}</p>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {requestStatus === 'rejected' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-center space-x-3"
                >
                  <XCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-900">Request Declined</p>
                    <p className="text-sm text-red-700">Try another travel agency</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* RIGHT PANEL - AGENCY VIEW */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          {/* Agency Toast */}
          <AnimatePresence>
            {showAgencyToast && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="absolute top-0 left-0 right-0 z-50 mx-4"
              >
                <div className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">{toastMessage}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{demoData.agency.avatar}</span>
                  <div>
                    <h2 className="text-2xl font-bold">Agency Dashboard</h2>
                    <p className="text-purple-100 text-sm">{demoData.agency.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span className="font-semibold">{demoData.agency.rating}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Trip Requests</h3>
                {tripRequest && requestStatus === 'sent' && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    1
                  </motion.span>
                )}
              </div>

              {/* Empty State */}
              {!tripRequest && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-500 text-lg">No pending requests</p>
                  <p className="text-gray-400 text-sm mt-2">Waiting for trip requests from users...</p>
                </div>
              )}

              {/* Request Card */}
              <AnimatePresence>
                {tripRequest && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: -20 }}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200 shadow-lg"
                  >
                    {/* Request Header */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-purple-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{demoData.user.avatar}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{demoData.user.name}</p>
                          <p className="text-sm text-gray-600">{demoData.user.email}</p>
                        </div>
                      </div>
                      {requestStatus === 'sent' && (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          Pending
                        </span>
                      )}
                      {requestStatus === 'accepted' && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Accepted</span>
                        </span>
                      )}
                      {requestStatus === 'rejected' && (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <XCircle className="w-4 h-4" />
                          <span>Declined</span>
                        </span>
                      )}
                    </div>

                    {/* Request Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Destination:</span>
                        <span className="text-gray-900 font-semibold">{tripRequest.destination}</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-600 font-medium block mb-2">Places:</span>
                        <div className="flex flex-wrap gap-2">
                          {tripRequest.places.map((place, idx) => (
                            <span key={idx} className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200">
                              {place}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Date:</span>
                        <span className="text-gray-900">{tripRequest.date}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Travelers:</span>
                        <span className="text-gray-900">{tripRequest.travelers} people</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Vehicle:</span>
                        <span className="text-gray-900">{tripRequest.vehicle}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-purple-200">
                        <span className="text-gray-600 font-medium">Estimated Revenue:</span>
                        <span className="text-purple-600 font-bold text-lg">{tripRequest.estimatedCost}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {requestStatus === 'sent' && (
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleAcceptRequest}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Accept</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleRejectRequest}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <XCircle className="w-5 h-5" />
                          <span>Decline</span>
                        </motion.button>
                      </div>
                    )}

                    {requestStatus === 'accepted' && (
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                        <p className="text-green-800 font-medium">✅ Trip confirmed! Prepare for the journey.</p>
                      </div>
                    )}

                    {requestStatus === 'rejected' && (
                      <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-center">
                        <p className="text-red-800 font-medium">Request declined</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Instructions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-7xl mx-auto mt-8 text-center"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">📌 Demo Instructions</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>1. Click <strong>"Send Trip Request"</strong> on the User side</p>
            <p>2. Watch the request appear instantly on the Agency side</p>
            <p>3. Click <strong>"Accept"</strong> or <strong>"Decline"</strong> on the Agency side</p>
            <p>4. See the status update in real-time on both sides</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LiveSimulationPage
