import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, Users, Calendar, ArrowRight, Star, Camera } from 'lucide-react'
import { useApp } from '../context/AppContext'

const DestinationSelectionPage = () => {
  const navigate = useNavigate()
  const { currentUser } = useApp()
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [peopleCount, setPeopleCount] = useState(1)
  const [travelDate, setTravelDate] = useState('')
  const [tripDuration, setTripDuration] = useState(1)

  // Available destinations/cities
  const destinations = [
    {
      id: 'goa',
      name: 'Goa',
      type: 'Coastal State',
      description: 'Beautiful beaches, Portuguese heritage, and vibrant nightlife',
      image: '🏖️',
      highlights: ['Beaches', 'Heritage Sites', 'Nightlife', 'Water Sports', 'Cuisine'],
      places: ['Baga Beach', 'Calangute Beach', 'Anjuna Beach', 'Palolem Beach', 'Old Goa', 'Fort Aguada', 'Dudhsagar Falls', 'Spice Plantations'],
      guides: [2, 3, 6, 7], // All Goa guides
      agencies: [4, 5] // All Goa agencies
    },
    {
      id: 'visakhapatnam',
      name: 'Visakhapatnam',
      type: 'Coastal City',
      description: 'Port city with beaches, hills, and naval heritage',
      image: '🌊',
      highlights: ['Beaches', 'Hills', 'Museums', 'Naval Heritage', 'Local Cuisine'],
      places: ['RK Beach', 'Kailasagiri', 'Submarine Museum', 'Araku Valley', 'Borra Caves', 'Simhachalam Temple'],
      guides: [8, 9], // Visakhapatnam guides
      agencies: [6] // Visakhapatnam agency
    },
    {
      id: 'kerala',
      name: 'Kerala',
      type: 'State',
      description: 'Gods own country with backwaters, hills, and spices',
      image: '🛶',
      highlights: ['Backwaters', 'Hill Stations', 'Spice Gardens', 'Ayurveda', 'Houseboats'],
      places: ['Alleppey', 'Munnar', 'Kochi', 'Thekkady', 'Wayanad', 'Kovalam', 'Kumarakom'],
      guides: [10, 11], // Kerala guides
      agencies: [7] // Kerala agency
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      type: 'State',
      description: 'Land of kings with palaces, deserts, and rich culture',
      image: '🏰',
      highlights: ['Palaces', 'Forts', 'Desert Safari', 'Culture', 'Handicrafts'],
      places: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar', 'Mount Abu'],
      guides: [12, 13], // Rajasthan guides
      agencies: [8] // Rajasthan agency
    },
    {
      id: 'himachal',
      name: 'Himachal Pradesh',
      type: 'Hill State',
      description: 'Mountain paradise with snow peaks and adventure sports',
      image: '🏔️',
      highlights: ['Mountains', 'Adventure Sports', 'Trekking', 'Snow Activities', 'Temples'],
      places: ['Shimla', 'Manali', 'Dharamshala', 'Kasol', 'Spiti Valley', 'Dalhousie'],
      guides: [14, 15], // Himachal guides
      agencies: [9] // Himachal agency
    },
    {
      id: 'uttarakhand',
      name: 'Uttarakhand',
      type: 'Hill State',
      description: 'Spiritual land with holy rivers, mountains, and yoga',
      image: '🕉️',
      highlights: ['Spiritual Sites', 'Mountains', 'Rivers', 'Yoga', 'Wildlife'],
      places: ['Rishikesh', 'Haridwar', 'Nainital', 'Mussoorie', 'Jim Corbett', 'Valley of Flowers'],
      guides: [16, 17], // Uttarakhand guides
      agencies: [10] // Uttarakhand agency
    }
  ]

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination)
  }

  const handleProceed = () => {
    if (selectedDestination && peopleCount) {
      const dateParam = travelDate || new Date().toISOString().split('T')[0]
      const url = `/destination/${selectedDestination.id}/places?people=${peopleCount}&date=${dateParam}&duration=${tripDuration}`
      navigate(url)
    }
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            {currentUser ? `Welcome back, ${currentUser.name}! 👋` : 'Explore Destinations 🌍'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose your next adventure destination
          </p>
        </motion.div>

        {/* Trip Details Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Plan Your Trip</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* People Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Number of People
              </label>
              <select
                value={peopleCount}
                onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Start Date
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Trip Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Trip Duration
              </label>
              <select
                value={tripDuration}
                onChange={(e) => setTripDuration(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {[1,2,3,4,5,6,7].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Day' : 'Days'}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleDestinationSelect(destination)}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 relative ${
                selectedDestination?.id === destination.id ? 'ring-4 ring-primary-500 shadow-2xl' : ''
              }`}
            >
              {/* Destination Image */}
              <div className="h-40 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-5xl">
                {destination.image}
              </div>

              {/* Destination Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{destination.name}</h3>
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    {destination.type}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{destination.description}</p>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.highlights.slice(0, 3).map((highlight, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 3 && (
                    <span className="text-xs text-primary-600">
                      +{destination.highlights.length - 3} more
                    </span>
                  )}
                </div>

                {/* Places Count */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{destination.places.length} Places to visit</span>
                  <span>{destination.guides.length} Guides</span>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedDestination?.id === destination.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
                >
                  <Star className="w-4 h-4 text-white fill-current" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Selected Destination Details */}
        {selectedDestination && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              {selectedDestination.image} {selectedDestination.name} Trip Details
            </h3>
            
            {/* Destination Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Available Places to Visit:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedDestination.places.slice(0, 6).map((place, idx) => (
                    <span key={idx} className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
                      {place}
                    </span>
                  ))}
                  {selectedDestination.places.length > 6 && (
                    <span className="text-xs text-primary-600">
                      +{selectedDestination.places.length - 6} more
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Highlights & Activities:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedDestination.highlights.map((highlight, idx) => (
                    <span key={idx} className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Trip Details:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{selectedDestination.places.length} places available</p>
                  <p>{tripDuration} day{tripDuration > 1 ? 's' : ''} duration</p>
                  <p>{selectedDestination.guides.length} guides & {selectedDestination.agencies.length} agencies</p>
                  <p>Customizable itinerary</p>
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
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => selectedDestination && navigate(`/destination/${selectedDestination.id}/packages`)}
              disabled={!selectedDestination}
              className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                selectedDestination
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              View Agency Packages
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button
              onClick={handleProceed}
              disabled={!selectedDestination}
              className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                selectedDestination
                  ? 'bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Custom Trip Planning
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
          
          {!selectedDestination && (
            <p className="text-sm text-gray-500 mt-2">
              Please select a destination to continue
            </p>
          )}

          {selectedDestination && (
            <p className="text-sm text-green-600 mt-2">
              ✅ {selectedDestination.name} selected for {tripDuration} day{tripDuration > 1 ? 's' : ''}
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DestinationSelectionPage
