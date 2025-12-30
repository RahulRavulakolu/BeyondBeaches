import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { MapPin, Users, Calendar, Star, Clock, DollarSign, Send, CheckCircle, User, Building, Route, Shield } from 'lucide-react'
import { useApp } from '../context/AppContext'

const DestinationProvidersPage = () => {
  const { destinationId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getGuides, getAgencies, currentUser, createBookingRequest } = useApp()
  
  const [selectedProviders, setSelectedProviders] = useState([])
  const [requestSent, setRequestSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const peopleCount = parseInt(searchParams.get('people')) || 1
  const travelDate = searchParams.get('date')
  const tripDuration = parseInt(searchParams.get('duration')) || 1
  const selectedPlaceIds = searchParams.get('places')?.split(',') || []

  // Destination data
  const destinationData = {
    goa: {
      name: 'Goa',
      image: '🏖️',
      guides: [2, 3, 6, 7], // Goa guides
      agencies: [4, 5, 7] // Goa agencies
    },
    visakhapatnam: {
      name: 'Visakhapatnam',
      image: '🌊',
      guides: [8, 9, 10], // Visakhapatnam guides
      agencies: [6, 8, 9] // Visakhapatnam agencies
    },
    kerala: {
      name: 'Kerala',
      image: '🛶',
      guides: [11, 12, 13], // Kerala guides
      agencies: [10, 11, 12] // Kerala agencies
    },
    rajasthan: {
      name: 'Rajasthan',
      image: '🏰',
      guides: [14, 15, 16], // Rajasthan guides
      agencies: [13, 14, 15] // Rajasthan agencies
    },
    'himachal-pradesh': {
      name: 'Himachal Pradesh',
      image: '⛰️',
      guides: [17, 18, 19], // Himachal Pradesh guides
      agencies: [16, 17, 18] // Himachal Pradesh agencies
    },
    uttarakhand: {
      name: 'Uttarakhand',
      image: '🧘',
      guides: [20, 21, 22], // Uttarakhand guides
      agencies: [19, 20, 21] // Uttarakhand agencies
    },
    'tamil-nadu': {
      name: 'Tamil Nadu',
      image: '🕉️',
      guides: [23, 24, 25], // Tamil Nadu guides
      agencies: [22, 23, 24] // Tamil Nadu agencies
    },
    maharashtra: {
      name: 'Maharashtra',
      image: '🎬',
      guides: [26, 27, 28], // Maharashtra guides
      agencies: [25, 26, 27] // Maharashtra agencies
    }
  }

  // Place names mapping
  const placeNames = {
    'baga-beach': 'Baga Beach',
    'calangute-beach': 'Calangute Beach',
    'anjuna-beach': 'Anjuna Beach',
    'palolem-beach': 'Palolem Beach',
    'old-goa': 'Old Goa',
    'fort-aguada': 'Fort Aguada',
    'dudhsagar-falls': 'Dudhsagar Falls',
    'spice-plantations': 'Spice Plantations',
    'rk-beach': 'RK Beach',
    'kailasagiri': 'Kailasagiri',
    'araku-valley': 'Araku Valley',
    'borra-caves': 'Borra Caves',
    'simhachalam-temple': 'Simhachalam Temple',
    'submarine-museum': 'Submarine Museum'
  }

  const currentDestination = destinationData[destinationId]
  const selectedPlaceNames = selectedPlaceIds.map(id => placeNames[id]).filter(Boolean)
  
  const allGuides = getGuides()
  const allAgencies = getAgencies()

  // Filter providers for this destination
  const availableGuides = allGuides.filter(guide => 
    currentDestination?.guides.includes(guide.id) && 
    (guide.availability?.includes(travelDate) || !travelDate)
  )
  
  const availableAgencies = allAgencies.filter(agency => 
    currentDestination?.agencies.includes(agency.id)
  )

  const handleProviderSelect = (provider) => {
    setSelectedProviders(prev => {
      const isSelected = prev.find(p => p.id === provider.id && p.type === provider.type)
      if (isSelected) {
        return prev.filter(p => !(p.id === provider.id && p.type === provider.type))
      } else {
        return [...prev, provider]
      }
    })
  }

  const calculateTotalCost = () => {
    let totalCost = 0
    let agencyCost = 0
    let guideCost = 0
    
    selectedProviders.forEach(provider => {
      if (provider.type === 'guide') {
        guideCost += provider.price * tripDuration
      } else if (provider.type === 'agency') {
        // Agency cost based on distance and vehicle type (simplified calculation)
        agencyCost += provider.packages[0]?.price || 5000
      }
    })
    
    totalCost = agencyCost + guideCost
    const platformFee = Math.round(totalCost * 0.05) // 5% platform fee
    
    return {
      agencyCost,
      guideCost,
      platformFee,
      totalCost: totalCost + platformFee
    }
  }

  const handleSendRequests = async () => {
    if (selectedProviders.length === 0) return

    setLoading(true)
    try {
      const costBreakdown = calculateTotalCost()
      
      for (const provider of selectedProviders) {
        await createBookingRequest({
          providerId: provider.id,
          providerType: provider.type,
          destination: currentDestination.name,
          places: selectedPlaceIds,
          placeNames: selectedPlaceNames,
          date: travelDate,
          duration: `${tripDuration} days`,
          people: peopleCount,
          status: 'pending_acceptance',
          costBreakdown,
          isDestinationWide: true
        })
      }
      setRequestSent(true)
    } catch (error) {
      console.error('Failed to send requests:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!currentDestination) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Destination Not Found</h2>
          <button onClick={() => navigate('/destinations')} className="btn-primary">
            Back to Destinations
          </button>
        </div>
      </div>
    )
  }

  if (requestSent) {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Requests Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your {currentDestination.name} trip requests have been sent to {selectedProviders.length} provider{selectedProviders.length > 1 ? 's' : ''}. 
            They'll review your itinerary and respond soon.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="w-full btn-primary"
            >
              Track My Requests
            </button>
            <button
              onClick={() => navigate('/destinations')}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Plan Another Trip
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  const costBreakdown = calculateTotalCost()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">{currentDestination.image}</div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            {currentDestination.name} Travel Specialists
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Professional guides and agencies for your entire {currentDestination.name} trip
          </p>
          
          {/* Trip Details */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(travelDate).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {peopleCount} {peopleCount === 1 ? 'Person' : 'People'}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {tripDuration} {tripDuration === 1 ? 'Day' : 'Days'}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {selectedPlaceNames.length} Places
            </div>
          </div>

          {/* Selected Places */}
          {selectedPlaceNames.length > 0 && (
            <div className="bg-white rounded-lg p-4 max-w-4xl mx-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Your Selected Places:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedPlaceNames.map((placeName, idx) => (
                  <span key={idx} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {idx + 1}. {placeName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Available Guides */}
        {availableGuides.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-6 h-6 mr-2" />
              Professional Guides ({availableGuides.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableGuides.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleProviderSelect(guide)}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    selectedProviders.find(p => p.id === guide.id && p.type === 'guide') 
                      ? 'ring-4 ring-primary-500 shadow-2xl' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-2xl">
                          {guide.image}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{guide.name}</h3>
                          <p className="text-sm text-gray-500">{guide.experience} experience</p>
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{guide.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{guide.description}</p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {guide.specialties.slice(0, 2).map((specialty, idx) => (
                        <span key={idx} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-primary-600 font-semibold">
                        <DollarSign className="w-4 h-4 mr-1" />
                        ₹{guide.price * tripDuration}/trip
                      </div>
                      <div className="text-sm text-gray-500">
                        {guide.reviews} reviews
                      </div>
                    </div>
                  </div>

                  {selectedProviders.find(p => p.id === guide.id && p.type === 'guide') && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Available Agencies */}
        {availableAgencies.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Building className="w-6 h-6 mr-2" />
              Travel Agencies ({availableAgencies.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableAgencies.map((agency, index) => (
                <motion.div
                  key={agency.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleProviderSelect(agency)}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    selectedProviders.find(p => p.id === agency.id && p.type === 'agency') 
                      ? 'ring-4 ring-primary-500 shadow-2xl' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full flex items-center justify-center text-2xl">
                          {agency.image}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{agency.name}</h3>
                          <p className="text-sm text-gray-500">{agency.experience} experience</p>
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{agency.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{agency.description}</p>

                    {/* Packages */}
                    <div className="space-y-2 mb-4">
                      {agency.packages.slice(0, 2).map((pkg, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-sm">{pkg.name}</h4>
                              <p className="text-xs text-gray-500">{pkg.duration}</p>
                            </div>
                            <span className="text-sm font-semibold text-primary-600">
                              ₹{pkg.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500">
                      {agency.reviews} reviews • {agency.vehicles.length} vehicles
                    </div>
                  </div>

                  {selectedProviders.find(p => p.id === agency.id && p.type === 'agency') && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Cost Breakdown */}
        {selectedProviders.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Trip Cost Breakdown
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {costBreakdown.agencyCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agency Cost:</span>
                    <span className="font-semibold">₹{costBreakdown.agencyCost.toLocaleString()}</span>
                  </div>
                )}
                {costBreakdown.guideCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guide Cost:</span>
                    <span className="font-semibold">₹{costBreakdown.guideCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (5%):</span>
                  <span className="font-semibold">₹{costBreakdown.platformFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Cost:</span>
                    <span className="text-primary-600">₹{costBreakdown.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Escrow Payment Protection</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Full amount held securely in escrow</li>
                  <li>• Small advance released to providers</li>
                  <li>• Remaining payment after trip completion</li>
                  <li>• 100% refund protection</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Send Requests Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Selected Providers ({selectedProviders.length})
            </h3>
            {selectedProviders.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {selectedProviders.map((provider, idx) => (
                  <span key={idx} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {provider.name} ({provider.type})
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">Select guides or agencies to send requests</p>
            )}
          </div>

          <button
            onClick={handleSendRequests}
            disabled={selectedProviders.length === 0 || loading}
            className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
              selectedProviders.length > 0 && !loading
                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending Requests...
              </div>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Trip Requests ({selectedProviders.length})
              </>
            )}
          </button>

          {selectedProviders.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              ✅ Total cost: ₹{costBreakdown.totalCost.toLocaleString()} • Secure escrow payment
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DestinationProvidersPage
