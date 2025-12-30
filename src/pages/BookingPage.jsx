import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Users, MapPin, Star, DollarSign, Clock, Shield, CreditCard, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const BookingPage = () => {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const { getProviderById, createBooking, loading, isAuthenticated } = useApp()
  
  const [selectedDate, setSelectedDate] = useState('')
  const [peopleCount, setPeopleCount] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [specialRequests, setSpecialRequests] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const serviceProvider = getProviderById(id, type)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
      return
    }
    if (!serviceProvider) {
      navigate('/search')
      return
    }
  }, [isAuthenticated, serviceProvider])

  if (!serviceProvider) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Provider Not Found</h2>
          <p className="text-gray-600 mb-4">The service provider you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/search')}
            className="btn-primary"
          >
            Back to Search
          </button>
        </div>
      </div>
    )
  }

  const handleBooking = async () => {
    if (!selectedDate) return

    try {
      const bookingData = {
        providerId: serviceProvider.id,
        providerType: serviceProvider.type,
        destination: serviceProvider.location,
        date: selectedDate,
        duration: serviceProvider.type === 'agency' ? '3 days' : '1 day',
        people: peopleCount,
        amount: calculateTotal().total,
        advanceAmount: Math.round(calculateTotal().total * 0.3),
        specialRequests,
        paymentMethod
      }

      await createBooking(bookingData)
      setBookingSuccess(true)
    } catch (error) {
      console.error('Booking failed:', error)
    }
  }

  const calculateTotal = () => {
    const basePrice = serviceProvider.price * peopleCount
    const serviceFee = basePrice * 0.1
    const taxes = basePrice * 0.05
    return {
      basePrice,
      serviceFee,
      taxes,
      total: basePrice + serviceFee + taxes
    }
  }

  const pricing = calculateTotal()

  // Success Modal
  if (bookingSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your booking with {serviceProvider.name} has been confirmed. You'll receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="w-full btn-primary"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/search')}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Book Another Trip
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Provider Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-3xl">
                  {serviceProvider.image}
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-gray-900">
                    {serviceProvider.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {serviceProvider.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {serviceProvider.rating} ({serviceProvider.reviews} reviews)
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {serviceProvider.experience}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{serviceProvider.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {serviceProvider.specialties.map((specialty, i) => (
                  <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Book Your Experience</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Choose a date</option>
                      {serviceProvider.availability.map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* People Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of People
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any special requirements or preferences..."
                />
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span>Credit/Debit Card</span>
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="upi"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="upi" className="flex items-center space-x-2 cursor-pointer">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <span>UPI Payment</span>
                  </label>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price ({peopleCount} {peopleCount === 1 ? 'person' : 'people'})</span>
                  <span className="font-medium">₹{pricing.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">₹{pricing.serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">₹{pricing.taxes.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{pricing.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 text-blue-800">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Advance Payment</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">
                  Pay 30% advance now (₹{Math.round(pricing.total * 0.3).toLocaleString()}). 
                  Remaining amount after trip completion.
                </p>
              </div>

              <motion.button
                onClick={handleBooking}
                whileHover={{ scale: loading || !selectedDate ? 1 : 1.02 }}
                whileTap={{ scale: loading || !selectedDate ? 1 : 0.98 }}
                disabled={!selectedDate || loading}
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  selectedDate && !loading
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : selectedDate ? (
                  'Confirm Booking'
                ) : (
                  'Select Date to Continue'
                )}
              </motion.button>

              <p className="text-gray-500 text-xs text-center mt-4">
                By booking, you agree to our terms and conditions
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BookingPage
