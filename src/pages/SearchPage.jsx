import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, MapPin, Users, Filter, Star, Clock, DollarSign } from 'lucide-react'
import { useApp } from '../context/AppContext'

const SearchPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { searchProviders, searchResults, loading, getDestinations } = useApp()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '')
  const [peopleCount, setPeopleCount] = useState(1)
  const [filterType, setFilterType] = useState('all') // all, guides, agencies

  const destinations = getDestinations()

  // Search on component mount if location is provided
  useEffect(() => {
    if (selectedLocation) {
      handleSearch()
    }
  }, [])

  const handleSearch = async () => {
    if (selectedLocation.trim()) {
      await searchProviders(selectedLocation, filterType)
    }
  }

  const handleContact = (provider) => {
    navigate(`/booking/${provider.type}/${provider.id}`)
  }

  const mockResults = [
    {
      id: 1,
      type: 'guide',
      name: 'Ravi Kumar',
      location: 'Visakhapatnam',
      rating: 4.8,
      reviews: 127,
      experience: '5 years',
      price: '₹2,000/day',
      specialties: ['Beach Tours', 'Cultural Sites', 'Food Tours'],
      image: '👨‍🦱'
    },
    {
      id: 2,
      type: 'agency',
      name: 'Coastal Adventures',
      location: 'Visakhapatnam',
      rating: 4.6,
      reviews: 89,
      experience: '8 years',
      price: '₹15,000/package',
      specialties: ['Complete Packages', 'Transportation', 'Accommodation'],
      image: '🏢'
    },
    {
      id: 3,
      type: 'guide',
      name: 'Priya Reddy',
      location: 'Visakhapatnam',
      rating: 4.9,
      reviews: 203,
      experience: '7 years',
      price: '₹2,500/day',
      specialties: ['Nature Walks', 'Photography', 'Local Culture'],
      image: '👩‍🦰'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      {/* Search Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-display font-bold gradient-text mb-4">
              Find Your Perfect Travel Experience
            </h1>
            <p className="text-xl text-gray-600">
              Connect with local guides and agencies for unforgettable journeys
            </p>
          </motion.div>

          {/* Search Form */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter destination"
                  />
                </div>
              </div>

              {/* People Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travelers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Services</option>
                    <option value="guides">Local Guides</option>
                    <option value="agencies">Travel Agencies</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <motion.button
                  onClick={handleSearch}
                  disabled={loading || !selectedLocation.trim()}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`w-full btn-primary ${loading || !selectedLocation.trim() ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-bold text-gray-900">
            Search Results ({searchResults.length})
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>Rating</option>
              <option>Price</option>
              <option>Experience</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {searchResults.length === 0 && !loading && selectedLocation && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try searching for a different location or service type.</p>
          </div>
        )}
        
        {searchResults.length === 0 && !selectedLocation && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
            <p className="text-gray-600">Enter a destination to find local guides and agencies.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-2xl">
                      {result.image}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{result.name}</h3>
                      <p className="text-gray-500 text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {result.location}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    result.type === 'guide' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {result.type === 'guide' ? 'Guide' : 'Agency'}
                  </span>
                </div>

                {/* Rating and Experience */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{result.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({result.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {result.experience}
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {result.specialties.map((specialty, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-primary-600 font-semibold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {typeof result.price === 'number' 
                      ? `₹${result.price.toLocaleString()}/day` 
                      : result.price}
                  </div>
                  <motion.button
                    onClick={() => handleContact(result)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default SearchPage
