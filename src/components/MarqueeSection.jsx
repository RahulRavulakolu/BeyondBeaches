import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Users, Camera, Mountain, Compass, Plane, Heart } from 'lucide-react'

const MarqueeSection = () => {
  const destinations = [
    { name: 'Baga Beach', icon: MapPin, color: 'text-blue-500' },
    { name: 'Calangute Beach', icon: Camera, color: 'text-green-500' },
    { name: 'Anjuna Beach', icon: Mountain, color: 'text-purple-500' },
    { name: 'Palolem Beach', icon: Compass, color: 'text-orange-500' },
    { name: 'Old Goa Churches', icon: Star, color: 'text-red-500' },
    { name: 'Fort Aguada', icon: Plane, color: 'text-teal-500' },
    { name: 'Dudhsagar Falls', icon: Heart, color: 'text-pink-500' },
    { name: 'Spice Plantations', icon: MapPin, color: 'text-indigo-500' },
  ]

  const experiences = [
    '🏖️ Beach Hopping',
    '🏄‍♂️ Water Sports',
    '🏛️ Portuguese Heritage',
    '🍛 Goan Cuisine',
    '🎉 Beach Parties',
    '🛥️ Dolphin Watching',
    '⛪ Church Tours',
    '🌅 Sunset Views',
    '🏍️ Bike Tours',
    '🎣 Fishing Trips',
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 overflow-hidden">
      {/* Destinations Marquee */}
      <div className="mb-12">
        <h3 className="text-center text-white text-2xl font-display font-semibold mb-8">
          Popular Destinations
        </h3>
        <div className="marquee">
          <div className="marquee-content">
            {destinations.map((destination, index) => {
              const Icon = destination.icon
              return (
                <motion.div
                  key={`dest-1-${index}`}
                  className="flex items-center space-x-3 mx-8 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className={`w-6 h-6 ${destination.color}`} />
                  <span className="font-medium whitespace-nowrap">{destination.name}</span>
                </motion.div>
              )
            })}
          </div>
          <div className="marquee-content2">
            {destinations.map((destination, index) => {
              const Icon = destination.icon
              return (
                <motion.div
                  key={`dest-2-${index}`}
                  className="flex items-center space-x-3 mx-8 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className={`w-6 h-6 ${destination.color}`} />
                  <span className="font-medium whitespace-nowrap">{destination.name}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Experiences Marquee (Reverse Direction) */}
      <div>
        <h3 className="text-center text-white text-2xl font-display font-semibold mb-8">
          Unique Experiences
        </h3>
        <div className="marquee">
          <div className="marquee-content" style={{ animationDirection: 'reverse' }}>
            {experiences.map((experience, index) => (
              <motion.div
                key={`exp-1-${index}`}
                className="mx-6 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium whitespace-nowrap"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
              >
                {experience}
              </motion.div>
            ))}
          </div>
          <div className="marquee-content2" style={{ animationDirection: 'reverse' }}>
            {experiences.map((experience, index) => (
              <motion.div
                key={`exp-2-${index}`}
                className="mx-6 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium whitespace-nowrap"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
              >
                {experience}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default MarqueeSection
