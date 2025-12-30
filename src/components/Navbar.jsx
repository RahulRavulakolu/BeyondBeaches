import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Waves, User, Search, MapPin, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { isAuthenticated, currentUser, logout } = useApp()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getNavItems = () => {
    const baseItems = [
      { name: 'Home', path: '/', icon: Waves },
      { name: 'Search', path: '/search', icon: Search },
    ]

    if (isAuthenticated && currentUser) {
      const dashboardPath = 
        currentUser.type === 'guide' ? '/guide-dashboard' :
        currentUser.type === 'agency' ? '/agency-dashboard' :
        '/user-dashboard'
      
      return [
        ...baseItems,
        { name: 'Dashboard', path: dashboardPath, icon: User },
        { name: 'Logout', path: '#', icon: LogOut, onClick: logout }
      ]
    }

    return [
      ...baseItems,
      { name: 'Login', path: '/auth', icon: User }
    ]
  }

  const navItems = getNavItems()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Logo Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.8"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
            <span 
              className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent"
              style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
            >
              BeyondBeaches
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              
              if (item.onClick) {
                return (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 text-gray-700 hover:text-primary-600 hover:bg-white/50"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-white/50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              
              if (item.onClick) {
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.onClick()
                      setIsOpen(false)
                    }}
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 text-gray-700 hover:text-primary-600 hover:bg-white/50 w-full text-left"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
