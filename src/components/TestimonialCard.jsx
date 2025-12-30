import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative"
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-8">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <Quote className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center mb-4 mt-2">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-700 leading-relaxed mb-6 italic">
        "{testimonial.comment}"
      </p>

      {/* User Info */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-2xl mr-4">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.location}</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 opacity-10">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"></div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard
