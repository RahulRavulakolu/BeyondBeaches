import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from '../src/models/User.model.js';
import Trip from '../src/models/Trip.model.js';
import Review from '../src/models/Review.model.js';
import Booking from '../src/models/Booking.model.js';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// Import data directly from source files (we'll copy the arrays here to avoid import issues with relative paths outside backend)
// NOTE: Ideally we would import these, but for a script it's safer to duplicate the static data structure 
// to avoid ESM/CommonJS conflicts between frontend/backend folders.

const users = [
    {
        name: 'Demo User',
        email: 'userdemo@gmail.com',
        password: 'demo123',
        role: 'user',
        location: 'Hyderabad',
        phone: '+91 98765 00001',
        isEmailVerified: true
    },
    {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: 'password123',
        role: 'user',
        location: 'Mumbai',
        phone: '+91 98765 43210',
        isEmailVerified: true
    }
];

const guides = [
    {
        name: 'Carlos Fernandes',
        email: 'carlos@example.com',
        password: 'password123',
        role: 'guide',
        location: 'Goa',
        phone: '+91 98765 43211',
        bio: 'Local Goan guide with Portuguese heritage knowledge and water sports expertise. 7 years experience.',
        isEmailVerified: true
    },
    {
        name: 'Maria D\'Souza',
        email: 'maria@example.com',
        password: 'password123',
        role: 'guide',
        location: 'Goa',
        phone: '+91 98765 43212',
        bio: 'Expert in Goan culture, cuisine, and historical sites with fluent Portuguese. 5 years experience.',
        isEmailVerified: true
    }
];

// Simplified version of extended agencies to work with seeding
const agencies = [
    {
        name: 'Goa Adventures',
        email: 'goa.adventures@example.com',
        password: 'password123',
        role: 'agency',
        location: 'Goa',
        phone: '+91 98765 43213',
        bio: 'Premium travel agency offering luxury Goa experiences with water sports and beach resorts. 10 years experience.',
        isEmailVerified: true,
        packages: [
            {
                title: 'Goa Beach Paradise',
                duration: 4,
                price: 18000,
                description: 'Luxury beach resort stay with water sports, meals, and transportation included. Includes Beach Resort Stay, All Meals, Water Sports.',
                summary: '4 Days / 3 Nights Luxury Beach Package',
                maxGroupSize: 10,
                difficulty: 'easy',
                imageCover: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                startLocation: {
                    description: 'Goa International Airport',
                    type: 'Point',
                    coordinates: [73.8327, 15.3803],
                    address: 'Dabolim, Goa'
                }
            },
            {
                title: 'Adventure Goa',
                duration: 3,
                price: 15000,
                description: 'Action-packed adventure with scuba diving, parasailing, and jet skiing. Includes Hotel Stay, Adventure Sports, Equipment.',
                summary: '3 Days / 2 Nights Adventure Package',
                maxGroupSize: 8,
                difficulty: 'medium',
                imageCover: 'https://images.unsplash.com/photo-1544551763-46a8723baaf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                startLocation: {
                    description: 'Panjim Bus Stand',
                    type: 'Point',
                    coordinates: [73.8278, 15.4909],
                    address: 'Panjim, Goa'
                }
            }
        ]
    },
    {
        name: 'Vizag Coastal Tours',
        email: 'vizag.tours@example.com',
        password: 'password123',
        role: 'agency',
        location: 'Visakhapatnam',
        phone: '+91 98765 00002',
        bio: 'Leading travel agency in Visakhapatnam specializing in coastal and hill station tours. 8 years experience.',
        isEmailVerified: true,
        packages: [
            {
                title: 'Vizag Beach & Hills',
                duration: 3,
                price: 12000,
                description: 'Complete Visakhapatnam tour covering beaches, Kailasagiri, and city attractions. Includes Hotel Stay, Transportation, Guide.',
                summary: '3 Days / 2 Nights Vizag Explorer',
                maxGroupSize: 15,
                difficulty: 'easy',
                imageCover: 'https://images.unsplash.com/photo-1590050752117-238cb0fb56b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                startLocation: {
                    description: 'Visakhapatnam Railway Station',
                    type: 'Point',
                    coordinates: [83.2185, 17.6868],
                    address: 'Visakhapatnam, Andhra Pradesh'
                }
            },
            {
                title: 'Araku Valley Adventure',
                duration: 2,
                price: 8000,
                description: 'Scenic train journey to Araku Valley with coffee plantation tours. Includes Train Tickets, Hotel, Meals.',
                summary: '2 Days / 1 Night Hill Station Tour',
                maxGroupSize: 12,
                difficulty: 'easy',
                imageCover: 'https://images.unsplash.com/photo-1544473244-f6890fb68854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                startLocation: {
                    description: 'Visakhapatnam Railway Station',
                    type: 'Point',
                    coordinates: [83.2185, 17.6868],
                    address: 'Visakhapatnam, Andhra Pradesh'
                }
            }
        ]
    },
    {
        name: 'Kerala Backwaters',
        email: 'kerala.travel@example.com',
        password: 'password123',
        role: 'agency',
        location: 'Kerala',
        phone: '+91 98765 99999',
        bio: 'Premier Kerala backwater experience with luxury houseboats and Ayurveda wellness packages. 12 years experience.',
        isEmailVerified: true,
        packages: [
            {
                title: 'Backwater Paradise',
                duration: 3,
                price: 18000,
                description: 'Luxury houseboat cruise through Alleppey backwaters. Includes Houseboat Stay, All Meals, Traditional Cuisine.',
                summary: '3 Days / 2 Nights Houseboat Cruise',
                maxGroupSize: 6,
                difficulty: 'easy',
                imageCover: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                startLocation: {
                    description: 'Alleppey Boat Jetty',
                    type: 'Point',
                    coordinates: [76.3388, 9.4981],
                    address: 'Alappuzha, Kerala'
                }
            }
        ]
    },
    {
        name: 'Royal Rajasthan Tours',
        email: 'rajasthan.royal@example.com',
        password: 'password123',
        role: 'agency',
        location: 'Rajasthan',
        phone: '+91 98765 88888',
        bio: 'Luxury heritage tours with palace stays and authentic royal Rajasthan experiences. 15 years experience.',
        isEmailVerified: true,
        packages: [
            {
                title: 'Royal Heritage Circuit',
                duration: 7,
                price: 45000,
                description: 'Grand tour covering Jaipur, Udaipur, Jodhpur, and Jaisalmer. Includes Heritage Hotels, Palace Tours, Desert Safari.',
                summary: '7 Days / 6 Nights Grand Rajasthan Tour',
                maxGroupSize: 12,
                difficulty: 'medium',
                imageCover: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                startLocation: {
                    description: 'Jaipur Airport',
                    type: 'Point',
                    coordinates: [75.8113, 26.8289],
                    address: 'Jaipur, Rajasthan'
                }
            }
        ]
    }
];


const populateDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env file");
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Connected to MongoDB...');

        // Clear existing data
        await User.deleteMany();
        await Trip.deleteMany();
        await Review.deleteMany();
        await Booking.deleteMany();
        console.log('🧹 Cleared existing database...');

        // Seed Users
        await User.create(users);
        console.log('👤 Travelers seeded...');

        // Seed Guides
        await User.create(guides);
        console.log('🧭 Guides seeded...');

        // Seed Agencies and Trips
        for (const agencyData of agencies) {
            // 1. Create Agency User
            const { packages, ...agencyInfo } = agencyData;
            const agency = await User.create(agencyInfo);

            // 2. Create Trips for this Agency
            if (packages && packages.length > 0) {
                const tripsWithRef = packages.map(pkg => ({
                    ...pkg,
                    agency: agency._id,
                    createdBy: agency._id,
                    guides: [] // Initially empty
                }));

                await Trip.create(tripsWithRef);
            }

            console.log(`🏢 Agency '${agency.name}' and ${packages?.length || 0} trips seeded...`);
        }

        console.log('✅ Database populated successfully with Seed Data!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error Seeding Database:', err);
        process.exit(1);
    }
};

populateDB();
