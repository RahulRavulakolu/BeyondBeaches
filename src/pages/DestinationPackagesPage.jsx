import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { MapPin, Users, Car, Clock, Star, Package, ChevronRight, Check, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getDestinationById } from '../data/destinationsData'

const DestinationPackagesPage = () => {
  const navigate = useNavigate()
  const { destinationId } = useParams()
  const { currentUser, agencies, createBookingRequest } = useApp()
  const [selectedPlaces, setSelectedPlaces] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [travelDates, setTravelDates] = useState({ start: '', end: '' })
  const [travelers, setTravelers] = useState(2)

  console.log('DestinationPackagesPage - destinationId:', destinationId)
  const destination = getDestinationById(destinationId)
  console.log('DestinationPackagesPage - destination:', destination)
  console.log('DestinationPackagesPage - agencies:', agencies)
  
  // Get agencies with packages for this destination
  const destinationAgencies = (agencies || []).filter(agency => 
    agency.location === destination?.name
  )

  // If no agencies found, create a demo agency for this destination
  const effectiveAgencies = destinationAgencies.length > 0 ? destinationAgencies : [
    {
      id: 999,
      name: `${destination?.name} Travel Agency`,
      location: destination?.name,
      rating: 4.5,
      reviews: 120,
      vehicles: [
        { id: 1, type: 'Sedan', capacity: 4, ratePerKm: 12 },
        { id: 2, type: 'SUV', capacity: 6, ratePerKm: 18 },
        { id: 3, type: 'Tempo Traveller', capacity: 12, ratePerKm: 25 }
      ]
    }
  ]

  // Mock packages for demo - in real app, these would come from agencies
  const availablePackages = effectiveAgencies.flatMap(agency => {
    // Create sample packages for each agency
    return [
      {
        id: `${agency.id}-complete`,
        agencyId: agency.id,
        agencyName: agency.name,
        agencyRating: agency.rating,
        agencyReviews: agency.reviews,
        name: `${destination?.name} Complete Tour`,
        destination: destinationId,
        destinationName: destination?.name,
        selectedPlaces: destination?.places.map(p => p.id) || [],
        placeNames: destination?.places.map(p => p.name) || [],
        duration: '3 Days / 2 Nights',
        basePrice: 15000,
        totalDistance: destination?.places.reduce((sum, p) => sum + p.distance, 0) * 2 || 0,
        availableVehicles: agency.vehicles || [],
        description: `Complete tour covering all major attractions in ${destination?.name}`,
        includes: ['Accommodation', 'All Meals', 'Transportation', 'Entry Tickets', 'Professional Guide']
      },
      {
        id: `${agency.id}-quick`,
        agencyId: agency.id,
        agencyName: agency.name,
        agencyRating: agency.rating,
        agencyReviews: agency.reviews,
        name: `${destination?.name} Quick Tour`,
        destination: destinationId,
        destinationName: destination?.name,
        selectedPlaces: destination?.places.slice(0, 3).map(p => p.id) || [],
        placeNames: destination?.places.slice(0, 3).map(p => p.name) || [],
        duration: '1 Day',
        basePrice: 8000,
        totalDistance: destination?.places.slice(0, 3).reduce((sum, p) => sum + p.distance, 0) * 2 || 0,
        availableVehicles: agency.vehicles || [],
        description: `Quick tour covering top 3 attractions in ${destination?.name}`,
        includes: ['Transportation', 'Entry Tickets', 'Guide']
      }
    ]
  })

  const handlePlaceToggle = (placeId) => {
    if (selectedPlaces.includes(placeId)) {
      setSelectedPlaces(selectedPlaces.filter(id => id !== placeId))
    } else {
      setSelectedPlaces([...selectedPlaces, placeId])
    }
  }

  const calculateTotalCost = () => {
    if (!selectedPackage || !selectedVehicle) return 0
    
    const vehicleCost = selectedVehicle.ratePerKm * selectedPackage.totalDistance
    const guideCost = selectedGuide ? 5000 : 0
    const platformFee = 500
    
    return selectedPackage.basePrice + vehicleCost + guideCost + platformFee
  }

  const handleSendRequest = () => {
    if (!currentUser) {
      navigate('/auth')
      return
    }

    if (!selectedPackage || !selectedVehicle) {
      alert('Please select a package and vehicle')
      return
    }

    if (!travelDates.start || !travelDates.end) {
      alert('Please select travel dates')
      return
    }

    const totalCost = calculateTotalCost()
    const vehicleCost = selectedVehicle.ratePerKm * selectedPackage.totalDistance
    const guideCost = selectedGuide ? 5000 : 0
    const platformFee = 500

    const bookingData = {
      userId: currentUser.id,
      providerId: selectedPackage.agencyId,
      providerType: 'agency',
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      destination: selectedPackage.destinationName,
      selectedPlaces: selectedPackage.placeNames,
      vehicle: {
        type: selectedVehicle.type,
        capacity: selectedVehicle.capacity,
        ratePerKm: selectedVehicle.ratePerKm
      },
      distance: selectedPackage.totalDistance,
      travelers: travelers,
      dates: travelDates,
      duration: selectedPackage.duration,
      pricing: {
        basePrice: selectedPackage.basePrice,
        vehicleCost: vehicleCost,
        guideCost: guideCost,
        platformFee: platformFee,
        totalCost: totalCost
      },
      paymentMethod: 'cash',
      status: 'pending_acceptance',
      agencyName: selectedPackage.agencyName
    }

    // Navigate to booking summary page
    navigate('/booking-summary', { state: { bookingData } })
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-4">Destination not found</p>
          <p className="text-gray-600 mb-4">Looking for: {destinationId}</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
          >
            ← Back
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{destination.image}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{destination.name}</h1>
              <p className="text-gray-600">{destination.state}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Packages List */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Packages</h2>
              <p className="text-gray-600 mb-6">
                Choose from {availablePackages.length} packages offered by {effectiveAgencies.length} travel {effectiveAgencies.length === 1 ? 'agency' : 'agencies'}
              </p>
            </div>

            {availablePackages.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">No packages available for this destination yet.</p>
                <button
                  onClick={() => navigate('/destinations')}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600"
                >
                  Browse Other Destinations
                </button>
              </div>
            ) : null}

            {availablePackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all ${
                  selectedPackage?.id === pkg.id ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-lg'
                }`}
                onClick={() => {
                  setSelectedPackage(pkg)
                  setSelectedVehicle(null)
                }}
              >
                {/* Agency Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{pkg.agencyName}</h3>
                      <div className="flex items-center space-x-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{pkg.agencyRating}</span>
                        <span className="text-gray-500">({pkg.agencyReviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  {selectedPackage?.id === pkg.id && (
                    <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      Selected
                    </div>
                  )}
                </div>

                {/* Package Details */}
                <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                {/* Places Included */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-xs font-medium text-blue-900 mb-2">
                    📍 Places Included ({pkg.placeNames.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {pkg.placeNames.map((place, idx) => (
                      <span key={idx} className="text-xs bg-white text-blue-700 px-2 py-1 rounded border border-blue-200">
                        {place}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Package Info */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.totalDistance} km</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>{pkg.includes.length} inclusions</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Starting from</p>
                      <p className="text-2xl font-bold text-primary-600">₹{pkg.basePrice.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">+ vehicle charges</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedPackage(pkg)
                        setShowBookingModal(true)
                      }}
                      className="btn-primary"
                    >
                      Select Package
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Booking Summary */}
          {selectedPackage && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>

                {/* Selected Package */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Selected Package</p>
                  <p className="font-semibold text-gray-900">{selectedPackage.name}</p>
                  <p className="text-sm text-gray-600">{selectedPackage.agencyName}</p>
                </div>

                {/* Vehicle Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Vehicle *
                  </label>
                  <div className="space-y-2">
                    {selectedPackage.availableVehicles.map((vehicle) => (
                      <label
                        key={vehicle.id}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedVehicle?.id === vehicle.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="vehicle"
                            checked={selectedVehicle?.id === vehicle.id}
                            onChange={() => setSelectedVehicle(vehicle)}
                            className="text-primary-600"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{vehicle.type}</p>
                            <p className="text-xs text-gray-500">{vehicle.model}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-primary-600">₹{vehicle.ratePerKm}/km</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Add Guide Option */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedGuide !== null}
                      onChange={(e) => setSelectedGuide(e.target.checked ? { cost: 5000 } : null)}
                      className="text-primary-600"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Add Professional Guide</p>
                      <p className="text-xs text-gray-500">Recommended for better experience</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">₹5,000</span>
                  </label>
                </div>

                {/* Cost Breakdown */}
                {selectedVehicle && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Price</span>
                      <span className="font-medium">₹{selectedPackage.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Vehicle ({selectedPackage.totalDistance} km)</span>
                      <span className="font-medium">₹{(selectedVehicle.ratePerKm * selectedPackage.totalDistance).toLocaleString()}</span>
                    </div>
                    {selectedGuide && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Guide</span>
                        <span className="font-medium">₹5,000</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Platform Fee</span>
                      <span className="font-medium">₹500</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-semibold text-gray-900">Total Cost</span>
                      <span className="font-bold text-primary-600 text-lg">₹{calculateTotalCost().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Travelers */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Travel Dates */}
                <div className="mb-6 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Travel Dates</label>
                  <input
                    type="date"
                    value={travelDates.start}
                    onChange={(e) => setTravelDates({...travelDates, start: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Start Date"
                  />
                  <input
                    type="date"
                    value={travelDates.end}
                    onChange={(e) => setTravelDates({...travelDates, end: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="End Date"
                  />
                </div>

                {/* Send Request Button */}
                <button
                  onClick={handleSendRequest}
                  disabled={!selectedVehicle || !travelDates.start || !travelDates.end}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Booking Request
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  <Info className="w-3 h-3 inline mr-1" />
                  Payment will be processed after agency accepts your request
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DestinationPackagesPage
