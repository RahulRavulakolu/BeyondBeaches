// This is the new content for Agency Dashboard tabs
// Copy and paste this into AgencyDashboard.jsx replacing the old tab content

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
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(request.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {request.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {request.placeNames?.length || 1} places
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 mb-3">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Cost Breakdown:</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agency Cost:</span>
                    <span className="font-medium">₹{request.costBreakdown?.agencyCost?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee:</span>
                    <span className="font-medium">₹{request.costBreakdown?.platformFee?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-primary-600 border-t pt-1">
                    <span>Your Earnings:</span>
                    <span>₹{request.costBreakdown?.agencyCost?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedRequest(request)
                    setQuotationAmount(request.costBreakdown?.agencyCost || '')
                  }}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Accept & Quote
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

{/* Active Trips Tab */}
{activeTab === 'active' && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    {activeTrips.length > 0 ? (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-blue-500" />
            Active Trips ({activeTrips.length})
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {activeTrips.map((trip) => {
            const progress = tripProgress[trip.id] || { started: false, currentCheckpoint: 0 }
            const places = trip.placeNames || []
            
            return (
              <div key={trip.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{trip.destination}</h4>
                    <p className="text-sm text-gray-600">
                      {trip.people} people • {new Date(trip.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">In Progress</span>
                  </div>
                </div>

                {/* Trip Progress */}
                {places.length > 0 && (
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-3">Trip Progress:</h5>
                    <div className="space-y-2">
                      {places.map((place, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            progress.currentCheckpoint > idx 
                              ? 'bg-green-500 text-white' 
                              : progress.currentCheckpoint === idx
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {progress.currentCheckpoint > idx ? '✓' : idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{place}</p>
                            {progress.currentCheckpoint === idx && (
                              <p className="text-xs text-blue-600">Current location</p>
                            )}
                          </div>
                          {progress.currentCheckpoint === idx && (
                            <button
                              onClick={() => handleCheckpoint(trip.id, idx)}
                              className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
                            >
                              Next →
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  {!progress.started ? (
                    <button
                      onClick={() => handleStartTrip(trip.id)}
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      <Play className="w-4 h-4 inline mr-1" />
                      Start Trip
                    </button>
                  ) : progress.currentCheckpoint >= places.length ? (
                    <button
                      onClick={() => handleCompleteTrip(trip)}
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Mark Complete
                    </button>
                  ) : (
                    <div className="flex-1 text-center text-sm text-gray-600 py-2">
                      Trip in progress... ({progress.currentCheckpoint}/{places.length} completed)
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    ) : (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Trips</h3>
        <p className="text-gray-600">
          Accepted trips with confirmed payments will appear here.
        </p>
      </div>
    )}
  </motion.div>
)}

{/* Completed Trips Tab */}
{activeTab === 'completed' && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    {completedTrips.length > 0 ? (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Completed Trips ({completedTrips.length})
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {completedTrips.map((trip) => (
            <div key={trip.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{trip.destination}</h4>
                  <p className="text-sm text-gray-600">
                    Completed on {new Date(trip.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: trip.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Received:</span>
                  <span className="text-lg font-semibold text-green-600">
                    ₹{trip.escrowAmount?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>

              {trip.review && (
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-700 italic">"{trip.review}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Completed Trips</h3>
        <p className="text-gray-600">
          Your completed trips and earnings will appear here.
        </p>
      </div>
    )}
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
                  <p className="text-gray-500 text-xs">{vehicle.model}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm">{vehicle.rate}</p>
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
        <button className="w-full border border-primary-500 text-primary-600 py-2 rounded-lg hover:bg-primary-50">
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
      <button className="btn-primary">
        <Plus className="w-4 h-4 mr-1" />
        Create Package
      </button>
    </div>
    <div className="space-y-4">
      {packages.map((pkg) => (
        <div key={pkg.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{pkg.duration}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary-600">{pkg.price}</p>
              <p className="text-sm text-gray-500">{pkg.bookings} bookings</p>
            </div>
          </div>
          <div className="flex space-x-2 mt-3">
            <button className="text-sm text-primary-600 hover:text-primary-700">
              <Edit className="w-4 h-4 inline mr-1" />
              Edit
            </button>
          </div>
        </div>
      ))}
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
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Provide Quotation</h3>
      <p className="text-gray-600 mb-4">
        Review the trip details and confirm your quotation for this booking.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-2">{selectedRequest.destination}</h4>
        <div className="space-y-1 text-sm text-gray-600">
          <p>• {selectedRequest.people} people</p>
          <p>• {selectedRequest.duration}</p>
          <p>• {selectedRequest.placeNames?.length || 1} destinations</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Quotation Amount (₹)
        </label>
        <input
          type="number"
          value={quotationAmount}
          onChange={(e) => setQuotationAmount(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Enter amount"
        />
        <p className="text-xs text-gray-500 mt-1">
          Advance: ₹2,000 • Balance after trip completion
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => handleAcceptRequest(selectedRequest)}
          disabled={loading || !quotationAmount}
          className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Accept Request'}
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
