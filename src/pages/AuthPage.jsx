import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Waves, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const AuthPage = () => {
  const navigate = useNavigate()
  const { login, signup, loading } = useApp()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState('traveler') // traveler, guide, agency
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    location: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (isLogin) {
        // Login
        const user = await login(formData.email, formData.password)
        // Navigate based on user type
        if (user.type === 'guide') {
          navigate('/guide-dashboard')
        } else if (user.type === 'agency') {
          navigate('/agency-dashboard')
        } else {
          navigate('/destinations')
        }
      } else {
        // Signup
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          return
        }
        
        const userData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          location: formData.location,
          type: userType
        }
        
        const user = await signup(userData)
        // Navigate based on user type
        if (user.type === 'guide') {
          navigate('/guide-dashboard')
        } else if (user.type === 'agency') {
          navigate('/agency-dashboard')
        } else {
          navigate('/destinations')
        }
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50"
    >
      <div className="max-w-md w-full mx-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold gradient-text mb-2">
              {isLogin ? 'Welcome Back' : 'Join BeyondBeaches'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
            </p>
          </div>

          {/* User Type Selection (for signup) */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to join as:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'traveler', label: 'Traveler', icon: '🧳' },
                  { value: 'guide', label: 'Guide', icon: '🗺️' },
                  { value: 'agency', label: 'Agency', icon: '🏢' }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setUserType(type.value)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      userType === type.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{type.icon}</div>
                    <div className="text-xs font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 text-red-700"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Demo Credentials (Goa Focus):</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Traveler:</strong> priya@example.com / password123</p>
              <p><strong>Guide (Carlos):</strong> carlos@example.com / password123</p>
              <p><strong>Guide (Maria):</strong> maria@example.com / password123</p>
              <p><strong>Agency (Goa Adventures):</strong> goa.adventures@example.com / password123</p>
              <p><strong>Agency (Sunny Goa):</strong> sunny@example.com / password123</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name (signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Phone (signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            )}

            {/* Location (signup only for guides/agencies) */}
            {!isLogin && (userType === 'guide' || userType === 'agency') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter your city/location"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full btn-primary ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </motion.button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Forgot Password (login only) */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-500 hover:text-primary-600">
                Forgot your password?
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AuthPage
