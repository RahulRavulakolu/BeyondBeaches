import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Building, Car, Package, DollarSign, Users, MapPin, Plus, Edit, Bell, CheckCircle, XCircle, Clock, AlertCircle, Play, MapPinned, Navigation, Star, Shield, Send, ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getAllDestinations, getDestinationById, calculateTotalDistance, getPlaceNames } from '../data/destinationsData'

const AgencyDashboard = () => {
  const navigate = useNavigate()
  const { currentUser, getProviderBookings, acceptBookingRequest, initiateEscrowPayment, completeTrip, loading } = useApp()
  const [activeTab, setActiveTab] = useState('requests')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [quotationAmount, setQuotationAmount] = useState('')
  const [tripProgress, setTripProgress] = useState({})
  const [showPackageModal, setShowPackageModal] = useState(false)
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  const [newPackage, setNewPackage] = useState({ 
    name: '', 
    destination: '', 
    selectedPlaces: [], 
    duration: '', 
    basePrice: '', 
    description: '',
    availableVehicles: [] // Array of vehicle IDs that can be used for this package
  })
  const [newVehicle, setNewVehicle] = useState({ type: '', model: '', ratePerKm: '', capacity: '' })
  
  const allDestinations = getAllDestinations()

  // Get agency bookings
  const agencyBookings = getProviderBookings()
  console.log('All Agency Bookings:', agencyBookings)
  
  // Categorize bookings
  const pendingRequests = agencyBookings.filter(b => b.status === 'pending_acceptance')
  const activeTrips = agencyBookings.filter(b => b.status === 'accepted')
  const completedTrips = agencyBookings.filter(b => b.status === 'completed')

  const stats = [
    { label: 'Pending Requests', value: pendingRequests.length, icon: Bell, color: 'text-yellow-600' },
    { label: 'Active Trips', value: activeTrips.length, icon: Navigation, color: 'text-blue-600' },
    { label: 'Completed', value: completedTrips.length, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Total Revenue', value: `₹${(completedTrips.reduce((sum, t) => sum + (t.escrowAmount || 0), 0)).toLocaleString()}`, icon: DollarSign, color: 'text-purple-600' }
  ]

  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Visakhapatnam Beach & Hills Complete Tour',
      destination: 'visakhapatnam',
      destinationName: 'Visakhapatnam',
      selectedPlaces: ['rk-beach', 'kailasagiri', 'araku-valley', 'simhachalam', 'submarine-museum', 'yarada-beach'],
      placeNames: ['RK Beach', 'Kailasagiri Hill Park', 'Araku Valley', 'Simhachalam Temple', 'Submarine Museum', 'Yarada Beach'],
      duration: '3 Days / 2 Nights',
      basePrice: 15000,
      totalDistance: 312, // Calculated round trip
      availableVehicles: [1, 2], // Sedan and SUV
      bookings: 23,
      status: 'active',
      description: 'Complete tour covering beaches, hills, and cultural spots'
    },
    {
      id: 2,
      name: 'Goa Beach Hopping Package',
      destination: 'goa',
      destinationName: 'Goa',
      selectedPlaces: ['baga-beach', 'calangute-beach', 'anjuna-beach', 'fort-aguada'],
      placeNames: ['Baga Beach', 'Calangute Beach', 'Anjuna Beach', 'Fort Aguada'],
      duration: '2 Days / 1 Night',
      basePrice: 12000,
      totalDistance: 112, // Calculated round trip
      availableVehicles: [1, 2, 3], // Sedan, SUV, Bike
      bookings: 18,
      status: 'active',
      description: 'Popular beaches and heritage fort tour'
    }
  ])

  const [vehicles, setVehicles] = useState([
    { id: 1, type: '4-Seater Sedan', model: 'Honda City', ratePerKm: 12, capacity: 4, status: 'available' },
    { id: 2, type: '6-Seater SUV', model: 'Toyota Innova', ratePerKm: 18, capacity: 6, status: 'booked' },
    { id: 3, type: '2-Seater Bike', model: 'Royal Enfield', ratePerKm: 8, capacity: 2, status: 'available' }
  ])

  const tabs = [
    { id: 'requests', label: 'Trip Requests', icon: Bell, count: pendingRequests.length },
    { id: 'active', label: 'Active Trips', icon: Navigation, count: activeTrips.length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: completedTrips.length },
    { id: 'profile', label: 'Profile & Fleet', icon: Building },
    { id: 'packages', label: 'Packages', icon: Package }
  ]

  const handleAcceptRequest = async (request) => {
    if (!quotationAmount) return
    try {
      await acceptBookingRequest(request.id)
      setSelectedRequest(null)
      setQuotationAmount('')
    } catch (error) {
      console.error('Failed to accept request:', error)
    }
  }

  const handleDeclineRequest = async (requestId) => {
    // In a real app, you'd have a decline function
    console.log('Declining request:', requestId)
  }

  const handleStartTrip = (tripId) => {
    setTripProgress(prev => ({
      ...prev,
      [tripId]: { started: true, currentCheckpoint: 0, checkpoints: [] }
    }))
  }

  const handleCheckpoint = (tripId, checkpointIndex) => {
    setTripProgress(prev => ({
      ...prev,
      [tripId]: {
        ...prev[tripId],
        currentCheckpoint: checkpointIndex + 1
      }
    }))
  }

  const handleCompleteTrip = async (request) => {
    try {
      await completeTrip(request.id, 5, 'Trip completed successfully')
    } catch (error) {
      console.error('Failed to complete trip:', error)
    }
  }

  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.destination || newPackage.selectedPlaces.length === 0 || !newPackage.basePrice) return
    
    const destination = getDestinationById(newPackage.destination)
    const totalDistance = calculateTotalDistance(newPackage.destination, newPackage.selectedPlaces)
    const placeNames = getPlaceNames(newPackage.destination, newPackage.selectedPlaces)
    
    const packageToAdd = {
      id: packages.length + 1,
      name: newPackage.name,
      destination: newPackage.destination,
      destinationName: destination.name,
      selectedPlaces: newPackage.selectedPlaces,
      placeNames: placeNames,
      duration: newPackage.duration,
      basePrice: parseInt(newPackage.basePrice),
      totalDistance: totalDistance,
      availableVehicles: newPackage.availableVehicles,
      bookings: 0,
      status: 'active',
      description: newPackage.description
    }
    
    setPackages([...packages, packageToAdd])
    setNewPackage({ 
      name: '', 
      destination: '', 
      selectedPlaces: [], 
      duration: '', 
      basePrice: '', 
      description: '',
      availableVehicles: []
    })
    setShowPackageModal(false)
  }

  const handleAddVehicle = () => {
    if (!newVehicle.type || !newVehicle.model || !newVehicle.ratePerKm) return
    
    const vehicleToAdd = {
      id: vehicles.length + 1,
      type: newVehicle.type,
      model: newVehicle.model,
      ratePerKm: parseInt(newVehicle.ratePerKm),
      capacity: parseInt(newVehicle.capacity) || 4,
      status: 'available'
    }
    
    setVehicles([...vehicles, vehicleToAdd])
    setNewVehicle({ type: '', model: '', ratePerKm: '', capacity: '' })
    setShowVehicleModal(false)
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
        <div className="mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full flex items-center justify-center text-3xl">
                {currentUser?.avatar || '🏢'}
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900">
                  {currentUser?.name || 'Agency'} Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage trip requests, fleet, and bookings
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {pendingRequests.length > 0 && (
                <div className="relative">
                  <Bell className="w-6 h-6 text-yellow-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingRequests.length}
                  </span>
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('profile')}
                className="btn-primary"
              >
                <Edit className="w-5 h-5 mr-2" />
                Edit Profile
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {tab.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Stats Grid - Always visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Trip Requests Tab */}
        {activeTab === 'requests' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {pendingRequests.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-yellow-500" />
                    New Trip Requests ({pendingRequests.length})
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Review and accept trip requests from travelers
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{request.destination}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {request.placeNames?.join(' → ') || 'Full destination tour'}
                          </p>
                        </div>
                        <div className="flex items-center text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">Pending</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {request.people} people
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {new Date(request.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {request.duration}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPinned className="w-4 h-4 mr-1" />
                          {request.placeNames?.length || 1} places
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 mb-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Estimated Earnings:</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Agency Cost:</span>
                            <span className="font-medium">₹{request.costBreakdown?.agencyCost?.toLocaleString() || '12,000'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Advance (Released Now):</span>
                            <span className="font-medium text-green-600">₹2,000</span>
                          </div>
                          <div className="flex justify-between font-semibold text-primary-600 border-t pt-1">
                            <span>After Trip Completion:</span>
                            <span>₹{((request.costBreakdown?.agencyCost || 12000) - 2000).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setSelectedRequest(request)
                            setQuotationAmount(request.costBreakdown?.agencyCost || '12000')
                          }}
                          className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Accept Request
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(request.id)}
                          className="flex-1 border border-red-300 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors"
                        >
                          <XCircle className="w-4 h-4 inline mr-1" />
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Requests</h3>
                <p className="text-gray-600">
                  New trip requests will appear here when travelers book your services.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Active Trips Tab - Placeholder for now */}
        {activeTab === 'active' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
          >
            <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Active Trips</h3>
            <p className="text-gray-600">
              Track your ongoing trips here. Feature coming soon!
            </p>
          </motion.div>
        )}

        {/* Completed Trips Tab - Placeholder */}
        {activeTab === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
          >
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Completed Trips</h3>
            <p className="text-gray-600">
              View your trip history and earnings. Feature coming soon!
            </p>
          </motion.div>
        )}

        {/* Profile & Fleet Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agency Profile */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Agency Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                    <input
                      type="text"
                      defaultValue={currentUser?.name || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Areas</label>
                    <input
                      type="text"
                      placeholder="e.g., Visakhapatnam, Araku, Vijayawada"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input
                      type="tel"
                      defaultValue={currentUser?.phone || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600">
                    Save Profile
                  </button>
                </div>
              </div>

              {/* Fleet Management */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  Fleet Management
                </h3>
                <div className="space-y-3 mb-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Car className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{vehicle.type}</p>
                          <p className="text-gray-500 text-xs">{vehicle.model} • {vehicle.capacity} seater</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">₹{vehicle.ratePerKm}/km</p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          vehicle.status === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {vehicle.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setShowVehicleModal(true)}
                  className="w-full border border-primary-500 text-primary-600 py-2 rounded-lg hover:bg-primary-50"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Add Vehicle
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Tour Packages
              </h3>
              <button 
                onClick={() => setShowPackageModal(true)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-1" />
                Create Package
              </button>
            </div>
            <div className="space-y-4">
              {packages.map((pkg) => {
                const packageVehicles = vehicles.filter(v => pkg.availableVehicles?.includes(v.id))
                
                return (
                  <div key={pkg.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            {pkg.destinationName}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{pkg.duration}</p>
                        {pkg.description && (
                          <p className="text-xs text-gray-500 mt-1">{pkg.description}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="font-semibold text-primary-600">₹{pkg.basePrice.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{pkg.bookings} bookings</p>
                      </div>
                    </div>
                    
                    {/* Places Included */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <p className="text-xs font-medium text-blue-900 mb-2">
                        📍 Places Included ({pkg.placeNames?.length || 0})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.placeNames?.map((place, idx) => (
                          <span key={idx} className="text-xs bg-white text-blue-700 px-2 py-1 rounded border border-blue-200">
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Details */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>
                          <span className="text-gray-600">Base Price:</span>
                          <span className="font-medium text-gray-900 ml-2">₹{pkg.basePrice.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Total Distance:</span>
                          <span className="font-medium text-gray-900 ml-2">{pkg.totalDistance} km</span>
                        </div>
                      </div>
                      
                      {/* Vehicle Options */}
                      {packageVehicles.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs font-medium text-gray-700 mb-2">Available Vehicles:</p>
                          <div className="space-y-1">
                            {packageVehicles.map(vehicle => {
                              const vehicleCost = vehicle.ratePerKm * pkg.totalDistance
                              const totalCost = pkg.basePrice + vehicleCost
                              return (
                                <div key={vehicle.id} className="flex justify-between items-center text-xs bg-white rounded px-2 py-1">
                                  <span className="text-gray-700">{vehicle.type} (₹{vehicle.ratePerKm}/km)</span>
                                  <span className="font-semibold text-primary-600">₹{totalCost.toLocaleString()}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        <Edit className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Quotation Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Accept Trip Request</h3>
              <p className="text-gray-600 mb-4">
                Confirm your acceptance for this booking. ₹2,000 advance will be released immediately.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">{selectedRequest.destination}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• {selectedRequest.people} people</p>
                  <p>• {selectedRequest.duration}</p>
                  <p>• {selectedRequest.placeNames?.length || 1} destinations</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">Advance Payment:</span>
                  <span className="font-semibold text-green-600">₹2,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">After Completion:</span>
                  <span className="font-semibold text-gray-900">₹{((parseInt(quotationAmount) || 12000) - 2000).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleAcceptRequest(selectedRequest)}
                  disabled={loading}
                  className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Confirm & Accept'}
                </button>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add Package Modal */}
        {showPackageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Destination Package</h3>
              
              <div className="space-y-4">
                {/* Destination Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Destination *</label>
                  <select
                    value={newPackage.destination}
                    onChange={(e) => setNewPackage({...newPackage, destination: e.target.value, selectedPlaces: []})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Choose a destination</option>
                    {allDestinations.map(dest => (
                      <option key={dest.id} value={dest.id}>{dest.name}</option>
                    ))}
                  </select>
                </div>

                {/* Places Selection */}
                {newPackage.destination && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Places to Include * ({newPackage.selectedPlaces.length} selected)
                    </label>
                    <div className="border border-gray-300 rounded-lg p-3 max-h-60 overflow-y-auto">
                      {getDestinationById(newPackage.destination)?.places.map(place => (
                        <label key={place.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newPackage.selectedPlaces.includes(place.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewPackage({...newPackage, selectedPlaces: [...newPackage.selectedPlaces, place.id]})
                              } else {
                                setNewPackage({...newPackage, selectedPlaces: newPackage.selectedPlaces.filter(id => id !== place.id)})
                              }
                            }}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{place.name}</p>
                            <p className="text-xs text-gray-500">{place.type} • {place.estimatedTime} • {place.distance} km</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {newPackage.selectedPlaces.length > 0 && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ Total Distance: {calculateTotalDistance(newPackage.destination, newPackage.selectedPlaces)} km (round trip)
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package Name *</label>
                  <input
                    type="text"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                    placeholder="e.g., Goa Complete Beach Tour"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newPackage.duration}
                    onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                    placeholder="e.g., 3 Days / 2 Nights"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    value={newPackage.basePrice}
                    onChange={(e) => setNewPackage({...newPackage, basePrice: e.target.value})}
                    placeholder="e.g., 15000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Covers accommodation, food, guide fees, etc.</p>
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Vehicles ({newPackage.availableVehicles.length} selected)
                  </label>
                  <div className="border border-gray-300 rounded-lg p-3 space-y-2">
                    {vehicles.map(vehicle => (
                      <label key={vehicle.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={newPackage.availableVehicles.includes(vehicle.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewPackage({...newPackage, availableVehicles: [...newPackage.availableVehicles, vehicle.id]})
                              } else {
                                setNewPackage({...newPackage, availableVehicles: newPackage.availableVehicles.filter(id => id !== vehicle.id)})
                              }
                            }}
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{vehicle.type}</p>
                            <p className="text-xs text-gray-500">{vehicle.model} • {vehicle.capacity} seater</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-primary-600">₹{vehicle.ratePerKm}/km</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newPackage.description}
                    onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                    placeholder="Brief description of the package"
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Pricing Formula:</strong> Base Price + (Vehicle Rate/km × Total Distance)
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Users will see different prices based on their vehicle selection
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleAddPackage}
                  disabled={!newPackage.name || !newPackage.destination || newPackage.selectedPlaces.length === 0 || !newPackage.basePrice}
                  className="flex-1 bg-primary-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Package
                </button>
                <button
                  onClick={() => {
                    setShowPackageModal(false)
                    setNewPackage({ 
                      name: '', 
                      destination: '', 
                      selectedPlaces: [], 
                      duration: '', 
                      basePrice: '', 
                      description: '',
                      availableVehicles: []
                    })
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add Vehicle Modal */}
        {showVehicleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Vehicle</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type *</label>
                  <input
                    type="text"
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}
                    placeholder="e.g., 4-Seater Sedan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                  <input
                    type="text"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                    placeholder="e.g., Honda City"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate Per KM (₹) *</label>
                  <input
                    type="number"
                    value={newVehicle.ratePerKm}
                    onChange={(e) => setNewVehicle({...newVehicle, ratePerKm: e.target.value})}
                    placeholder="e.g., 12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Cost per kilometer for this vehicle</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seating Capacity *</label>
                  <input
                    type="number"
                    value={newVehicle.capacity}
                    onChange={(e) => setNewVehicle({...newVehicle, capacity: e.target.value})}
                    placeholder="e.g., 4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleAddVehicle}
                  disabled={!newVehicle.type || !newVehicle.model || !newVehicle.ratePerKm}
                  className="flex-1 bg-primary-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Vehicle
                </button>
                <button
                  onClick={() => {
                    setShowVehicleModal(false)
                    setNewVehicle({ type: '', model: '', ratePerKm: '', capacity: '' })
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AgencyDashboard
