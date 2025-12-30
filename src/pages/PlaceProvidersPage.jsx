import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { MapPin, Users, Calendar, Star, Clock, DollarSign, Send, CheckCircle, User, Building } from 'lucide-react'
import { useApp } from '../context/AppContext'

const PlaceProvidersPage = () => {
  const { placeId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getGuides, getAgencies, currentUser, createBookingRequest } = useApp()
  
  const [selectedProviders, setSelectedProviders] = useState([])
  const [requestSent, setRequestSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const peopleCount = parseInt(searchParams.get('people')) || 1
  const travelDate = searchParams.get('date')

  // Place data
  const placeData = {
    'baga-beach': {
      name: 'Baga Beach',
      type: 'Beach',
      description: 'Famous for water sports, nightlife, and beach shacks',
      image: '🏖️',
      guides: [2, 6], // Carlos, Raj
      agencies: [4, 5]
    },
    'calangute-beach': {
      name: 'Calangute Beach',
      type: 'Beach', 
      description: 'Queen of beaches, perfect for families and shopping',
      image: '🏄‍♂️',
      guides: [2, 6],
      agencies: [4, 5]
    },
    'anjuna-beach': {
      name: 'Anjuna Beach',
      type: 'Beach',
      description: 'Hippie culture, flea market, and trance parties',
      image: '🎉',
      guides: [2, 7], // Carlos, Anita
      agencies: [5]
    },
    'palolem-beach': {
      name: 'Palolem Beach',
      type: 'Beach',
      description: 'Crescent-shaped paradise beach in South Goa',
      image: '🌴',
      guides: [3, 7], // Maria, Anita
      agencies: [4]
    },
    'old-goa': {
      name: 'Old Goa',
      type: 'Heritage',
      description: 'UNESCO World Heritage site with Portuguese churches',
      image: '⛪',
      guides: [3], // Maria
      agencies: [5]
    },
    'fort-aguada': {
      name: 'Fort Aguada',
      type: 'Heritage',
      description: 'Portuguese fort with lighthouse and panoramic views',
      image: '🏰',
      guides: [2, 3], // Carlos, Maria
      agencies: [4, 5]
    },
    'dudhsagar-falls': {
      name: 'Dudhsagar Falls',
      type: 'Nature',
      description: 'Spectacular four-tiered waterfall in the Western Ghats',
      image: '💧',
      guides: [6, 7], // Raj, Anita
      agencies: [4]
    },
    'spice-plantations': {
      name: 'Spice Plantations',
      type: 'Nature',
      description: 'Aromatic spice gardens with traditional Goan lunch',
      image: '🌿',
      guides: [3], // Maria
      agencies: [4, 5]
    }
  }

  const currentPlace = placeData[placeId]
  const allGuides = getGuides()
  const allAgencies = getAgencies()

  // Filter providers for this specific place
  const availableGuides = allGuides.filter(guide => 
    currentPlace?.guides.includes(guide.id) && 
    (guide.availability?.includes(travelDate) || !travelDate)
  )
  
  const availableAgencies = allAgencies.filter(agency => 
    currentPlace?.agencies.includes(agency.id)
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

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSendRequests = async () => {
    if (selectedProviders.length === 0) {
      setError('Please select at least one provider');
      return;
    }

    if (!travelDate) {
      setError('Please select a travel date');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Send requests to all selected providers
      const requests = selectedProviders.map(provider => 
        createBookingRequest({
          providerId: provider.id,
          providerType: provider.type,
          destination: currentPlace.name,
          place: placeId,
          date: travelDate,
          people: peopleCount,
          status: 'pending_acceptance'
        })
      );

      // Wait for all requests to complete
      await Promise.all(requests);
      
      setSuccess(true);
      setRequestSent(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to send requests:', error);
      setError('Failed to send booking requests. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!currentPlace) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Place Not Found</h2>
          <button 
            onClick={() => navigate('/destinations')}
            className="btn-primary"
          >
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Requests Sent!</h2>
          <p className="text-gray-600 mb-6">
            Your requests have been sent to {selectedProviders.length} provider{selectedProviders.length > 1 ? 's' : ''}. 
            You'll be notified when they respond.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/user-dashboard')}
              className="w-full btn-primary"
            >
              View My Requests
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
          <div className="text-6xl mb-4">{currentPlace.image}</div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            {currentPlace.name}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{currentPlace.description}</p>
          
          {/* Trip Details */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(travelDate).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {peopleCount} {peopleCount === 1 ? 'Person' : 'People'}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {currentPlace.type}
            </div>
          </div>
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
              Available Guides ({availableGuides.length})
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
                  {/* Guide Header */}
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
                        ₹{guide.price}/day
                      </div>
                      <div className="text-sm text-gray-500">
                        {guide.reviews} reviews
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
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
              Available Agencies ({availableAgencies.length})
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

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {agency.specialties.slice(0, 3).map((specialty, idx) => (
                        <span key={idx} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500">
                      {agency.reviews} reviews • {agency.vehicles.length} vehicles
                    </div>
                  </div>

                  {/* Selection Indicator */}
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

        {/* No Providers Available */}
        {availableGuides.length === 0 && availableAgencies.length === 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Providers Available</h3>
            <p className="text-gray-600 mb-4">
              No guides or agencies are available for {currentPlace.name} on {new Date(travelDate).toLocaleDateString()}.
            </p>
            <button
              onClick={() => navigate('/destinations')}
              className="btn-primary"
            >
              Try Different Date or Place
            </button>
          </motion.div>
        )}

        {/* Send Requests Button */}
        {(availableGuides.length > 0 || availableAgencies.length > 0) && (
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
                  Send Requests ({selectedProviders.length})
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default PlaceProvidersPage
