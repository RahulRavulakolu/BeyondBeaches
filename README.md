# BeyondBeaches - Travel Platform

## 🌟 Overview
BeyondBeaches is a comprehensive travel platform that connects travelers with local guides and travel agencies, offering immersive travel experiences beyond typical tourist destinations. The platform features a modern, interactive UI with 3D elements, real-time booking, and a robust backend system.

## 🧩 Core Components

### Frontend Components

#### 1. Hero3D
- **Location**: `/src/components/Hero3D.jsx`
- **Description**: Interactive 3D hero section featuring animated 3D elements including mountains, trees, and clouds.
- **Key Features**:
  - Responsive 3D scene with smooth animations
  - Custom 3D models (mountains, trees, clouds, sun)
  - Performance-optimized with React Three Fiber
  - Dynamic camera controls for immersive experience

#### 2. Navbar
- **Location**: `/src/components/Navbar.jsx`
- **Description**: Responsive navigation bar with dynamic menu items based on user authentication.
- **Key Features**:
  - Responsive design with mobile menu
  - Dynamic navigation items based on user role
  - Smooth animations with Framer Motion
  - Authentication state management

#### 3. Mountain3D
- **Location**: `/src/components/Mountain3D.jsx`
- **Description**: Reusable 3D mountain component used throughout the application.
- **Key Features**:
  - Customizable size and color
  - Realistic lighting and shadows
  - Optimized for performance

#### 4. FeatureCard
- **Location**: `/src/components/FeatureCard.jsx`
- **Description**: Card component for showcasing platform features.
- **Props**:
  - `icon`: Icon component
  - `title`: Feature title
  - `description`: Feature description

#### 5. TestimonialCard
- **Location**: `/src/components/TestimonialCard.jsx`
- **Description**: Displays user testimonials with ratings.
- **Features**:
  - Star rating display
  - User avatar and details
  - Smooth hover effects

#### 6. MarqueeSection
- **Location**: `/src/components/MarqueeSection.jsx`
- **Description**: Infinite scrolling marquee for displaying partners or featured content.
- **Features**:
  - Smooth infinite scroll
  - Customizable speed
  - Responsive design

#### 7. Footer
- **Location**: `/src/components/Footer.jsx`
- **Description**: Comprehensive footer with multiple sections.
- **Sections**:
  - Quick links
  - Contact information
  - Newsletter subscription
  - Social media links

## 🔧 Backend Components

### Data Models

#### 1. User Model
- **Location**: `/backend/src/models/User.model.js`
- **Description**: Manages user accounts and authentication
- **Key Fields**:
  - `name`, `email`, `password` (hashed)
  - `role`: user/guide/admin
  - `isEmailVerified`: Email verification status
  - `resetPasswordToken`: For password reset functionality
- **Methods**:
  - `getSignedJwtToken()`: Generate JWT token
  - `matchPassword()`: Verify password
  - `getResetPasswordToken()`: Generate password reset token

#### 2. Trip Model
- **Location**: `/backend/src/models/Trip.model.js`
- **Description**: Manages travel packages and itineraries
- **Key Fields**:
  - `title`, `description`, `duration`
  - `price`, `maxGroupSize`
  - `startLocation`, `locations` (geospatial data)
  - `guides`: Array of User references
  - `images`: Array of image URLs

#### 3. Booking Model
- **Location**: `/backend/src/models/Booking.model.js`
- **Description**: Handles trip bookings and reservations
- **Key Fields**:
  - `trip`: Reference to Trip
  - `user`: Reference to User
  - `price`: Booking amount
  - `status`: booked/paid/cancelled
  - `paid`: Boolean flag for payment status

#### 4. Review Model
- **Location**: `/backend/src/models/Review.model.js`
- **Description**: Manages user reviews and ratings
- **Key Fields**:
  - `review`, `rating` (1-5)
  - `trip`: Reference to Trip
  - `user`: Reference to User

### Controllers

#### 1. Auth Controller
- **Location**: `/backend/src/controllers/auth.controller.js`
- **Endpoints**:
  - `POST /api/v1/auth/register`: User registration
  - `POST /api/v1/auth/login`: User login
  - `POST /api/v1/auth/forgot-password`: Password reset request
  - `PATCH /api/v1/auth/reset-password/:token`: Reset password
  - `GET /api/v1/auth/verify-email/:token`: Verify email

#### 2. User Controller
- **Location**: `/backend/src/controllers/user.controller.js`
- **Endpoints**:
  - `GET /api/v1/users/me`: Get current user
  - `PATCH /api/v1/users/update-me`: Update user details
  - `DELETE /api/v1/users/delete-me`: Delete user account

#### 3. Trip Controller
- **Location**: `/backend/src/controllers/trip.controller.js`
- **Endpoints**:
  - `GET /api/v1/trips`: Get all trips (with filtering)
  - `GET /api/v1/trips/:id`: Get single trip
  - `POST /api/v1/trips`: Create new trip (admin/guide)
  - `PATCH /api/v1/trips/:id`: Update trip
  - `DELETE /api/v1/trips/:id`: Delete trip

#### 4. Booking Controller
- **Location**: `/backend/src/controllers/booking.controller.js`
- **Endpoints**:
  - `POST /api/v1/bookings`: Create new booking
  - `GET /api/v1/bookings/checkout-session/:tripId`: Create checkout session
  - `GET /api/v1/bookings/my-bookings`: Get user's bookings
  - `PATCH /api/v1/bookings/:id/cancel`: Cancel booking

#### 5. Review Controller
- **Location**: `/backend/src/controllers/review.controller.js`
- **Endpoints**:
  - `POST /api/v1/reviews`: Create new review
  - `GET /api/v1/reviews`: Get all reviews
  - `GET /api/v1/reviews/:id`: Get single review
  - `PATCH /api/v1/reviews/:id`: Update review
  - `DELETE /api/v1/reviews/:id`: Delete review

### Middleware

#### 1. Authentication
- **Location**: `/backend/src/middleware/auth.middleware.js`
- **Functions**:
  - `protect`: Verify JWT token
  - `restrictTo`: Restrict route access by user role
  - `isLoggedIn`: Check if user is authenticated

#### 2. Error Handling
- **Location**: `/backend/src/middleware/error.middleware.js`
- **Features**:
  - Global error handler
  - Development vs production error responses
  - Custom error classes

#### 3. Uploads
- **Location**: `/backend/src/middleware/upload.middleware.js`
- **Features**:
  - Image upload with Multer
  - Image processing with Sharp
  - Cloud storage integration

### Utilities

#### 1. Email Service
- **Location**: `/backend/src/utils/email.js`
- **Features**:
  - Welcome emails
  - Password reset emails
  - Booking confirmations
  - Custom email templates

#### 2. API Features
- **Location**: `/backend/src/utils/apiFeatures.js`
- **Features**:
  - Filtering
  - Sorting
  - Field limiting
  - Pagination

## 🚀 Tech Stack

### Frontend
- **React 18** - Core UI library for building interactive user interfaces
- **Vite** - Next-generation frontend tooling for fast development
- **React Router DOM v6** - Client-side routing
- **Three.js & React Three Fiber** - 3D graphics and animations
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Nodemailer** - Email functionality
- **Multer** - File upload handling
- **Bcrypt** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **Nodemon** - Development server with auto-reload

## 📁 Project Structure

### Frontend
```
src/
├── components/       # Reusable UI components
├── context/         # React context providers
├── data/            # Static data and configurations
├── pages/           # Page components
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
└── index.css        # Global styles
```

### Backend
```
backend/
├── src/
│   ├── config/      # Configuration files
│   ├── controllers/ # Request handlers
│   ├── middleware/  # Express middleware
│   ├── models/      # Database models
│   ├── routes/      # API route definitions
│   ├── services/    # Business logic
│   ├── utils/       # Utility functions
│   └── server.js    # Server entry point
└── .env             # Environment variables
```

## 🔍 Key Features

### Frontend
- **Interactive 3D Elements**: Immersive 3D visuals using Three.js
- **Responsive Design**: Works on all device sizes
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **State Management**: Context API for global state
- **Animations**: Smooth UI transitions with Framer Motion
- **Theming**: Dark/light mode support

### Backend
- **RESTful API**: Well-structured endpoints
- **Authentication**: JWT-based auth system
- **File Uploads**: Image handling with Multer
- **Email Notifications**: Booking confirmations and updates
- **Data Validation**: Server-side validation
- **Error Handling**: Comprehensive error middleware

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file with required variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory with:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## 🧪 Testing
Run the test suite:
```bash
# Frontend tests
npm test

# Backend tests (if available)
cd backend && npm test
```

## 🚀 Deployment

### Frontend
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend
```bash
# Set NODE_ENV to production
NODE_ENV=production node src/server.js
```

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team
- [Pranathi](https://github.com/username1)
- [Sai teja](https://github.com/username2)
- [Pavani](https://github.com/username1)
- [Ruthvik](https://github.com/username2)

## 🙏 Acknowledgments
- [Three.js](https://threejs.org/) for amazing 3D graphics
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Vite](https://vitejs.dev/) for the amazing development experience
