import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import SearchPage from './pages/SearchPage'
import DestinationSelectionPage from './pages/DestinationSelectionPage'
import PlaceProvidersPage from './pages/PlaceProvidersPage'
import PlacesSelectionPage from './pages/PlacesSelectionPage'
import DestinationProvidersPage from './pages/DestinationProvidersPage'
import MultiPlaceProvidersPage from './pages/MultiPlaceProvidersPage'
import GuideDashboard from './pages/GuideDashboard'
import AgencyDashboard from './pages/AgencyDashboard'
import UserDashboard from './pages/UserDashboard'
import BookingPage from './pages/BookingPage'
import DestinationPackagesPage from './pages/DestinationPackagesPage'
import BookingSummaryPage from './pages/BookingSummaryPage'
import LiveSimulationPage from './pages/LiveSimulationPage'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/destinations" element={<DestinationSelectionPage />} />
              <Route path="/destination/:destinationId/places" element={<PlacesSelectionPage />} />
              <Route path="/destination/:destinationId/providers" element={<DestinationProvidersPage />} />
              <Route path="/destination/:destinationId/packages" element={<DestinationPackagesPage />} />
              <Route path="/place/:placeId" element={<PlaceProvidersPage />} />
              <Route path="/places/:placeIds" element={<MultiPlaceProvidersPage />} />
              <Route path="/guide-dashboard" element={<GuideDashboard />} />
              <Route path="/agency-dashboard" element={<AgencyDashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/booking/:type/:id" element={<BookingPage />} />
              <Route path="/booking-summary" element={<BookingSummaryPage />} />
              <Route path="/live-demo" element={<LiveSimulationPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
