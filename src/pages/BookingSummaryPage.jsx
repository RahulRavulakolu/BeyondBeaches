import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { MapPin, Users, Car, Calendar, Clock, DollarSign, Check, ArrowRight, CreditCard } from 'lucide-react'
import { useApp } from '../context/AppContext'

const BookingSummaryPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { createBookingRequest } = useApp()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bookingData = location.state?.bookingData

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-4">No booking data found</p>
          <button
            onClick={() => navigate('/destinations')}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    )
  }

  const handleConfirmBooking = async () => {
    setIsSubmitting(true)
    try {
      await createBookingRequest(bookingData)
      // Show success and navigate to dashboard
      navigate('/user-dashboard', { 
        state: { 
          message: 'Booking request sent successfully! Payment will be collected in cash.',
          bookingId: Date.now()
        } 
      })
    } catch (error) {
      alert('Failed to send booking request. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Summary</h1>
          <p className="text-gray-600">Review your booking details before confirming</p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Package Info */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{bookingData.packageName}</h2>
            <p className="text-primary-100 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {bookingData.destination}
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Travel Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                Travel Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <p className="font-semibold text-gray-900">{new Date(bookingData.dates.start).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">End Date</p>
                  <p className="font-semibold text-gray-900">{new Date(bookingData.dates.end).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">{bookingData.duration}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Travelers</p>
                  <p className="font-semibold text-gray-900 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {bookingData.travelers} {bookingData.travelers === 1 ? 'Person' : 'People'}
                  </p>
                </div>
              </div>
            </div>

            {/* Places Included */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                Places to Visit ({bookingData.selectedPlaces.length})
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {bookingData.selectedPlaces.map((place, idx) => (
                    <span key={idx} className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                      {place}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Car className="w-5 h-5 mr-2 text-primary-500" />
                Vehicle
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{bookingData.vehicle.type}</p>
                    <p className="text-sm text-gray-600">Capacity: {bookingData.vehicle.capacity} passengers</p>
                  </div>
                  <p className="text-primary-600 font-semibold">₹{bookingData.vehicle.ratePerKm}/km</p>
                </div>
              </div>
            </div>

            {/* Agency Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Travel Agency</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">{bookingData.agencyName}</p>
                <p className="text-sm text-gray-600">Total Distance: {bookingData.distance} km (round trip)</p>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary-500" />
                Pricing Breakdown
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Package Base Price</span>
                  <span className="font-semibold">₹{bookingData.pricing.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Vehicle Cost ({bookingData.distance} km × ₹{bookingData.vehicle.ratePerKm})</span>
                  <span className="font-semibold">₹{bookingData.pricing.vehicleCost.toLocaleString()}</span>
                </div>
                {bookingData.pricing.guideCost > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Guide Fee</span>
                    <span className="font-semibold">₹{bookingData.pricing.guideCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Platform Fee</span>
                  <span className="font-semibold">₹{bookingData.pricing.platformFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-primary-600">₹{bookingData.pricing.totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-primary-500" />
                Payment Method
              </h3>
              <div className="bg-green-50 border-2 border-green-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-green-900 text-lg">Cash Payment</p>
                    <p className="text-sm text-green-700">Payment will be collected in cash at the time of travel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Your booking request will be sent to the travel agency for approval</li>
                <li>• Payment of ₹{bookingData.pricing.totalCost.toLocaleString()} will be collected in cash</li>
                <li>• You will be notified once the agency accepts your request</li>
                <li>• Please carry the exact amount on the day of travel</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              ← Back to Packages
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending Request...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Confirm Booking
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BookingSummaryPage
