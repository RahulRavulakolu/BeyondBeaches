// Sample database for BeyondBeaches platform - Focused on Goa

export const users = [
  {
    id: 1,
    email: 'userdemo@gmail.com',
    password: 'demo123',
    name: 'Demo User',
    phone: '+91 98765 00001',
    type: 'traveler',
    location: 'Hyderabad',
    avatar: '👤'
  },
  {
    id: 101,
    email: 'priya@example.com',
    password: 'password123',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    type: 'traveler',
    location: 'Mumbai',
    avatar: '👩‍💼'
  },
  {
    id: 2,
    email: 'carlos@example.com',
    password: 'password123',
    name: 'Carlos Fernandes',
    phone: '+91 98765 43211',
    type: 'guide',
    location: 'Goa',
    avatar: '👨‍🦱',
    experience: '7 years',
    rating: 4.9,
    reviews: 156,
    price: 2500,
    specialties: ['Beach Tours', 'Portuguese Heritage', 'Water Sports', 'Nightlife'],
    description: 'Local Goan guide with Portuguese heritage knowledge and water sports expertise.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-22', '2024-01-25', '2024-01-26']
  },
  {
    id: 3,
    email: 'maria@example.com',
    password: 'password123',
    name: 'Maria D\'Souza',
    phone: '+91 98765 43212',
    type: 'guide',
    location: 'Goa',
    avatar: '👩‍🦰',
    experience: '5 years',
    rating: 4.8,
    reviews: 134,
    price: 2200,
    specialties: ['Cultural Tours', 'Food & Cuisine', 'Churches & Heritage', 'Local Markets'],
    description: 'Expert in Goan culture, cuisine, and historical sites with fluent Portuguese.',
    availability: ['2024-01-19', '2024-01-20', '2024-01-23', '2024-01-24', '2024-01-27']
  },
  {
    id: 4,
    email: 'goa.adventures@example.com',
    password: 'password123',
    name: 'Goa Adventures',
    phone: '+91 98765 43213',
    type: 'agency',
    location: 'Goa',
    avatar: '🏢',
    rating: 4.7,
    reviews: 89,
    experience: '10 years',
    price: 18000,
    specialties: ['Complete Packages', 'Water Sports', 'Beach Resorts', 'Transportation']
  },
  {
    id: 5,
    email: 'sunny@example.com',
    password: 'password123',
    name: 'Sunny Goa Tours',
    phone: '+91 98765 43214',
    type: 'agency',
    location: 'Goa',
    avatar: '🌴',
    rating: 4.6,
    reviews: 112,
    experience: '8 years',
    price: 15000,
    specialties: ['Budget Tours', 'Backpacker Packages', 'Group Tours', 'Adventure Sports']
  }
]

export const guides = [
  {
    id: 2,
    name: 'Carlos Fernandes',
    location: 'Goa',
    rating: 4.9,
    reviews: 156,
    experience: '7 years',
    price: 2500,
    specialties: ['Beach Tours', 'Portuguese Heritage', 'Water Sports', 'Nightlife'],
    image: '👨‍🦱',
    description: 'Local Goan guide with Portuguese heritage knowledge and water sports expertise. Fluent in English, Portuguese, and Konkani.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-22', '2024-01-25', '2024-01-26'],
    type: 'guide',
    documents: ['Goa Tourism License', 'Water Sports Certification', 'First Aid Certificate'],
    yearsOfExperience: 7,
    hourlyRate: 300,
    dailyRate: 2500
  },
  {
    id: 3,
    name: 'Maria D\'Souza',
    location: 'Goa',
    rating: 4.8,
    reviews: 134,
    experience: '5 years',
    price: 2200,
    specialties: ['Cultural Tours', 'Food & Cuisine', 'Churches & Heritage', 'Local Markets'],
    image: '👩‍🦰',
    description: 'Expert in Goan culture, cuisine, and historical sites with fluent Portuguese. Specializes in authentic local experiences.',
    availability: ['2024-01-19', '2024-01-20', '2024-01-23', '2024-01-24', '2024-01-27'],
    type: 'guide',
    documents: ['Tourism Guide License', 'Heritage Site Certification', 'Food Safety Certificate'],
    yearsOfExperience: 5,
    hourlyRate: 250,
    dailyRate: 2200
  },
  {
    id: 6,
    name: 'Raj Naik',
    location: 'Goa',
    rating: 4.7,
    reviews: 98,
    experience: '6 years',
    price: 2000,
    specialties: ['Adventure Sports', 'Scuba Diving', 'Parasailing', 'Jet Skiing'],
    image: '🏄‍♂️',
    description: 'Adventure sports specialist and certified scuba diving instructor. Perfect for thrill-seekers.',
    availability: ['2024-01-18', '2024-01-19', '2024-01-21', '2024-01-22', '2024-01-28'],
    type: 'guide',
    documents: ['PADI Scuba Certification', 'Adventure Sports License', 'Rescue Diver Certificate'],
    yearsOfExperience: 6,
    hourlyRate: 280,
    dailyRate: 2000
  },
  {
    id: 7,
    name: 'Anita Gomes',
    location: 'Goa',
    rating: 4.6,
    reviews: 87,
    experience: '4 years',
    price: 1800,
    specialties: ['Photography Tours', 'Sunset Points', 'Hidden Beaches', 'Nature Walks'],
    image: '📸',
    description: 'Professional photographer offering unique photo tours of Goa\'s most scenic locations.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-23', '2024-01-26', '2024-01-29'],
    type: 'guide',
    documents: ['Photography License', 'Tourism Guide Permit', 'Drone Operation Certificate'],
    yearsOfExperience: 4,
    hourlyRate: 220,
    dailyRate: 1800
  },
  // Visakhapatnam Guides
  {
    id: 8,
    name: 'Ravi Kumar',
    location: 'Visakhapatnam',
    rating: 4.8,
    reviews: 112,
    experience: '6 years',
    price: 2000,
    specialties: ['Naval Heritage', 'Beach Tours', 'Hill Stations', 'Local Culture'],
    image: '👨‍💼',
    description: 'Local Vizag guide with extensive knowledge of naval history, beaches, and hill stations. Expert in Telugu and English.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-22', '2024-01-25', '2024-01-26'],
    type: 'guide',
    documents: ['AP Tourism License', 'Naval Museum Guide Certificate', 'First Aid Certificate'],
    yearsOfExperience: 6,
    hourlyRate: 250,
    dailyRate: 2000
  },
  {
    id: 9,
    name: 'Lakshmi Devi',
    location: 'Visakhapatnam',
    rating: 4.6,
    reviews: 87,
    experience: '4 years',
    price: 1800,
    specialties: ['Araku Valley', 'Tribal Culture', 'Coffee Plantations', 'Nature Tours'],
    image: '👩‍🌾',
    description: 'Specialist in Araku Valley tours and tribal culture. Fluent in Telugu, Hindi, and basic English.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-23', '2024-01-24', '2024-01-27'],
    type: 'guide',
    documents: ['Tribal Area Permit', 'Nature Guide License', 'Coffee Plantation Certificate'],
    yearsOfExperience: 4,
    hourlyRate: 225,
    dailyRate: 1800
  },
  {
    id: 10,
    name: 'Venkat Rao',
    location: 'Visakhapatnam',
    rating: 4.7,
    reviews: 95,
    experience: '5 years',
    price: 1900,
    specialties: ['Beach Tours', 'Submarine Museum', 'Kailasagiri', 'Local Cuisine'],
    image: '🧑‍💼',
    description: 'Expert in Vizag city tours and coastal attractions. Great knowledge of local history and food.',
    availability: ['2024-01-19', '2024-01-22', '2024-01-24', '2024-01-26', '2024-01-28'],
    type: 'guide',
    documents: ['AP Tourism License', 'City Guide Certificate', 'First Aid Certificate'],
    yearsOfExperience: 5,
    hourlyRate: 240,
    dailyRate: 1900
  },
  // Kerala Guides
  {
    id: 11,
    name: 'Suresh Menon',
    location: 'Kerala',
    rating: 4.9,
    reviews: 145,
    experience: '8 years',
    price: 2300,
    specialties: ['Backwaters', 'Houseboat Tours', 'Ayurveda', 'Kathakali'],
    image: '🛶',
    description: 'Kerala backwater specialist with deep knowledge of Ayurveda and traditional arts. Fluent in Malayalam, English, and Hindi.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-23', '2024-01-25', '2024-01-27'],
    type: 'guide',
    documents: ['Kerala Tourism License', 'Houseboat Guide Certificate', 'Ayurveda Knowledge Certificate'],
    yearsOfExperience: 8,
    hourlyRate: 280,
    dailyRate: 2300
  },
  {
    id: 12,
    name: 'Maya Nair',
    location: 'Kerala',
    rating: 4.8,
    reviews: 128,
    experience: '6 years',
    price: 2100,
    specialties: ['Tea Plantations', 'Munnar Tours', 'Wildlife', 'Photography'],
    image: '🍵',
    description: 'Munnar and hill station expert. Specializes in tea plantation tours and wildlife photography.',
    availability: ['2024-01-19', '2024-01-21', '2024-01-24', '2024-01-26', '2024-01-29'],
    type: 'guide',
    documents: ['Hill Station Guide License', 'Wildlife Photography Permit', 'Tea Estate Access'],
    yearsOfExperience: 6,
    hourlyRate: 260,
    dailyRate: 2100
  },
  {
    id: 13,
    name: 'Arun Pillai',
    location: 'Kerala',
    rating: 4.7,
    reviews: 102,
    experience: '5 years',
    price: 2000,
    specialties: ['Beaches', 'Kovalam', 'Varkala', 'Water Sports'],
    image: '🏖️',
    description: 'Beach and coastal tour specialist. Expert in water sports and beach activities in Kerala.',
    availability: ['2024-01-20', '2024-01-22', '2024-01-23', '2024-01-25', '2024-01-28'],
    type: 'guide',
    documents: ['Coastal Guide License', 'Water Sports Certificate', 'Lifeguard Training'],
    yearsOfExperience: 5,
    hourlyRate: 250,
    dailyRate: 2000
  },
  // Rajasthan Guides
  {
    id: 14,
    name: 'Vikram Singh',
    location: 'Rajasthan',
    rating: 4.9,
    reviews: 167,
    experience: '10 years',
    price: 2500,
    specialties: ['Palaces', 'Forts', 'Desert Safari', 'Royal Heritage'],
    image: '🏰',
    description: 'Royal Rajasthan expert with extensive knowledge of palaces, forts, and desert culture. Fluent in Hindi, English, and Rajasthani.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-22', '2024-01-24', '2024-01-26'],
    type: 'guide',
    documents: ['Rajasthan Tourism License', 'Heritage Site Certificate', 'Desert Safari Permit'],
    yearsOfExperience: 10,
    hourlyRate: 300,
    dailyRate: 2500
  },
  {
    id: 15,
    name: 'Priya Rathore',
    location: 'Rajasthan',
    rating: 4.8,
    reviews: 134,
    experience: '7 years',
    price: 2200,
    specialties: ['Jaipur City', 'Handicrafts', 'Local Markets', 'Cuisine'],
    image: '👸',
    description: 'Jaipur specialist focusing on handicrafts, local markets, and authentic Rajasthani cuisine.',
    availability: ['2024-01-19', '2024-01-21', '2024-01-23', '2024-01-25', '2024-01-27'],
    type: 'guide',
    documents: ['City Guide License', 'Handicraft Expert Certificate', 'Food Safety Certificate'],
    yearsOfExperience: 7,
    hourlyRate: 270,
    dailyRate: 2200
  },
  {
    id: 16,
    name: 'Arjun Shekhawat',
    location: 'Rajasthan',
    rating: 4.7,
    reviews: 118,
    experience: '6 years',
    price: 2100,
    specialties: ['Camel Safari', 'Desert Camping', 'Folk Music', 'Village Tours'],
    image: '🐪',
    description: 'Desert safari and village tour expert. Specializes in authentic rural Rajasthan experiences.',
    availability: ['2024-01-20', '2024-01-22', '2024-01-24', '2024-01-26', '2024-01-28'],
    type: 'guide',
    documents: ['Desert Guide License', 'Camel Safari Permit', 'Village Tourism Certificate'],
    yearsOfExperience: 6,
    hourlyRate: 260,
    dailyRate: 2100
  },
  // Himachal Pradesh Guides
  {
    id: 17,
    name: 'Rohan Thakur',
    location: 'Himachal Pradesh',
    rating: 4.9,
    reviews: 152,
    experience: '9 years',
    price: 2400,
    specialties: ['Trekking', 'Mountain Climbing', 'Adventure Sports', 'Camping'],
    image: '⛰️',
    description: 'Professional trekking guide and mountaineer. Expert in Himalayan trails and adventure activities.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-23', '2024-01-25', '2024-01-27'],
    type: 'guide',
    documents: ['Mountaineering Certificate', 'Trekking Guide License', 'First Aid & Rescue Training'],
    yearsOfExperience: 9,
    hourlyRate: 290,
    dailyRate: 2400
  },
  {
    id: 18,
    name: 'Anjali Sharma',
    location: 'Himachal Pradesh',
    rating: 4.8,
    reviews: 126,
    experience: '6 years',
    price: 2100,
    specialties: ['Manali Tours', 'Solang Valley', 'Rohtang Pass', 'Skiing'],
    image: '⛷️',
    description: 'Manali and snow activities specialist. Expert in winter sports and scenic mountain tours.',
    availability: ['2024-01-19', '2024-01-21', '2024-01-24', '2024-01-26', '2024-01-28'],
    type: 'guide',
    documents: ['Skiing Instructor License', 'Mountain Guide Certificate', 'Snow Safety Training'],
    yearsOfExperience: 6,
    hourlyRate: 260,
    dailyRate: 2100
  },
  {
    id: 19,
    name: 'Karan Verma',
    location: 'Himachal Pradesh',
    rating: 4.7,
    reviews: 108,
    experience: '5 years',
    price: 2000,
    specialties: ['Shimla Heritage', 'Colonial Architecture', 'Mall Road', 'Toy Train'],
    image: '🚂',
    description: 'Shimla heritage and colonial history expert. Great knowledge of British-era architecture.',
    availability: ['2024-01-20', '2024-01-22', '2024-01-23', '2024-01-25', '2024-01-29'],
    type: 'guide',
    documents: ['Heritage Guide License', 'Colonial History Certificate', 'Tourism Permit'],
    yearsOfExperience: 5,
    hourlyRate: 250,
    dailyRate: 2000
  },
  // Uttarakhand Guides
  {
    id: 20,
    name: 'Deepak Rawat',
    location: 'Uttarakhand',
    rating: 4.9,
    reviews: 143,
    experience: '8 years',
    price: 2300,
    specialties: ['Rishikesh', 'River Rafting', 'Yoga', 'Spiritual Tours'],
    image: '🧘',
    description: 'Rishikesh specialist focusing on adventure sports, yoga, and spiritual experiences along the Ganges.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-23', '2024-01-25', '2024-01-27'],
    type: 'guide',
    documents: ['River Rafting License', 'Yoga Instructor Certificate', 'Adventure Sports Permit'],
    yearsOfExperience: 8,
    hourlyRate: 280,
    dailyRate: 2300
  },
  {
    id: 21,
    name: 'Priyanka Bisht',
    location: 'Uttarakhand',
    rating: 4.8,
    reviews: 119,
    experience: '6 years',
    price: 2100,
    specialties: ['Nainital', 'Lake Tours', 'Hill Stations', 'Nature Walks'],
    image: '🏞️',
    description: 'Nainital and lake district expert. Specializes in scenic tours and nature photography.',
    availability: ['2024-01-19', '2024-01-21', '2024-01-24', '2024-01-26', '2024-01-28'],
    type: 'guide',
    documents: ['Hill Station Guide License', 'Boating Permit', 'Nature Guide Certificate'],
    yearsOfExperience: 6,
    hourlyRate: 260,
    dailyRate: 2100
  },
  {
    id: 22,
    name: 'Amit Negi',
    location: 'Uttarakhand',
    rating: 4.7,
    reviews: 104,
    experience: '5 years',
    price: 2000,
    specialties: ['Jim Corbett', 'Wildlife Safari', 'Bird Watching', 'Nature Photography'],
    image: '🐅',
    description: 'Wildlife and nature expert specializing in Jim Corbett National Park safaris and bird watching.',
    availability: ['2024-01-20', '2024-01-22', '2024-01-23', '2024-01-25', '2024-01-29'],
    type: 'guide',
    documents: ['Wildlife Guide License', 'Safari Permit', 'Bird Watching Certificate'],
    yearsOfExperience: 5,
    hourlyRate: 250,
    dailyRate: 2000
  },
  // Tamil Nadu Guides
  {
    id: 23,
    name: 'Ramesh Kumar',
    location: 'Tamil Nadu',
    rating: 4.9,
    reviews: 156,
    experience: '9 years',
    price: 2400,
    specialties: ['Temples', 'Dravidian Architecture', 'Classical Dance', 'Heritage'],
    image: '🕉️',
    description: 'Temple architecture and heritage expert. Deep knowledge of Dravidian culture and classical arts.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-23', '2024-01-25', '2024-01-27'],
    type: 'guide',
    documents: ['Temple Guide License', 'Heritage Expert Certificate', 'Classical Arts Knowledge'],
    yearsOfExperience: 9,
    hourlyRate: 290,
    dailyRate: 2400
  },
  {
    id: 24,
    name: 'Divya Iyer',
    location: 'Tamil Nadu',
    rating: 4.8,
    reviews: 132,
    experience: '7 years',
    price: 2200,
    specialties: ['Chennai City', 'Marina Beach', 'Silk Sarees', 'South Indian Cuisine'],
    image: '👗',
    description: 'Chennai specialist focusing on city tours, shopping, and authentic South Indian food experiences.',
    availability: ['2024-01-19', '2024-01-21', '2024-01-24', '2024-01-26', '2024-01-28'],
    type: 'guide',
    documents: ['City Guide License', 'Food Expert Certificate', 'Shopping Guide Permit'],
    yearsOfExperience: 7,
    hourlyRate: 270,
    dailyRate: 2200
  },
  {
    id: 25,
    name: 'Karthik Rajan',
    location: 'Tamil Nadu',
    rating: 4.7,
    reviews: 115,
    experience: '6 years',
    price: 2100,
    specialties: ['Ooty', 'Nilgiri Hills', 'Tea Gardens', 'Toy Train'],
    image: '🚃',
    description: 'Hill station expert specializing in Ooty and Nilgiri mountain railway experiences.',
    availability: ['2024-01-20', '2024-01-22', '2024-01-23', '2024-01-25', '2024-01-29'],
    type: 'guide',
    documents: ['Hill Station License', 'Tea Estate Access', 'Railway Heritage Certificate'],
    yearsOfExperience: 6,
    hourlyRate: 260,
    dailyRate: 2100
  },
  // Maharashtra Guides
  {
    id: 26,
    name: 'Aditya Deshmukh',
    location: 'Maharashtra',
    rating: 4.9,
    reviews: 178,
    experience: '10 years',
    price: 2500,
    specialties: ['Mumbai City', 'Bollywood', 'Street Food', 'Colonial Heritage'],
    image: '🎬',
    description: 'Mumbai expert with Bollywood connections and deep knowledge of city history and street food culture.',
    availability: ['2024-01-20', '2024-01-21', '2024-01-22', '2024-01-24', '2024-01-26'],
    type: 'guide',
    documents: ['Mumbai Tourism License', 'Bollywood Tour Permit', 'Food Safety Certificate'],
    yearsOfExperience: 10,
    hourlyRate: 300,
    dailyRate: 2500
  },
  {
    id: 27,
    name: 'Sneha Patil',
    location: 'Maharashtra',
    rating: 4.8,
    reviews: 142,
    experience: '7 years',
    price: 2200,
    specialties: ['Pune Heritage', 'Forts', 'Shaniwar Wada', 'Marathi Culture'],
    image: '🏛️',
    description: 'Pune and Maratha heritage specialist. Expert in historical forts and cultural experiences.',
    availability: ['2024-01-19', '2024-01-21', '2024-01-23', '2024-01-25', '2024-01-27'],
    type: 'guide',
    documents: ['Heritage Guide License', 'Fort Access Permits', 'Cultural Expert Certificate'],
    yearsOfExperience: 7,
    hourlyRate: 270,
    dailyRate: 2200
  },
  {
    id: 28,
    name: 'Rahul Joshi',
    location: 'Maharashtra',
    rating: 4.7,
    reviews: 125,
    experience: '6 years',
    price: 2100,
    specialties: ['Lonavala', 'Khandala', 'Waterfalls', 'Trekking'],
    image: '🌄',
    description: 'Western Ghats and hill station expert. Specializes in monsoon treks and waterfall tours.',
    availability: ['2024-01-20', '2024-01-22', '2024-01-24', '2024-01-26', '2024-01-28'],
    type: 'guide',
    documents: ['Trekking Guide License', 'Hill Station Permit', 'Safety Training Certificate'],
    yearsOfExperience: 6,
    hourlyRate: 260,
    dailyRate: 2100
  }
]

export const agencies = [
  {
    id: 100,
    email: 'agencydemo@gmail.com',
    password: 'demo123',
    name: 'Demo Travel Agency',
    location: 'Visakhapatnam',
    rating: 4.8,
    reviews: 145,
    experience: '12 years',
    price: 15000,
    specialties: ['Complete Packages', 'Coastal Tours', 'Hill Stations', 'Custom Itineraries'],
    image: '🏢',
    description: 'Premier travel agency offering customized packages for Visakhapatnam and surrounding areas with professional service.',
    type: 'agency',
    phone: '+91 98765 00002',
    documents: ['AP Tourism License', 'Vehicle Permits', 'Insurance Certificates'],
    packages: [],
    vehicles: [
      { id: 1, type: '4-Seater Sedan', model: 'Honda City', ratePerKm: 12, capacity: 4, status: 'available' },
      { id: 2, type: '6-Seater SUV', model: 'Toyota Innova', ratePerKm: 18, capacity: 6, status: 'available' },
      { id: 3, type: '2-Seater Bike', model: 'Royal Enfield', ratePerKm: 8, capacity: 2, status: 'available' }
    ]
  },
  {
    id: 4,
    name: 'Goa Adventures',
    location: 'Goa',
    rating: 4.7,
    reviews: 89,
    experience: '10 years',
    price: 18000,
    specialties: ['Complete Packages', 'Water Sports', 'Beach Resorts', 'Transportation'],
    image: '🏢',
    description: 'Premium travel agency offering luxury Goa experiences with water sports and beach resorts.',
    type: 'agency',
    documents: ['Tourism License', 'Vehicle Permits', 'Insurance Certificates'],
    packages: [
      {
        id: 1,
        name: 'Goa Beach Paradise',
        duration: '4 Days / 3 Nights',
        price: 18000,
        description: 'Luxury beach resort stay with water sports, meals, and transportation included',
        includes: ['Beach Resort Stay', 'All Meals', 'Water Sports', 'Airport Transfer', 'Sightseeing']
      },
      {
        id: 2,
        name: 'Adventure Goa',
        duration: '3 Days / 2 Nights',
        price: 15000,
        description: 'Action-packed adventure with scuba diving, parasailing, and jet skiing',
        includes: ['Hotel Stay', 'Adventure Sports', 'Equipment', 'Instructor', 'Transportation']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Honda City', rate: 15, status: 'available' },
      { type: '6-Seater SUV', model: 'Toyota Innova', rate: 20, status: 'available' },
      { type: '8-Seater Tempo', model: 'Force Traveller', rate: 25, status: 'booked' },
      { type: '2-Seater Bike', model: 'Royal Enfield', rate: 8, status: 'available' }
    ]
  },
  {
    id: 5,
    name: 'Sunny Goa Tours',
    location: 'Goa',
    rating: 4.6,
    reviews: 112,
    experience: '8 years',
    price: 15000,
    specialties: ['Budget Tours', 'Backpacker Packages', 'Group Tours', 'Adventure Sports'],
    image: '🌴',
    description: 'Budget-friendly travel agency specializing in backpacker and group tours with authentic local experiences.',
    type: 'agency',
    documents: ['Tourism License', 'Vehicle Registration', 'Safety Certificates'],
    packages: [
      {
        id: 3,
        name: 'Budget Goa Explorer',
        duration: '3 Days / 2 Nights',
        price: 12000,
        description: 'Affordable Goa experience with hostel stay, local food, and beach activities',
        includes: ['Hostel Stay', 'Local Meals', 'Beach Activities', 'Local Transport', 'Guide']
      },
      {
        id: 4,
        name: 'Goa Heritage Trail',
        duration: '2 Days / 1 Night',
        price: 8000,
        description: 'Cultural tour covering Portuguese heritage sites, churches, and local markets',
        includes: ['Heritage Sites', 'Church Tours', 'Local Markets', 'Traditional Meals', 'Guide']
      }
    ],
    vehicles: [
      { type: '4-Seater Hatchback', model: 'Maruti Swift', rate: 12, status: 'available' },
      { type: '6-Seater SUV', model: 'Mahindra Scorpio', rate: 18, status: 'available' },
      { type: '2-Seater Scooter', model: 'Honda Activa', rate: 5, status: 'available' },
      { type: '12-Seater Van', model: 'Tata Winger', rate: 30, status: 'available' }
    ]
  },
  // Visakhapatnam Agency
  {
    id: 6,
    name: 'Vizag Coastal Tours',
    location: 'Visakhapatnam',
    rating: 4.5,
    reviews: 76,
    experience: '8 years',
    price: 15000,
    specialties: ['Coastal Tours', 'Hill Station Trips', 'Naval Heritage', 'Araku Valley'],
    image: '🚗',
    description: 'Leading travel agency in Visakhapatnam specializing in coastal and hill station tours with comfortable transportation.',
    type: 'agency',
    documents: ['AP Tourism License', 'Vehicle Permits', 'Insurance Certificates'],
    packages: [
      {
        id: 1,
        name: 'Vizag Beach & Hills',
        duration: '3 Days / 2 Nights',
        price: 12000,
        description: 'Complete Visakhapatnam tour covering beaches, Kailasagiri, and city attractions',
        includes: ['Hotel Stay', 'All Meals', 'Transportation', 'Entry Tickets', 'Guide']
      },
      {
        id: 2,
        name: 'Araku Valley Adventure',
        duration: '2 Days / 1 Night',
        price: 8000,
        description: 'Scenic train journey to Araku Valley with coffee plantation tours and tribal culture',
        includes: ['Train Tickets', 'Hotel Stay', 'Meals', 'Coffee Tour', 'Tribal Museum']
      },
      {
        id: 3,
        name: 'Naval Heritage Tour',
        duration: '1 Day',
        price: 3500,
        description: 'Explore Vizag\'s naval history with submarine museum and INS Kursura',
        includes: ['Transportation', 'Entry Tickets', 'Lunch', 'Guide']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Hyundai Verna', rate: 14, status: 'available' },
      { type: '7-Seater SUV', model: 'Toyota Innova', rate: 20, status: 'available' },
      { type: '12-Seater Tempo', model: 'Mahindra Bolero', rate: 25, status: 'available' },
      { type: '35-Seater Bus', model: 'Tata LP 909', rate: 45, status: 'available' }
    ]
  },
  // Additional Goa Agency
  {
    id: 7,
    name: 'Goa Beach Bliss',
    location: 'Goa',
    rating: 4.5,
    reviews: 95,
    experience: '7 years',
    price: 14000,
    specialties: ['Beach Parties', 'Water Sports', 'Nightlife', 'Budget Tours'],
    image: '🎉',
    description: 'Youth-focused travel agency specializing in beach parties and nightlife experiences.',
    type: 'agency',
    documents: ['Tourism License', 'Event Permits', 'Vehicle Registration'],
    packages: [
      {
        id: 1,
        name: 'Goa Party Package',
        duration: '3 Days / 2 Nights',
        price: 13000,
        description: 'Beach parties, club hopping, and water sports',
        includes: ['Hotel Stay', 'Club Entry', 'Water Sports', 'Breakfast', 'Transport']
      }
    ],
    vehicles: [
      { type: '4-Seater Hatchback', model: 'Maruti Swift', rate: 12, status: 'available' },
      { type: '2-Seater Bike', model: 'Royal Enfield', rate: 8, status: 'available' }
    ]
  },
  // Additional Visakhapatnam Agencies
  {
    id: 8,
    name: 'Eastern Travels Vizag',
    location: 'Visakhapatnam',
    rating: 4.6,
    reviews: 92,
    experience: '10 years',
    price: 16000,
    specialties: ['Luxury Tours', 'Corporate Packages', 'Beach Resorts', 'Adventure Sports'],
    image: '🏖️',
    description: 'Premium travel agency offering luxury beach experiences and corporate tour packages.',
    type: 'agency',
    documents: ['AP Tourism License', 'Luxury Vehicle Permits', 'Insurance Certificates'],
    packages: [
      {
        id: 1,
        name: 'Vizag Luxury Escape',
        duration: '4 Days / 3 Nights',
        price: 22000,
        description: 'Luxury beach resort stay with water sports and fine dining',
        includes: ['5-Star Resort', 'All Meals', 'Water Sports', 'Spa', 'Airport Transfer']
      }
    ],
    vehicles: [
      { type: '4-Seater Luxury Sedan', model: 'Mercedes E-Class', rate: 25, status: 'available' },
      { type: '7-Seater Premium SUV', model: 'Toyota Fortuner', rate: 30, status: 'available' }
    ]
  },
  {
    id: 9,
    name: 'Araku Express Tours',
    location: 'Visakhapatnam',
    rating: 4.4,
    reviews: 68,
    experience: '6 years',
    price: 12000,
    specialties: ['Araku Valley', 'Tribal Tours', 'Coffee Plantations', 'Nature Trails'],
    image: '☕',
    description: 'Specialized in Araku Valley tours with focus on tribal culture and coffee experiences.',
    type: 'agency',
    documents: ['Tribal Area Permits', 'Vehicle Registration', 'Tourism License'],
    packages: [
      {
        id: 1,
        name: 'Araku Coffee Trail',
        duration: '2 Days / 1 Night',
        price: 9000,
        description: 'Coffee plantation tour with tribal village visits',
        includes: ['Train Journey', 'Hotel', 'Meals', 'Coffee Tour', 'Tribal Experience']
      }
    ],
    vehicles: [
      { type: '6-Seater SUV', model: 'Mahindra Scorpio', rate: 18, status: 'available' },
      { type: '10-Seater Van', model: 'Force Traveller', rate: 22, status: 'available' }
    ]
  },
  // Kerala Agencies
  {
    id: 10,
    name: 'Kerala Backwaters',
    location: 'Kerala',
    rating: 4.8,
    reviews: 156,
    experience: '12 years',
    price: 20000,
    specialties: ['Houseboat Tours', 'Backwater Cruises', 'Ayurveda', 'Beach Resorts'],
    image: '🛶',
    description: 'Premier Kerala backwater experience with luxury houseboats and Ayurveda wellness packages.',
    type: 'agency',
    documents: ['Kerala Tourism License', 'Houseboat Permits', 'Ayurveda Center Tie-ups'],
    packages: [
      {
        id: 1,
        name: 'Backwater Paradise',
        duration: '3 Days / 2 Nights',
        price: 18000,
        description: 'Luxury houseboat cruise through Alleppey backwaters',
        includes: ['Houseboat Stay', 'All Meals', 'Sightseeing', 'Traditional Cuisine', 'Guide']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Honda City', rate: 15, status: 'available' },
      { type: '7-Seater SUV', model: 'Toyota Innova', rate: 22, status: 'available' }
    ]
  },
  {
    id: 11,
    name: 'Munnar Hill Holidays',
    location: 'Kerala',
    rating: 4.7,
    reviews: 134,
    experience: '9 years',
    price: 16000,
    specialties: ['Hill Station Tours', 'Tea Plantations', 'Wildlife Safaris', 'Trekking'],
    image: '🍵',
    description: 'Specializing in Munnar and hill station tours with tea plantation experiences.',
    type: 'agency',
    documents: ['Hill Station Permits', 'Wildlife Safari License', 'Tourism Registration'],
    packages: [
      {
        id: 1,
        name: 'Munnar Tea Gardens',
        duration: '3 Days / 2 Nights',
        price: 14000,
        description: 'Tea plantation tour with scenic hill station sightseeing',
        includes: ['Hotel Stay', 'Meals', 'Tea Factory Tour', 'Sightseeing', 'Guide']
      }
    ],
    vehicles: [
      { type: '4-Seater Hatchback', model: 'Maruti Swift', rate: 12, status: 'available' },
      { type: '6-Seater SUV', model: 'Mahindra XUV', rate: 20, status: 'available' }
    ]
  },
  {
    id: 12,
    name: 'Coastal Kerala Tours',
    location: 'Kerala',
    rating: 4.6,
    reviews: 118,
    experience: '8 years',
    price: 14000,
    specialties: ['Beach Tours', 'Kovalam', 'Varkala', 'Seafood Experiences'],
    image: '🌊',
    description: 'Beach-focused tours covering Kerala\'s beautiful coastline and seafood culture.',
    type: 'agency',
    documents: ['Coastal Tourism License', 'Beach Resort Partnerships', 'Vehicle Permits'],
    packages: [
      {
        id: 1,
        name: 'Kerala Beach Hopping',
        duration: '4 Days / 3 Nights',
        price: 16000,
        description: 'Tour covering Kovalam, Varkala, and Marari beaches',
        includes: ['Beach Resorts', 'All Meals', 'Water Sports', 'Seafood Tours', 'Transport']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Hyundai Verna', rate: 14, status: 'available' },
      { type: '7-Seater MPV', model: 'Maruti Ertiga', rate: 18, status: 'available' }
    ]
  },
  // Rajasthan Agencies
  {
    id: 13,
    name: 'Royal Rajasthan Tours',
    location: 'Rajasthan',
    rating: 4.9,
    reviews: 198,
    experience: '15 years',
    price: 25000,
    specialties: ['Palace Tours', 'Heritage Hotels', 'Desert Safari', 'Cultural Shows'],
    image: '🏰',
    description: 'Luxury heritage tours with palace stays and authentic royal Rajasthan experiences.',
    type: 'agency',
    documents: ['Rajasthan Tourism License', 'Heritage Hotel Partnerships', 'Desert Safari Permits'],
    packages: [
      {
        id: 1,
        name: 'Royal Heritage Circuit',
        duration: '7 Days / 6 Nights',
        price: 45000,
        description: 'Grand tour covering Jaipur, Udaipur, Jodhpur, and Jaisalmer',
        includes: ['Heritage Hotels', 'All Meals', 'Palace Tours', 'Desert Safari', 'Cultural Shows']
      }
    ],
    vehicles: [
      { type: '4-Seater Luxury Sedan', model: 'Mercedes E-Class', rate: 30, status: 'available' },
      { type: '7-Seater Premium SUV', model: 'Toyota Fortuner', rate: 35, status: 'available' }
    ]
  },
  {
    id: 14,
    name: 'Jaipur Pink City Travels',
    location: 'Rajasthan',
    rating: 4.7,
    reviews: 145,
    experience: '10 years',
    price: 18000,
    specialties: ['Jaipur Tours', 'Shopping', 'Handicrafts', 'Food Tours'],
    image: '🛍️',
    description: 'Jaipur specialist offering city tours, shopping experiences, and culinary adventures.',
    type: 'agency',
    documents: ['City Tourism License', 'Shopping Guide Permits', 'Food Tour Certification'],
    packages: [
      {
        id: 1,
        name: 'Pink City Explorer',
        duration: '3 Days / 2 Nights',
        price: 15000,
        description: 'Complete Jaipur tour with forts, palaces, and markets',
        includes: ['Hotel Stay', 'Meals', 'Fort Tours', 'Shopping Guide', 'Transport']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Honda City', rate: 16, status: 'available' },
      { type: '6-Seater SUV', model: 'Mahindra Scorpio', rate: 22, status: 'available' }
    ]
  },
  {
    id: 15,
    name: 'Desert Dreams Rajasthan',
    location: 'Rajasthan',
    rating: 4.6,
    reviews: 122,
    experience: '8 years',
    price: 16000,
    specialties: ['Budget Tours', 'Backpacker Packages', 'Village Tours', 'Camel Safari'],
    image: '🐪',
    description: 'Budget-friendly Rajasthan tours with authentic village and desert experiences.',
    type: 'agency',
    documents: ['Tourism License', 'Village Access Permits', 'Safari Certifications'],
    packages: [
      {
        id: 1,
        name: 'Budget Rajasthan',
        duration: '5 Days / 4 Nights',
        price: 20000,
        description: 'Affordable tour covering major Rajasthan cities',
        includes: ['Budget Hotels', 'Meals', 'Sightseeing', 'Transport', 'Guide']
      }
    ],
    vehicles: [
      { type: '4-Seater Hatchback', model: 'Maruti Swift', rate: 12, status: 'available' },
      { type: '7-Seater Tempo', model: 'Force Traveller', rate: 20, status: 'available' }
    ]
  },
  // Himachal Pradesh Agencies
  {
    id: 16,
    name: 'Himalayan Adventures',
    location: 'Himachal Pradesh',
    rating: 4.8,
    reviews: 167,
    experience: '12 years',
    price: 22000,
    specialties: ['Trekking Expeditions', 'Mountain Climbing', 'Camping', 'Adventure Sports'],
    image: '⛰️',
    description: 'Premier adventure tour operator specializing in Himalayan treks and expeditions.',
    type: 'agency',
    documents: ['Mountaineering License', 'Trekking Permits', 'Safety Certifications'],
    packages: [
      {
        id: 1,
        name: 'Himalayan Trek Package',
        duration: '7 Days / 6 Nights',
        price: 28000,
        description: 'Multi-day trekking expedition with camping and mountain views',
        includes: ['Camping Equipment', 'All Meals', 'Guides', 'Permits', 'Safety Gear']
      }
    ],
    vehicles: [
      { type: '7-Seater SUV', model: 'Mahindra Thar', rate: 25, status: 'available' },
      { type: '10-Seater Tempo', model: 'Force Traveller', rate: 30, status: 'available' }
    ]
  },
  {
    id: 17,
    name: 'Manali Snow Tours',
    location: 'Himachal Pradesh',
    rating: 4.7,
    reviews: 138,
    experience: '9 years',
    price: 18000,
    specialties: ['Manali Tours', 'Skiing', 'Snowboarding', 'Solang Valley'],
    image: '⛷️',
    description: 'Manali specialist offering winter sports and scenic mountain experiences.',
    type: 'agency',
    documents: ['Winter Sports License', 'Equipment Rental Permits', 'Tourism Registration'],
    packages: [
      {
        id: 1,
        name: 'Manali Winter Special',
        duration: '4 Days / 3 Nights',
        price: 16000,
        description: 'Winter sports package with skiing and snowboarding',
        includes: ['Hotel Stay', 'Meals', 'Skiing Equipment', 'Instructor', 'Transport']
      }
    ],
    vehicles: [
      { type: '4-Seater SUV', model: 'Mahindra Scorpio', rate: 20, status: 'available' },
      { type: '7-Seater SUV', model: 'Toyota Innova', rate: 25, status: 'available' }
    ]
  },
  {
    id: 18,
    name: 'Shimla Heritage Tours',
    location: 'Himachal Pradesh',
    rating: 4.6,
    reviews: 115,
    experience: '10 years',
    price: 15000,
    specialties: ['Shimla Tours', 'Colonial Heritage', 'Toy Train', 'Mall Road'],
    image: '🚂',
    description: 'Shimla heritage tours focusing on colonial architecture and toy train experiences.',
    type: 'agency',
    documents: ['Heritage Tourism License', 'Railway Partnerships', 'Vehicle Permits'],
    packages: [
      {
        id: 1,
        name: 'Colonial Shimla',
        duration: '3 Days / 2 Nights',
        price: 12000,
        description: 'Heritage tour with toy train ride and colonial sites',
        includes: ['Hotel Stay', 'Meals', 'Toy Train', 'Heritage Sites', 'Guide']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Honda City', rate: 15, status: 'available' },
      { type: '6-Seater SUV', model: 'Maruti Ertiga', rate: 18, status: 'available' }
    ]
  },
  // Uttarakhand Agencies
  {
    id: 19,
    name: 'Rishikesh River Runners',
    location: 'Uttarakhand',
    rating: 4.8,
    reviews: 172,
    experience: '11 years',
    price: 19000,
    specialties: ['River Rafting', 'Bungee Jumping', 'Yoga Retreats', 'Spiritual Tours'],
    image: '🧘',
    description: 'Adventure and spiritual tour specialist in Rishikesh with yoga and rafting packages.',
    type: 'agency',
    documents: ['River Rafting License', 'Adventure Sports Permits', 'Yoga Center Partnerships'],
    packages: [
      {
        id: 1,
        name: 'Rishikesh Adventure',
        duration: '3 Days / 2 Nights',
        price: 15000,
        description: 'River rafting and adventure sports package',
        includes: ['Camp Stay', 'Meals', 'Rafting', 'Bungee Jump', 'Yoga Session']
      }
    ],
    vehicles: [
      { type: '7-Seater SUV', model: 'Toyota Innova', rate: 22, status: 'available' },
      { type: '12-Seater Tempo', model: 'Force Traveller', rate: 28, status: 'available' }
    ]
  },
  {
    id: 20,
    name: 'Nainital Lake Tours',
    location: 'Uttarakhand',
    rating: 4.7,
    reviews: 128,
    experience: '8 years',
    price: 16000,
    specialties: ['Lake Tours', 'Hill Stations', 'Boating', 'Nature Walks'],
    image: '🏞️',
    description: 'Nainital specialist offering lake tours and hill station experiences.',
    type: 'agency',
    documents: ['Lake Tourism License', 'Boating Permits', 'Hill Station Registration'],
    packages: [
      {
        id: 1,
        name: 'Nainital Lake Paradise',
        duration: '3 Days / 2 Nights',
        price: 13000,
        description: 'Lake district tour with boating and scenic viewpoints',
        includes: ['Hotel Stay', 'Meals', 'Boating', 'Sightseeing', 'Cable Car']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Hyundai Verna', rate: 16, status: 'available' },
      { type: '6-Seater SUV', model: 'Mahindra Scorpio', rate: 20, status: 'available' }
    ]
  },
  {
    id: 21,
    name: 'Corbett Wildlife Safaris',
    location: 'Uttarakhand',
    rating: 4.6,
    reviews: 105,
    experience: '9 years',
    price: 17000,
    specialties: ['Wildlife Safari', 'Jim Corbett', 'Bird Watching', 'Nature Photography'],
    image: '🐅',
    description: 'Wildlife safari specialist for Jim Corbett National Park with expert naturalists.',
    type: 'agency',
    documents: ['Wildlife Safari License', 'Forest Permits', 'Naturalist Certifications'],
    packages: [
      {
        id: 1,
        name: 'Corbett Tiger Safari',
        duration: '2 Days / 1 Night',
        price: 14000,
        description: 'Wildlife safari with tiger spotting and bird watching',
        includes: ['Resort Stay', 'Meals', 'Safari Rides', 'Naturalist Guide', 'Park Entry']
      }
    ],
    vehicles: [
      { type: '6-Seater Safari Jeep', model: 'Mahindra Thar', rate: 25, status: 'available' },
      { type: '8-Seater Gypsy', model: 'Maruti Gypsy', rate: 22, status: 'available' }
    ]
  },
  // Tamil Nadu Agencies
  {
    id: 22,
    name: 'Temple Tours Tamil Nadu',
    location: 'Tamil Nadu',
    rating: 4.8,
    reviews: 189,
    experience: '14 years',
    price: 20000,
    specialties: ['Temple Tours', 'Heritage Sites', 'Classical Arts', 'Pilgrimage'],
    image: '🕉️',
    description: 'Specialized temple and heritage tours covering Tamil Nadu\'s ancient temples.',
    type: 'agency',
    documents: ['Temple Tourism License', 'Heritage Site Permits', 'Cultural Guide Certification'],
    packages: [
      {
        id: 1,
        name: 'Temple Circuit',
        duration: '5 Days / 4 Nights',
        price: 22000,
        description: 'Grand temple tour covering Madurai, Thanjavur, and Rameswaram',
        includes: ['Hotel Stay', 'All Meals', 'Temple Tours', 'Classical Dance Show', 'Guide']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Honda City', rate: 15, status: 'available' },
      { type: '7-Seater SUV', model: 'Toyota Innova', rate: 22, status: 'available' }
    ]
  },
  {
    id: 23,
    name: 'Chennai City Explorers',
    location: 'Tamil Nadu',
    rating: 4.6,
    reviews: 142,
    experience: '10 years',
    price: 14000,
    specialties: ['Chennai Tours', 'Marina Beach', 'Shopping', 'Food Tours'],
    image: '🏙️',
    description: 'Chennai city specialist offering cultural tours, shopping, and food experiences.',
    type: 'agency',
    documents: ['City Tourism License', 'Food Tour Permits', 'Shopping Guide Registration'],
    packages: [
      {
        id: 1,
        name: 'Chennai Heritage & Food',
        duration: '2 Days / 1 Night',
        price: 10000,
        description: 'City tour with heritage sites and authentic South Indian cuisine',
        includes: ['Hotel Stay', 'Meals', 'City Tour', 'Food Trail', 'Shopping Guide']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Maruti Ciaz', rate: 14, status: 'available' },
      { type: '6-Seater MPV', model: 'Maruti Ertiga', rate: 18, status: 'available' }
    ]
  },
  {
    id: 24,
    name: 'Ooty Hill Station Tours',
    location: 'Tamil Nadu',
    rating: 4.7,
    reviews: 126,
    experience: '9 years',
    price: 16000,
    specialties: ['Ooty Tours', 'Nilgiri Railway', 'Tea Gardens', 'Hill Stations'],
    image: '🚃',
    description: 'Ooty and Nilgiri hills specialist with toy train and tea plantation experiences.',
    type: 'agency',
    documents: ['Hill Station License', 'Railway Partnerships', 'Tea Estate Access'],
    packages: [
      {
        id: 1,
        name: 'Ooty Tea Trail',
        duration: '3 Days / 2 Nights',
        price: 14000,
        description: 'Hill station tour with toy train and tea garden visits',
        includes: ['Hotel Stay', 'Meals', 'Toy Train', 'Tea Factory', 'Sightseeing']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Hyundai Verna', rate: 15, status: 'available' },
      { type: '7-Seater SUV', model: 'Mahindra XUV', rate: 20, status: 'available' }
    ]
  },
  // Maharashtra Agencies
  {
    id: 25,
    name: 'Mumbai Magic Tours',
    location: 'Maharashtra',
    rating: 4.9,
    reviews: 215,
    experience: '15 years',
    price: 22000,
    specialties: ['Mumbai City', 'Bollywood', 'Street Food', 'Heritage Walks'],
    image: '🎬',
    description: 'Premier Mumbai tour operator with Bollywood studio tours and heritage walks.',
    type: 'agency',
    documents: ['Mumbai Tourism License', 'Bollywood Studio Access', 'Heritage Walk Permits'],
    packages: [
      {
        id: 1,
        name: 'Mumbai Bollywood Experience',
        duration: '2 Days / 1 Night',
        price: 15000,
        description: 'Bollywood studio tour with city sightseeing and street food',
        includes: ['Hotel Stay', 'Meals', 'Studio Tour', 'City Tour', 'Food Walk']
      }
    ],
    vehicles: [
      { type: '4-Seater Luxury Sedan', model: 'Mercedes C-Class', rate: 28, status: 'available' },
      { type: '7-Seater Premium SUV', model: 'Toyota Fortuner', rate: 32, status: 'available' }
    ]
  },
  {
    id: 26,
    name: 'Pune Heritage Trails',
    location: 'Maharashtra',
    rating: 4.7,
    reviews: 156,
    experience: '11 years',
    price: 17000,
    specialties: ['Pune Tours', 'Fort Tours', 'Maratha History', 'Cultural Experiences'],
    image: '🏛️',
    description: 'Pune and Maratha heritage specialist with fort tours and cultural programs.',
    type: 'agency',
    documents: ['Heritage Tourism License', 'Fort Access Permits', 'Cultural Program Rights'],
    packages: [
      {
        id: 1,
        name: 'Maratha Heritage',
        duration: '3 Days / 2 Nights',
        price: 15000,
        description: 'Historical tour covering Pune forts and Maratha heritage sites',
        includes: ['Hotel Stay', 'Meals', 'Fort Tours', 'Museum Visits', 'Guide']
      }
    ],
    vehicles: [
      { type: '4-Seater Sedan', model: 'Honda City', rate: 16, status: 'available' },
      { type: '7-Seater SUV', model: 'Toyota Innova', rate: 24, status: 'available' }
    ]
  },
  {
    id: 27,
    name: 'Lonavala Getaways',
    location: 'Maharashtra',
    rating: 4.6,
    reviews: 132,
    experience: '8 years',
    price: 13000,
    specialties: ['Hill Stations', 'Waterfalls', 'Trekking', 'Monsoon Tours'],
    image: '🌄',
    description: 'Western Ghats specialist offering monsoon treks and waterfall tours.',
    type: 'agency',
    documents: ['Hill Station License', 'Trekking Permits', 'Safety Certifications'],
    packages: [
      {
        id: 1,
        name: 'Monsoon Magic',
        duration: '2 Days / 1 Night',
        price: 10000,
        description: 'Lonavala-Khandala tour with waterfalls and scenic viewpoints',
        includes: ['Hotel Stay', 'Meals', 'Sightseeing', 'Trek Guide', 'Transport']
      }
    ],
    vehicles: [
      { type: '4-Seater Hatchback', model: 'Maruti Swift', rate: 12, status: 'available' },
      { type: '6-Seater SUV', model: 'Mahindra Scorpio', rate: 18, status: 'available' }
    ]
  }
]

export const destinations = [
  {
    id: 1,
    name: 'Goa',
    state: 'Goa',
    description: 'India\'s beach paradise with vibrant nightlife, Portuguese heritage, and stunning coastline',
    image: '🌴',
    guides: [2, 3, 6, 7],
    agencies: [4, 5],
    attractions: [
      // North Goa Beaches
      'Baga Beach', 'Calangute Beach', 'Anjuna Beach', 'Vagator Beach', 'Morjim Beach', 'Arambol Beach',
      // South Goa Beaches  
      'Palolem Beach', 'Colva Beach', 'Benaulim Beach', 'Varca Beach', 'Cavelossim Beach',
      // Heritage & Culture
      'Old Goa Churches', 'Basilica of Bom Jesus', 'Se Cathedral', 'Fort Aguada', 'Chapora Fort',
      // Nature & Adventure
      'Dudhsagar Falls', 'Spice Plantations', 'Bhagwan Mahavir Wildlife Sanctuary', 'Salim Ali Bird Sanctuary',
      // Markets & Shopping
      'Anjuna Flea Market', 'Mapusa Market', 'Saturday Night Market', 'Panaji Market',
      // Nightlife & Entertainment
      'Tito\'s Lane', 'Club Cubana', 'LPK Waterfront', 'Shiva Valley', 'Curlies Beach Shack'
    ],
    beaches: {
      north: [
        { name: 'Baga Beach', type: 'Party Beach', activities: ['Water Sports', 'Nightlife', 'Restaurants'] },
        { name: 'Calangute Beach', type: 'Family Beach', activities: ['Swimming', 'Shopping', 'Food Stalls'] },
        { name: 'Anjuna Beach', type: 'Hippie Beach', activities: ['Flea Market', 'Trance Parties', 'Cliff Views'] },
        { name: 'Vagator Beach', type: 'Scenic Beach', activities: ['Sunset Views', 'Photography', 'Cafes'] },
        { name: 'Arambol Beach', type: 'Bohemian Beach', activities: ['Yoga', 'Live Music', 'Drum Circle'] }
      ],
      south: [
        { name: 'Palolem Beach', type: 'Paradise Beach', activities: ['Kayaking', 'Dolphin Spotting', 'Beach Huts'] },
        { name: 'Colva Beach', type: 'Peaceful Beach', activities: ['Relaxation', 'Local Food', 'Church Visits'] },
        { name: 'Benaulim Beach', type: 'Quiet Beach', activities: ['Fishing', 'Beach Walks', 'Local Culture'] }
      ]
    },
    heritage: [
      { name: 'Old Goa', type: 'UNESCO World Heritage', highlights: ['Basilica of Bom Jesus', 'Se Cathedral', 'Archaeological Museum'] },
      { name: 'Fort Aguada', type: 'Portuguese Fort', highlights: ['Lighthouse', 'Prison', 'Beach Views'] },
      { name: 'Fontainhas', type: 'Latin Quarter', highlights: ['Portuguese Architecture', 'Art Galleries', 'Cafes'] }
    ]
  }
]

export const bookings = [
  {
    id: 1,
    userId: 1,
    providerId: 2,
    providerType: 'guide',
    destination: 'Goa',
    date: '2024-01-20',
    duration: '1 day',
    people: 2,
    amount: 5000,
    advanceAmount: 1500,
    status: 'confirmed',
    createdAt: '2024-01-10',
    specialRequests: 'Water sports and Portuguese heritage tour'
  },
  {
    id: 2,
    userId: 1,
    providerId: 4,
    providerType: 'agency',
    destination: 'Goa',
    date: '2024-02-05',
    duration: '4 days',
    people: 4,
    amount: 72000,
    advanceAmount: 21600,
    status: 'pending',
    createdAt: '2024-01-12',
    packageId: 1,
    specialRequests: 'Beach resort with sea view rooms'
  },
  {
    id: 3,
    userId: 1,
    providerId: 3,
    providerType: 'guide',
    destination: 'Goa',
    date: '2024-01-25',
    duration: '1 day',
    people: 3,
    amount: 6600,
    advanceAmount: 1980,
    status: 'completed',
    createdAt: '2024-01-15',
    specialRequests: 'Food tour and local market visit'
  },
  // New request-based bookings for current user flow
  {
    id: 4,
    userId: 1,
    providerId: 8,
    providerType: 'guide',
    destination: 'Visakhapatnam',
    places: ['rk-beach', 'kailasagiri', 'araku-valley'],
    placeNames: ['RK Beach', 'Kailasagiri', 'Araku Valley'],
    date: '2024-01-25',
    duration: '3 days',
    people: 2,
    status: 'pending_acceptance',
    createdAt: '2024-01-18',
    isDestinationWide: true,
    costBreakdown: {
      guideCost: 6000,
      agencyCost: 0,
      platformFee: 300,
      totalCost: 6300
    }
  },
  {
    id: 5,
    userId: 1,
    providerId: 6,
    providerType: 'agency',
    destination: 'Visakhapatnam',
    places: ['rk-beach', 'submarine-museum'],
    placeNames: ['RK Beach', 'Submarine Museum'],
    date: '2024-01-28',
    duration: '2 days',
    people: 3,
    status: 'accepted',
    createdAt: '2024-01-19',
    acceptedAt: '2024-01-20',
    isDestinationWide: true,
    costBreakdown: {
      guideCost: 0,
      agencyCost: 12000,
      platformFee: 600,
      totalCost: 12600
    }
  },
  {
    id: 6,
    userId: 1,
    providerId: 2,
    providerType: 'guide',
    destination: 'Goa',
    places: ['baga-beach', 'anjuna-beach'],
    placeNames: ['Baga Beach', 'Anjuna Beach'],
    date: '2024-02-01',
    duration: '2 days',
    people: 2,
    status: 'pending_acceptance',
    createdAt: '2024-01-20',
    isDestinationWide: true,
    costBreakdown: {
      guideCost: 5000,
      agencyCost: 0,
      platformFee: 250,
      totalCost: 5250
    }
  }
]

export const reviews = [
  {
    id: 1,
    userId: 1,
    providerId: 2,
    providerType: 'guide',
    rating: 5,
    comment: 'Carlos was amazing! He showed us the best beaches and taught us about Portuguese heritage. The water sports were thrilling!',
    date: '2024-01-21'
  },
  {
    id: 2,
    userId: 1,
    providerId: 3,
    providerType: 'guide',
    rating: 5,
    comment: 'Maria\'s food tour was incredible! We tried authentic Goan cuisine and visited local markets. Highly recommended!',
    date: '2024-01-26'
  },
  {
    id: 3,
    userId: 1,
    providerId: 4,
    providerType: 'agency',
    rating: 4,
    comment: 'Great service from Goa Adventures. The beach resort was beautiful and water sports were well organized.',
    date: '2024-02-08'
  }
]
