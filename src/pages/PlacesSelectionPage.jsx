import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { MapPin, Users, Calendar, ArrowRight, Star, Camera, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'

const PlacesSelectionPage = () => {
  const { destinationId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { currentUser } = useApp()
  
  const [selectedPlaces, setSelectedPlaces] = useState([])
  
  const peopleCount = parseInt(searchParams.get('people')) || 1
  const travelDate = searchParams.get('date')
  const tripDuration = parseInt(searchParams.get('duration')) || 1

  // Destination data with places
  const destinationData = {
    goa: {
      name: 'Goa',
      image: '🏖️',
      places: [
        {
          id: 'baga-beach',
          name: 'Baga Beach',
          type: 'Beach',
          description: 'Famous for water sports, nightlife, and beach shacks',
          image: '🏖️',
          activities: ['Water Sports', 'Nightlife', 'Beach Parties', 'Restaurants'],
          duration: '4-6 hours',
          bestTime: 'Evening'
        },
        {
          id: 'calangute-beach',
          name: 'Calangute Beach',
          type: 'Beach',
          description: 'Queen of beaches, perfect for families and shopping',
          image: '🏄‍♂️',
          activities: ['Swimming', 'Shopping', 'Food Stalls', 'Parasailing'],
          duration: '3-5 hours',
          bestTime: 'Morning'
        },
        {
          id: 'anjuna-beach',
          name: 'Anjuna Beach',
          type: 'Beach',
          description: 'Hippie culture, flea market, and trance parties',
          image: '🎉',
          activities: ['Flea Market', 'Trance Parties', 'Cliff Views', 'Photography'],
          duration: '5-7 hours',
          bestTime: 'Afternoon'
        },
        {
          id: 'palolem-beach',
          name: 'Palolem Beach',
          type: 'Beach',
          description: 'Crescent-shaped paradise beach in South Goa',
          image: '🌴',
          activities: ['Kayaking', 'Dolphin Spotting', 'Beach Huts', 'Yoga'],
          duration: '6-8 hours',
          bestTime: 'Full Day'
        },
        {
          id: 'old-goa',
          name: 'Old Goa',
          type: 'Heritage',
          description: 'UNESCO World Heritage site with Portuguese churches',
          image: '⛪',
          activities: ['Church Tours', 'Heritage Walk', 'Museums', 'Photography'],
          duration: '4-6 hours',
          bestTime: 'Morning'
        },
        {
          id: 'fort-aguada',
          name: 'Fort Aguada',
          type: 'Heritage',
          description: 'Portuguese fort with lighthouse and panoramic views',
          image: '🏰',
          activities: ['Historical Tour', 'Lighthouse Visit', 'Sunset Views', 'Photography'],
          duration: '2-3 hours',
          bestTime: 'Evening'
        },
        {
          id: 'dudhsagar-falls',
          name: 'Dudhsagar Falls',
          type: 'Nature',
          description: 'Spectacular four-tiered waterfall in the Western Ghats',
          image: '💧',
          activities: ['Trekking', 'Photography', 'Swimming', 'Nature Walk'],
          duration: '8-10 hours',
          bestTime: 'Full Day'
        },
        {
          id: 'spice-plantations',
          name: 'Spice Plantations',
          type: 'Nature',
          description: 'Aromatic spice gardens with traditional Goan lunch',
          image: '🌿',
          activities: ['Spice Tour', 'Traditional Lunch', 'Elephant Ride', 'Nature Walk'],
          duration: '4-5 hours',
          bestTime: 'Morning'
        }
      ]
    },
    visakhapatnam: {
      name: 'Visakhapatnam',
      image: '🌊',
      places: [
        {
          id: 'rk-beach',
          name: 'RK Beach',
          type: 'Beach',
          description: 'Popular beach with submarine museum and food stalls',
          image: '🏖️',
          activities: ['Beach Walk', 'Submarine Museum', 'Food Stalls', 'Photography'],
          duration: '3-4 hours',
          bestTime: 'Evening'
        },
        {
          id: 'kailasagiri',
          name: 'Kailasagiri',
          type: 'Hill Station',
          description: 'Hilltop park with panoramic city and sea views',
          image: '🏔️',
          activities: ['Cable Car', 'City Views', 'Gardens', 'Photography'],
          duration: '2-3 hours',
          bestTime: 'Evening'
        },
        {
          id: 'araku-valley',
          name: 'Araku Valley',
          type: 'Nature',
          description: 'Hill station with coffee plantations and tribal culture',
          image: '☕',
          activities: ['Coffee Tour', 'Tribal Museum', 'Nature Walk', 'Train Journey'],
          duration: '8-10 hours',
          bestTime: 'Full Day'
        },
        {
          id: 'borra-caves',
          name: 'Borra Caves',
          type: 'Nature',
          description: 'Million-year-old limestone caves with stalactites',
          image: '🕳️',
          activities: ['Cave Exploration', 'Photography', 'Geology Tour'],
          duration: '2-3 hours',
          bestTime: 'Morning'
        },
        {
          id: 'simhachalam-temple',
          name: 'Simhachalam Temple',
          type: 'Religious',
          description: 'Ancient temple dedicated to Lord Narasimha',
          image: '🛕',
          activities: ['Temple Visit', 'Religious Tour', 'Architecture', 'Prayers'],
          duration: '2-3 hours',
          bestTime: 'Morning'
        },
        {
          id: 'submarine-museum',
          name: 'Submarine Museum',
          type: 'Museum',
          description: 'Decommissioned submarine converted into museum',
          image: '🚢',
          activities: ['Naval History', 'Submarine Tour', 'Educational', 'Photography'],
          duration: '1-2 hours',
          bestTime: 'Afternoon'
        }
      ]
    }
  }

  const currentDestination = destinationData[destinationId]

  const handlePlaceSelect = (place) => {
    setSelectedPlaces(prev => {
      const isSelected = prev.find(p => p.id === place.id)
      if (isSelected) {
        return prev.filter(p => p.id !== place.id)
      } else {
        return [...prev, place]
      }
    })
  }

  const handleProceed = () => {
    if (selectedPlaces.length > 0) {
      // Navigate to providers page for the destination
      const placeIds = selectedPlaces.map(p => p.id).join(',')
      navigate(`/destination/${destinationId}/providers?places=${placeIds}&people=${peopleCount}&date=${travelDate}&duration=${tripDuration}`)
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
            Places to Visit in {currentDestination.name}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Select the places you'd like to explore during your {tripDuration}-day trip
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
          </div>
        </motion.div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentDestination.places.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handlePlaceSelect(place)}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 relative ${
                selectedPlaces.find(p => p.id === place.id) ? 'ring-4 ring-primary-500 shadow-2xl' : ''
              }`}
            >
              {/* Place Image */}
              <div className="h-32 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-4xl">
                {place.image}
              </div>

              {/* Place Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    {place.type}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{place.description}</p>
                
                {/* Activities */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {place.activities.slice(0, 2).map((activity, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {activity}
                    </span>
                  ))}
                  {place.activities.length > 2 && (
                    <span className="text-xs text-primary-600">
                      +{place.activities.length - 2} more
                    </span>
                  )}
                </div>

                {/* Duration and Best Time */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{place.duration}</span>
                  <span>{place.bestTime}</span>
                </div>
              </div>

              {/* Selection Indicator */}
              <div className="absolute top-2 right-2">
                {selectedPlaces.find(p => p.id === place.id) ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
                  >
                    <Star className="w-4 h-4 text-white fill-current" />
                  </motion.div>
                ) : (
                  <div className="w-8 h-8 border-2 border-gray-300 rounded-full bg-white flex items-center justify-center">
                    <span className="text-gray-400 text-xs">+</span>
                  </div>
                )}
              </div>

              {/* Selection Number */}
              {selectedPlaces.find(p => p.id === place.id) && (
                <div className="absolute top-2 left-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {selectedPlaces.findIndex(p => p.id === place.id) + 1}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Selected Places Summary */}
        {selectedPlaces.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Your {currentDestination.name} Itinerary ({selectedPlaces.length} Places)
            </h3>
            
            {/* Selected Places List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {selectedPlaces.map((place, idx) => (
                <div key={place.id} className="border border-primary-200 rounded-lg p-3 bg-primary-50">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{place.name}</h4>
                      <p className="text-xs text-gray-500">{place.type} • {place.duration}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlaceSelect(place)
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Trip Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">All Activities:</h4>
                <div className="flex flex-wrap gap-1">
                  {[...new Set(selectedPlaces.flatMap(place => place.activities))].slice(0, 8).map((activity, idx) => (
                    <span key={idx} className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
                      {activity}
                    </span>
                  ))}
                  {[...new Set(selectedPlaces.flatMap(place => place.activities))].length > 8 && (
                    <span className="text-xs text-primary-600">
                      +{[...new Set(selectedPlaces.flatMap(place => place.activities))].length - 8} more
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Trip Types:</h4>
                <div className="flex flex-wrap gap-1">
                  {[...new Set(selectedPlaces.map(place => place.type))].map((type, idx) => (
                    <span key={idx} className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Trip Overview:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{selectedPlaces.length} places selected</p>
                  <p>{tripDuration} day{tripDuration > 1 ? 's' : ''} duration</p>
                  <p>Customized itinerary</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Proceed Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={handleProceed}
            disabled={selectedPlaces.length === 0}
            className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
              selectedPlaces.length > 0
                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Find Guides & Agencies
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          
          {selectedPlaces.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Please select at least one place to continue
            </p>
          )}

          {selectedPlaces.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              ✅ {selectedPlaces.length} place{selectedPlaces.length > 1 ? 's' : ''} selected for your {currentDestination.name} trip
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PlacesSelectionPage
