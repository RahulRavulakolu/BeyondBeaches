import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Waves, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'Search Guides', path: '/search' },
      { name: 'Become a Guide', path: '/guide-dashboard' },
      { name: 'Agency Portal', path: '/agency-dashboard' },
    ],
    'Support': [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    'Destinations': [
      { name: 'Visakhapatnam', path: '/search?location=visakhapatnam' },
      { name: 'Goa', path: '/search?location=goa' },
      { name: 'Kerala', path: '/search?location=kerala' },
      { name: 'Rajasthan', path: '/search?location=rajasthan' },
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  ]

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center"
              >
                <Waves className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-display font-bold">BeyondBeaches</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover authentic travel experiences with local guides and trusted agencies. 
              Your journey beyond the ordinary starts here.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 bg-white/10 rounded-lg transition-colors ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary-400" />
              <span className="text-gray-300">contact@beyondbeaches.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary-400" />
              <span className="text-gray-300">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span className="text-gray-300">Mumbai, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BeyondBeaches. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with ❤️ for travelers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
