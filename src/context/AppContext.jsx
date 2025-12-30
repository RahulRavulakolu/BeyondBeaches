import React, { createContext, useContext, useState, useEffect } from 'react'
import { users, guides, agencies, destinations, bookings, reviews } from '../data/sampleData'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [selectedDestination, setSelectedDestination] = useState('')
  const [loading, setLoading] = useState(false)

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('beyondbeaches_user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      setIsAuthenticated(true)
    }
  }, [])

  // Authentication functions
  const login = (email, password) => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password)
        if (user) {
          setCurrentUser(user)
          setIsAuthenticated(true)
          localStorage.setItem('beyondbeaches_user', JSON.stringify(user))
          setLoading(false)
          resolve(user)
        } else {
          setLoading(false)
          reject(new Error('Invalid credentials'))
        }
      }, 1000) // Simulate API delay
    })
  }

  const signup = (userData) => {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: users.length + 1,
          ...userData,
          avatar: userData.type === 'traveler' ? '👤' : userData.type === 'guide' ? '🗺️' : '🏢'
        }
        users.push(newUser)
        setCurrentUser(newUser)
        setIsAuthenticated(true)
        localStorage.setItem('beyondbeaches_user', JSON.stringify(newUser))
        setLoading(false)
        resolve(newUser)
      }, 1000)
    })
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('beyondbeaches_user')
  }

  // Search functions
  const searchProviders = (location, type = 'all') => {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = []
        
        if (type === 'all' || type === 'guides') {
          const locationGuides = guides.filter(guide => 
            guide.location.toLowerCase().includes(location.toLowerCase())
          )
          results = [...results, ...locationGuides]
        }
        
        if (type === 'all' || type === 'agencies') {
          const locationAgencies = agencies.filter(agency => 
            agency.location.toLowerCase().includes(location.toLowerCase())
          )
          results = [...results, ...locationAgencies]
        }
        
        setSearchResults(results)
        setSelectedDestination(location)
        setLoading(false)
        resolve(results)
      }, 800)
    })
  }

  // Booking functions
  const createBooking = (bookingData) => {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking = {
          id: bookings.length + 1,
          userId: currentUser.id,
          ...bookingData,
          status: 'pending',
          createdAt: new Date().toISOString().split('T')[0]
        }
        bookings.push(newBooking)
        setLoading(false)
        resolve(newBooking)
      }, 1000)
    })
  }

  const createBookingRequest = async (requestData) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call here:
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...requestData,
      //     userId: currentUser?.id
      // })
      // });
      // const data = await response.json();
      
      // Simulated API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newRequest = {
        id: Date.now(), // Use timestamp for unique ID
        userId: currentUser?.id,
        ...requestData,
        status: 'pending_acceptance',
        createdAt: new Date().toISOString(),
        escrowAmount: 0,
        escrowStatus: 'not_initiated'
      };
      
      // Add to local state
      bookings.push(newRequest);
      return newRequest;
    } catch (error) {
      console.error('Booking request failed:', error);
      throw error; // Re-throw to handle in the component
    } finally {
      setLoading(false);
    }
  }

  const acceptBookingRequest = async (requestId) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call here:
      // const response = await fetch(`/api/bookings/${requestId}/accept`, {
      //   method: 'PATCH'
      // });
      // const data = await response.json();
      
      // Simulated API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const request = bookings.find(b => b.id === requestId);
      if (request) {
        request.status = 'accepted';
        request.acceptedAt = new Date().toISOString();
      }
      return request;
    } catch (error) {
      console.error('Failed to accept booking:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const initiateEscrowPayment = (requestId, amount) => {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const request = bookings.find(b => b.id === requestId)
        if (request) {
          request.escrowAmount = amount
          request.escrowStatus = 'held'
          request.status = 'payment_held'
          request.escrowInitiatedAt = new Date().toISOString().split('T')[0]
        }
        setLoading(false)
        resolve(request)
      }, 1000)
    })
  }

  const completeTrip = (requestId, rating, review) => {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const request = bookings.find(b => b.id === requestId)
        if (request) {
          request.status = 'completed'
          request.completedAt = new Date().toISOString().split('T')[0]
          request.escrowStatus = 'released'
          request.rating = rating
          request.review = review
          
          // Add to reviews
          const newReview = {
            id: reviews.length + 1,
            userId: currentUser.id,
            providerId: request.providerId,
            providerType: request.providerType,
            rating,
            comment: review,
            date: new Date().toISOString().split('T')[0]
          }
          reviews.push(newReview)
        }
        setLoading(false)
        resolve(request)
      }, 1000)
    })
  }

  const getUserBookings = () => {
    if (!currentUser) return []
    return bookings.filter(booking => booking.userId === currentUser.id)
  }

  const getProviderBookings = () => {
    if (!currentUser) return []
    return bookings.filter(booking => booking.providerId === currentUser.id)
  }

  // Get functions
  const getDestinations = () => destinations
  const getGuides = () => guides
  const getAgencies = () => agencies
  const getProviderById = (id, type) => {
    if (type === 'guide') {
      return guides.find(guide => guide.id === parseInt(id))
    } else if (type === 'agency') {
      return agencies.find(agency => agency.id === parseInt(id))
    }
    return null
  }

  const value = {
    // State
    currentUser,
    isAuthenticated,
    searchResults,
    selectedDestination,
    loading,
    
    // Data arrays
    agencies,
    guides,
    destinations,
    
    // Auth functions
    login,
    signup,
    logout,
    
    // Search functions
    searchProviders,
    
    // Booking functions
    createBooking,
    createBookingRequest,
    acceptBookingRequest,
    initiateEscrowPayment,
    completeTrip,
    getUserBookings,
    getProviderBookings,
    
    // Data functions
    getDestinations,
    getGuides,
    getAgencies,
    getProviderById,
    
    // Setters
    setSearchResults,
    setSelectedDestination
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
