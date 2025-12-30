import React from 'react'
import { motion } from 'framer-motion'

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
        {feature.title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
      
      <motion.div
        className="mt-6 flex items-center text-primary-600 font-medium cursor-pointer"
        whileHover={{ x: 5 }}
      >
        <span>Learn more</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default FeatureCard
