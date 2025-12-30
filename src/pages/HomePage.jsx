import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Users, MapPin, Star, ArrowRight, Compass, Camera, Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import MarqueeSection from '../components/MarqueeSection'
import FeatureCard from '../components/FeatureCard'
import TestimonialCard from '../components/TestimonialCard'

const HomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, currentUser } = useApp()
  const features = [
    {
      icon: Search,
      title: 'Find Local Guides',
      description: 'Connect with experienced local guides who know the hidden gems of your destination.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Trusted Agencies',
      description: 'Partner with verified travel agencies offering comprehensive packages and services.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Explore Destinations',
      description: 'Discover amazing places beyond the typical tourist spots with insider knowledge.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'All guides and agencies are verified with ratings and reviews from real travelers.',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'Found an amazing local guide in Visakhapatnam who showed us places we never would have discovered on our own!',
      avatar: '👩‍💼'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      comment: 'The travel agency made our Kerala trip seamless. Great vehicles, transparent pricing, and excellent service.',
      avatar: '👨‍💻'
    },
    {
      name: 'Anita Patel',
      location: 'Bangalore',
      rating: 5,
      comment: 'BeyondBeaches helped us create memories that will last a lifetime. Highly recommend for authentic experiences!',
      avatar: '👩‍🎨'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Happy Travelers' },
    { number: '500+', label: 'Local Guides' },
    { number: '200+', label: 'Travel Agencies' },
    { number: '50+', label: 'Destinations' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section with Real Animated Mountains */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551632811-561732d1e306?w=2400&q=90)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tight"
          >
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500"
              style={{ 
                textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
                fontFamily: "'Montserrat', 'Poppins', sans-serif",
                letterSpacing: '-0.02em'
              }}
            >
              BeyondBeaches
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-yellow-50 mb-8 font-medium drop-shadow-2xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            Discover authentic travel experiences with local guides and trusted agencies
          </motion.p>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => navigate('/destinations')}
              className="btn-primary group"
            >
              <Compass className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Start Exploring
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="btn-secondary group"
            >
              <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Become a Guide
            </button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-4 h-4 bg-primary-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-6 h-6 bg-secondary-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-3 h-3 bg-accent-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Real Travel Images Showcase */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Discover Real Adventures</h2>
            <p className="text-gray-600 text-lg">Experience breathtaking destinations with authentic travel moments</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Waterfall Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-80"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&q=80)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Majestic Waterfalls</h3>
                <p className="text-gray-200">Experience the power and beauty of nature's cascades</p>
              </div>
            </motion.div>

            {/* Mountain Peak Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-80"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Mountain Peaks</h3>
                <p className="text-gray-200">Conquer heights and witness breathtaking panoramas</p>
              </div>
            </motion.div>

            {/* Hill Station Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-80"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Serene Hills</h3>
                <p className="text-gray-200">Find peace in rolling hills and misty valleys</p>
              </div>
            </motion.div>

            {/* Beach Paradise Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-80"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Beach Paradise</h3>
                <p className="text-gray-200">Relax on pristine shores with crystal-clear waters</p>
              </div>
            </motion.div>

            {/* Forest Trails Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-80"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Forest Trails</h3>
                <p className="text-gray-200">Trek through lush greenery and discover hidden paths</p>
              </div>
            </motion.div>

            {/* Adventure Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-80"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Adventure Awaits</h3>
                <p className="text-gray-200">Join fellow travelers on unforgettable journeys</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <MarqueeSection />

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-6">
              Why Choose BeyondBeaches?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect travelers with authentic local experiences through verified guides and agencies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-6">
              What Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from real travelers who discovered amazing journeys with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of travelers who have discovered authentic experiences beyond the ordinary
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate(isAuthenticated ? '/destinations' : '/auth')}
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <Heart className="w-5 h-5 mr-2 inline group-hover:text-red-500 transition-colors" />
                {isAuthenticated ? 'Start Your Journey' : 'Join BeyondBeaches'}
              </button>
              <button 
                onClick={() => navigate('/live-demo')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <span className="mr-2">✨</span>
                Watch Live Demo
              </button>
              <button 
                onClick={() => navigate(isAuthenticated ? '/destinations' : '/auth')}
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Explore Destinations
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default HomePage
