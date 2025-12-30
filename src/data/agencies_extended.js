// Extended agencies data for all 8 locations
export const extendedAgencies = [
  // Goa Agencies (existing + 1 more)
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
  // Visakhapatnam Agencies
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
