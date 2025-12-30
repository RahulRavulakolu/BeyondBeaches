import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { MapPin, Users, Calendar, Star, Clock, DollarSign, Send, CheckCircle, User, Building, Route } from 'lucide-react'
import { useApp } from '../context/AppContext'

const MultiPlaceProvidersPage = () => {
  const { placeIds } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getGuides, getAgencies, currentUser, createBookingRequest } = useApp()
  
  const [selectedProviders, setSelectedProviders] = useState([])
  const [requestSent, setRequestSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const peopleCount = parseInt(searchParams.get('people')) || 1
  const travelDate = searchParams.get('date')
  const tripDuration = parseInt(searchParams.get('duration')) || 1
  const selectedPlaceIds = placeIds.split(',')

  // Place data
  const placeData = {
    'baga-beach': { name: 'Baga Beach', type: 'Beach', image: '🏖️', guides: [2, 6], agencies: [4, 5] },
    'calangute-beach': { name: 'Calangute Beach', type: 'Beach', image: '🏄‍♂️', guides: [2, 6], agencies: [4, 5] },
    'anjuna-beach': { name: 'Anjuna Beach', type: 'Beach', image: '🎉', guides: [2, 7], agencies: [5] },
    'palolem-beach': { name: 'Palolem Beach', type: 'Beach', image: '🌴', guides: [3, 7], agencies: [4] },
    'old-goa': { name: 'Old Goa', type: 'Heritage', image: '⛪', guides: [3], agencies: [5] },
    'fort-aguada': { name: 'Fort Aguada', type: 'Heritage', image: '🏰', guides: [2, 3], agencies: [4, 5] },
    'dudhsagar-falls': { name: 'Dudhsagar Falls', type: 'Nature', image: '💧', guides: [6, 7], agencies: [4] },
    'spice-plantations': { name: 'Spice Plantations', type: 'Nature', image: '🌿', guides: [3], agencies: [4, 5] }
  }

  const selectedPlaces = selectedPlaceIds.map(id => placeData[id]).filter(Boolean)
  const allGuides = getGuides()
  const allAgencies = getAgencies()

  // Find providers who can handle multiple locations (intersection of all place providers)
  const getMultiLocationProviders = () => {
    if (selectedPlaces.length === 0) return { guides: [], agencies: [] }
    
    // For guides: find those who appear in ALL selected places
    const multiLocationGuides = allGuides.filter(guide => {
      return selectedPlaces.every(place => place.guides.includes(guide.id)) &&
             (guide.availability?.includes(travelDate) || !travelDate)
    })
    
    // For agencies: find those who appear in ALL selected places  
    const multiLocationAgencies = allAgencies.filter(agency => {
      return selectedPlaces.every(place => place.agencies.includes(agency.id))
    })

    // Also include providers who can handle at least 2 of the selected places
    const flexibleGuides = allGuides.filter(guide => {
      const coverageCount = selectedPlaces.filter(place => place.guides.includes(guide.id)).length
      return coverageCount >= Math.min(2, selectedPlaces.length) && 
             (guide.availability?.includes(travelDate) || !travelDate) &&
             !multiLocationGuides.find(g => g.id === guide.id)
    })

    const flexibleAgencies = allAgencies.filter(agency => {
      const coverageCount = selectedPlaces.filter(place => place.agencies.includes(agency.id)).length
      return coverageCount >= Math.min(2, selectedPlaces.length) &&
             !multiLocationAgencies.find(a => a.id === agency.id)
    })

    return {
      multiLocationGuides,
      multiLocationAgencies,
      flexibleGuides,
      flexibleAgencies
    }
  }

  const { multiLocationGuides, multiLocationAgencies, flexibleGuides, flexibleAgencies } = getMultiLocationProviders()

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

  const handleSendRequests = async () => {
    if (selectedProviders.length === 0) return

    setLoading(true)
    try {
      for (const provider of selectedProviders) {
        await createBookingRequest({
          providerId: provider.id,
          providerType: provider.type,
          destination: 'Goa Multi-Location',
          places: selectedPlaceIds,
          date: travelDate,
          duration: `${tripDuration} days`,
          people: peopleCount,
          status: 'pending_acceptance',
          isMultiLocation: true
        })
      }
      setRequestSent(true)
    } catch (error) {
      console.error('Failed to send requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProviderCoverage = (provider) => {
    const coveredPlaces = selectedPlaces.filter(place => 
      provider.type === 'guide' ? place.guides.includes(provider.id) : place.agencies.includes(provider.id)
    )
    return coveredPlaces
  }

  if (selectedPlaces.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Selection</h2>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Multi-Location Requests Sent!</h2>
          <p className="text-gray-600 mb-6">
            Your requests for {selectedPlaces.length} locations have been sent to {selectedProviders.length} provider{selectedProviders.length > 1 ? 's' : ''}. 
            They'll create custom itineraries for your multi-location trip.
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
          <div className="flex justify-center space-x-2 mb-4">
            {selectedPlaces.map((place, idx) => (
              <div key={place.name} className="flex items-center">
                <span className="text-3xl">{place.image}</span>
                {idx < selectedPlaces.length - 1 && <Route className="w-4 h-4 mx-2 text-gray-400" />}
              </div>
            ))}
          </div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Multi-Location Goa Trip
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {selectedPlaces.map(p => p.name).join(' → ')}
          </p>
          
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
              <Clock className="w-4 h-4 mr-1" />
              {tripDuration} {tripDuration === 1 ? 'Day' : 'Days'}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {selectedPlaces.length} Locations
            </div>
          </div>
        </motion.div>

        {/* Multi-Location Specialists */}
        {(multiLocationGuides.length > 0 || multiLocationAgencies.length > 0) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              Multi-Location Specialists (Cover All Places)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...multiLocationGuides, ...multiLocationAgencies].map((provider, index) => (
                <motion.div
                  key={`${provider.type}-${provider.id}`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleProviderSelect(provider)}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${
                    selectedProviders.find(p => p.id === provider.id && p.type === provider.type) 
                      ? 'border-yellow-400 shadow-2xl' : 'border-transparent'
                  }`}
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2">
                    <div className="text-center text-white text-xs font-bold">
                      ⭐ COVERS ALL {selectedPlaces.length} PLACES
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-2xl">
                          {provider.image}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                          <p className="text-sm text-gray-500">{provider.experience} experience</p>
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{provider.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-primary-600 font-semibold">
                        <DollarSign className="w-4 h-4 mr-1" />
                        ₹{Math.round(provider.price * tripDuration * 1.2)}/trip
                      </div>
                      <div className="text-sm text-gray-500">
                        {provider.reviews} reviews
                      </div>
                    </div>
                  </div>

                  {selectedProviders.find(p => p.id === provider.id && p.type === provider.type) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Flexible Providers */}
        {(flexibleGuides.length > 0 || flexibleAgencies.length > 0) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Route className="w-6 h-6 mr-2 text-blue-500" />
              Flexible Providers (Partial Coverage)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...flexibleGuides, ...flexibleAgencies].map((provider, index) => {
                const coveredPlaces = getProviderCoverage(provider)
                return (
                  <motion.div
                    key={`${provider.type}-${provider.id}`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleProviderSelect(provider)}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                      selectedProviders.find(p => p.id === provider.id && p.type === provider.type) 
                        ? 'ring-4 ring-primary-500 shadow-2xl' : ''
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-2xl">
                            {provider.image}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                            <p className="text-sm text-gray-500">{provider.experience} experience</p>
                          </div>
                        </div>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{provider.description}</p>

                      {/* Coverage */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Covers {coveredPlaces.length}/{selectedPlaces.length} places:</p>
                        <div className="flex flex-wrap gap-1">
                          {coveredPlaces.map((place, idx) => (
                            <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              {place.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-primary-600 font-semibold">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ₹{Math.round(provider.price * tripDuration)}/trip
                        </div>
                        <div className="text-sm text-gray-500">
                          {provider.reviews} reviews
                        </div>
                      </div>
                    </div>

                    {selectedProviders.find(p => p.id === provider.id && p.type === provider.type) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* No Providers Available */}
        {multiLocationGuides.length === 0 && multiLocationAgencies.length === 0 && 
         flexibleGuides.length === 0 && flexibleAgencies.length === 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Multi-Location Providers Available</h3>
            <p className="text-gray-600 mb-4">
              No providers can handle your selected combination of places on {new Date(travelDate).toLocaleDateString()}.
            </p>
            <button
              onClick={() => navigate('/destinations')}
              className="btn-primary"
            >
              Try Different Combination
            </button>
          </motion.div>
        )}

        {/* Send Requests Button */}
        {(multiLocationGuides.length > 0 || multiLocationAgencies.length > 0 || 
          flexibleGuides.length > 0 || flexibleAgencies.length > 0) && (
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
                <p className="text-gray-500 mb-4">Select providers to send multi-location requests</p>
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
                  Sending Multi-Location Requests...
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Multi-Location Requests ({selectedProviders.length})
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default MultiPlaceProvidersPage
