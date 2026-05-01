import { Artist, Review, Booking, Lead, ChatThread, StoreProduct, Notification, City, ContentModerationItem } from '@/types';

const IMG = '/images/hero-mehndi.png';

function makeArtist(id: string, name: string, city: string, state: string, locality: string, rating: number, price: [number,number], styles: string[], exp: number, verified: boolean, recommended: boolean, emergency: boolean, trial: boolean, trialPrice: number|null, bookings: number, team: number): Artist {
  return {
    id, name, slug: name.toLowerCase().replace(/\s+/g,'-'), profileImage: IMG, coverImage: IMG,
    city, state, locality, phone: '+91 98765 43210', whatsapp: '+91 98765 43210', email: `${id}@mehndiwala.com`,
    bio: `${name} is a talented mehndi artist based in ${locality}, ${city} with ${exp} years of experience specializing in ${styles.join(', ')} designs. Known for intricate detailing and customer satisfaction.`,
    experience: exp, teamSize: team, languages: ['Hindi','English'],
    designStyles: styles as Artist['designStyles'], occasions: ['Wedding','Engagement','Karva Chauth','Eid'] as Artist['occasions'],
    priceRange: { min: price[0], max: price[1], currency: 'INR' },
    services: [
      { id: `${id}-s1`, name: 'Bridal Mehndi', description: 'Full bridal mehndi for both hands and feet', priceRange: { min: price[0], max: price[1], currency: 'INR' }, duration: '3-5 hours', designCategory: styles[0] as Artist['designStyles'][0] },
      { id: `${id}-s2`, name: 'Guest Mehndi', description: 'Beautiful designs for wedding guests', priceRange: { min: 500, max: 2000, currency: 'INR' }, duration: '30-60 min', designCategory: styles[0] as Artist['designStyles'][0] },
    ],
    portfolio: Array.from({length:8},(_,i)=>({ id:`${id}-p${i}`, url:IMG, caption:`${styles[i%styles.length]} design`, category:styles[i%styles.length] as Artist['designStyles'][0], occasion:'Wedding' as const, isApproved:true })),
    albums: [{ id:`${id}-a1`, title:'Bridal Collection', images:[], priceRange:{min:price[0],max:price[1],currency:'INR'} }],
    youtubeVideos: ['https://youtube.com/watch?v=dQw4w9WgXcQ'],
    reviews: [], rating, totalBookings: bookings, repeatClientPercent: 40+Math.floor(Math.random()*40),
    responseTime: ['< 30 min','< 1 hour','< 2 hours'][Math.floor(Math.random()*3)],
    platformSince: '2024-0' + (1+Math.floor(Math.random()*9)) + '-01',
    isVerified: verified, isRecommended: recommended, isEmergencyAvailable: emergency,
    trialSessionEnabled: trial, trialPrice,
    availability: Array.from({length:30},(_,i)=>{const d=new Date();d.setDate(d.getDate()+i);return{date:d.toISOString().split('T')[0],status:(['available','available','available','booked','blocked'] as const)[Math.floor(Math.random()*5)]}}),
    profileCompletion: 85+Math.floor(Math.random()*16), totalEarnings: bookings*price[0],
    walletBalance: 500+Math.floor(Math.random()*5000),
    membershipPlan: (['silver','gold','platinum'] as const)[Math.floor(Math.random()*3)],
    weeklyViews: 50+Math.floor(Math.random()*500),
    faqs: [{ question:'How far in advance should I book?', answer:'We recommend booking at least 2-3 weeks in advance for bridal mehndi.' }, { question:'Do you travel to the venue?', answer:'Yes, we provide doorstep service across '+city+'.' }],
    cancellationPolicy: 'Free cancellation up to 48 hours before the service. 50% charge for cancellations within 48 hours.',
  };
}

export const artists: Artist[] = [
  makeArtist('a1','Priya Sharma','Delhi','Delhi','South Delhi',4.9,[8000,25000],['Bridal','Rajasthani','Traditional'],12,true,true,false,true,1500,340,4),
  makeArtist('a2','Fatima Khan','Mumbai','Maharashtra','Bandra',4.8,[10000,35000],['Arabic','Moroccan','Bridal'],15,true,true,true,true,2000,520,6),
  makeArtist('a3','Ananya Joshi','Jaipur','Rajasthan','C-Scheme',4.7,[5000,18000],['Rajasthani','Traditional','Mandala'],8,true,false,false,true,1000,210,3),
  makeArtist('a4','Meera Patel','Ahmedabad','Gujarat','Navrangpura',4.6,[4000,15000],['Floral','Minimalist','Indo-Western'],6,true,false,true,false,null,180,2),
  makeArtist('a5','Sana Mirza','Hyderabad','Telangana','Banjara Hills',4.8,[7000,22000],['Arabic','Jaali','Portrait'],10,true,true,false,true,1200,290,3),
  makeArtist('a6','Kavita Verma','Lucknow','Uttar Pradesh','Gomti Nagar',4.5,[3000,12000],['Traditional','Bridal','Floral'],5,true,false,false,false,null,120,2),
  makeArtist('a7','Ritu Agarwal','Kolkata','West Bengal','Park Street',4.7,[6000,20000],['Bridal','Arabic','Mandala'],9,true,false,true,true,800,250,3),
  makeArtist('a8','Nisha Reddy','Bangalore','Karnataka','Koramangala',4.6,[8000,28000],['Indo-Western','Minimalist','Floral'],7,true,true,false,true,1500,200,4),
  makeArtist('a9','Pooja Choudhary','Pune','Maharashtra','Kothrud',4.4,[3500,14000],['Traditional','Rajasthani','Bridal'],4,false,false,false,false,null,95,1),
  makeArtist('a10','Zara Sheikh','Delhi','Delhi','Dwarka',4.9,[12000,40000],['Bridal','Arabic','Portrait','Jaali'],18,true,true,true,true,2500,680,8),
  makeArtist('a11','Sunita Kumari','Chennai','Tamil Nadu','T Nagar',4.3,[3000,10000],['Floral','Minimalist','Traditional'],3,true,false,false,false,null,65,1),
  makeArtist('a12','Deepika Malhotra','Jaipur','Rajasthan','Malviya Nagar',4.8,[6000,20000],['Rajasthani','Mandala','Traditional'],11,true,true,false,true,1000,310,4),
  makeArtist('a13','Ayesha Siddiqui','Lucknow','Uttar Pradesh','Hazratganj',4.5,[4500,16000],['Arabic','Moroccan','Bridal'],7,true,false,true,true,900,150,2),
  makeArtist('a14','Lakshmi Iyer','Mumbai','Maharashtra','Andheri',4.6,[5000,18000],['Bridal','Floral','Indo-Western'],6,true,false,false,false,null,170,2),
  makeArtist('a15','Rekha Devi','Delhi','Delhi','Rohini',4.2,[2000,8000],['Traditional','Floral','Minimalist'],3,false,false,true,false,null,55,1),
  makeArtist('a16','Bhavna Shah','Ahmedabad','Gujarat','Satellite',4.7,[5500,19000],['Bridal','Rajasthani','Jaali'],9,true,true,false,true,1200,240,3),
  makeArtist('a17','Simran Kaur','Delhi','Delhi','Punjabi Bagh',4.8,[9000,30000],['Bridal','Portrait','Arabic'],13,true,true,true,true,2000,420,5),
  makeArtist('a18','Tanvi Deshmukh','Pune','Maharashtra','Viman Nagar',4.5,[4000,15000],['Minimalist','Indo-Western','Floral'],5,true,false,false,true,700,130,2),
  makeArtist('a19','Heena Begum','Hyderabad','Telangana','Jubilee Hills',4.9,[11000,38000],['Arabic','Bridal','Jaali','Portrait'],16,true,true,false,true,2200,490,6),
  makeArtist('a20','Swati Pandey','Kolkata','West Bengal','Salt Lake',4.4,[3500,12000],['Traditional','Mandala','Floral'],4,true,false,false,false,null,100,2),
];

// Generate reviews for each artist
artists.forEach(a => {
  a.reviews = Array.from({length: 3+Math.floor(Math.random()*5)}, (_, i) => ({
    id: `${a.id}-r${i}`, userId: `u${i}`, userName: ['Neha M.','Roshni K.','Anjali S.','Priyanka T.','Divya R.','Sakshi G.','Tanya B.','Monika V.'][i%8],
    userImage: IMG, rating: 4+Math.random(), text: ['Absolutely stunning bridal mehndi! Every guest complimented the design.','Beautiful work, very professional and on time. Highly recommend!','Amazing detail and patience. Made my wedding day special!','Loved the Arabic design. Will book again for Karva Chauth!','Very creative and unique designs. Great experience overall.','Professional, punctual, and talented. The mehndi lasted for weeks!','Best mehndi artist in the city! The bridal design was breathtaking.','Wonderful experience. She understood exactly what I wanted.'][i%8],
    photos: [IMG], occasion: (['Wedding','Engagement','Karva Chauth','Eid'] as const)[i%4],
    date: new Date(Date.now()-i*7*24*60*60*1000).toISOString(), isVerified: true,
  }));
});

export const mockReviews: Review[] = artists.flatMap(a => a.reviews);

export const mockBookings: Booking[] = [
  { id:'b1',userId:'u1',artistId:'a1',artistName:'Priya Sharma',status:'completed',occasion:'Wedding',serviceDate:'2026-04-15',bookingDate:'2026-03-20',designCategory:'Bridal',numberOfPersons:1,totalAmount:18000,advancePaid:5000,remainingAmount:13000,duration:'4 hours',notes:'Full bridal mehndi with groom name hidden',address:'B-42, Greater Kailash, Delhi',timeline:[{status:'enquiry_sent',timestamp:'2026-03-20T10:00:00Z'},{status:'contacted',timestamp:'2026-03-20T12:00:00Z'},{status:'booking_confirmed',timestamp:'2026-03-21T09:00:00Z'},{status:'service_in_progress',timestamp:'2026-04-15T10:00:00Z'},{status:'completed',timestamp:'2026-04-15T14:00:00Z'}]},
  { id:'b2',userId:'u1',artistId:'a5',artistName:'Sana Mirza',status:'booking_confirmed',occasion:'Engagement',serviceDate:'2026-05-20',bookingDate:'2026-04-28',designCategory:'Arabic',numberOfPersons:2,totalAmount:14000,advancePaid:4000,remainingAmount:10000,duration:'3 hours',notes:'Arabic design for bride and mother',address:'Road No 12, Banjara Hills, Hyderabad',timeline:[{status:'enquiry_sent',timestamp:'2026-04-28T10:00:00Z'},{status:'contacted',timestamp:'2026-04-28T11:30:00Z'},{status:'booking_confirmed',timestamp:'2026-04-29T09:00:00Z'}]},
  { id:'b3',userId:'u1',artistId:'a10',artistName:'Zara Sheikh',status:'enquiry_sent',occasion:'Wedding',serviceDate:'2026-06-15',bookingDate:'2026-04-30',designCategory:'Bridal',numberOfPersons:1,totalAmount:35000,advancePaid:0,remainingAmount:35000,duration:'5 hours',notes:'Premium bridal with portrait',address:'D-15, Dwarka Sector 6, Delhi',timeline:[{status:'enquiry_sent',timestamp:'2026-04-30T14:00:00Z'}]},
];

export const mockLeads: Lead[] = [
  { id:'l1',userId:'u1',userName:'Neha Mehra',userPhone:'+91 99876 54321',artistId:'a1',occasion:'Wedding',eventDate:'2026-06-10',message:'Looking for bridal mehndi for my wedding. Want full hands and feet with traditional Rajasthani design.',budget:'₹15,000 - ₹25,000',city:'Delhi',status:'new',createdAt:'2026-04-30T09:00:00Z',isUrgent:false},
  { id:'l2',userId:'u2',userName:'Roshni Kapoor',userPhone:'+91 88765 43210',artistId:'a1',occasion:'Karva Chauth',eventDate:'2026-10-22',message:'Need mehndi for Karva Chauth celebration.',budget:'₹3,000 - ₹5,000',city:'Delhi',status:'unlocked',createdAt:'2026-04-29T15:00:00Z',isUrgent:false},
  { id:'l3',userId:'u3',userName:'Anjali Singh',userPhone:'+91 77654 32109',artistId:'a1',occasion:'Wedding',eventDate:'2026-05-05',message:'URGENT - Need mehndi artist for day after tomorrow! Bridal mehndi for hands.',budget:'₹10,000 - ₹20,000',city:'Delhi',status:'new',createdAt:'2026-04-30T18:00:00Z',isUrgent:true},
  { id:'l4',userId:'u4',userName:'Priyanka Thakur',userPhone:'+91 66543 21098',artistId:'a2',occasion:'Engagement',eventDate:'2026-05-25',message:'Arabic mehndi for engagement ceremony. 3 people.',budget:'₹8,000 - ₹15,000',city:'Mumbai',status:'new',createdAt:'2026-04-30T11:00:00Z',isUrgent:false},
  { id:'l5',userId:'u5',userName:'Divya Rajput',userPhone:'+91 55432 10987',artistId:'a2',occasion:'Wedding',eventDate:'2026-07-20',message:'Premium bridal mehndi with Moroccan elements.',budget:'₹20,000 - ₹35,000',city:'Mumbai',status:'contacted',createdAt:'2026-04-28T09:00:00Z',isUrgent:false},
];

export const mockChatThreads: ChatThread[] = [
  { id:'c1',participants:['u1','a1'],artistName:'Priya Sharma',artistImage:IMG,lastMessage:{id:'m3',senderId:'a1',receiverId:'u1',text:'Sure! I can do a traditional Rajasthani design with modern elements. Let me share some options.',images:[],timestamp:'2026-04-30T10:30:00Z',isRead:true,type:'text'},unreadCount:0,bookingId:'b1'},
  { id:'c2',participants:['u1','a5'],artistName:'Sana Mirza',artistImage:IMG,lastMessage:{id:'m5',senderId:'u1',receiverId:'a5',text:'Can you share your Arabic bridal portfolio?',images:[],timestamp:'2026-04-30T14:00:00Z',isRead:false,type:'text'},unreadCount:1,bookingId:'b2'},
];

export const mockNotifications: Notification[] = [
  { id:'n1',type:'lead',title:'New Lead Received',message:'Neha Mehra is looking for bridal mehndi in Delhi',timestamp:'2026-04-30T09:00:00Z',isRead:false,actionUrl:'/artist-dashboard/enquiries',icon:'sparkles'},
  { id:'n2',type:'booking',title:'Booking Confirmed',message:'Your booking with Sana Mirza for May 20 is confirmed',timestamp:'2026-04-29T09:00:00Z',isRead:true,actionUrl:'/dashboard/bookings',icon:'calendar'},
  { id:'n3',type:'festival',title:'🎉 Karva Chauth Alert',message:'Karva Chauth is 174 days away! Update your availability and boost your profile.',timestamp:'2026-04-28T10:00:00Z',isRead:false,actionUrl:'/artist-dashboard/calendar',icon:'star'},
  { id:'n4',type:'review',title:'New Review',message:'Roshni K. left a 5-star review for your service',timestamp:'2026-04-27T16:00:00Z',isRead:true,actionUrl:'/artist-dashboard/reviews',icon:'message-circle'},
  { id:'n5',type:'wallet',title:'Low Balance Warning',message:'Your wallet balance is below ₹250. Recharge now to keep receiving leads.',timestamp:'2026-04-26T09:00:00Z',isRead:false,actionUrl:'/artist-dashboard/earnings',icon:'wallet'},
];

export const mockStoreProducts: StoreProduct[] = [
  { id:'sp1',name:'Premium Rajasthani Henna Cones (Pack of 12)',description:'Natural, organic henna cones for deep, long-lasting color.',price:450,image:IMG,category:'cones',inStock:true,rating:4.8,reviews:234},
  { id:'sp2',name:'Eucalyptus Mehndi Aftercare Oil',description:'Essential oil blend for darkening mehndi color naturally.',price:299,image:IMG,category:'oils',inStock:true,rating:4.6,reviews:156},
  { id:'sp3',name:'Professional Mehndi Applicator Set',description:'Precision tips and bottles for detailed mehndi application.',price:599,image:IMG,category:'tools',inStock:true,rating:4.7,reviews:89},
  { id:'sp4',name:'Mehndi Design Stencil Kit (50 Designs)',description:'Reusable stencils for popular bridal and Arabic patterns.',price:799,image:IMG,category:'accessories',inStock:true,rating:4.5,reviews:67},
  { id:'sp5',name:'Complete Bridal Mehndi Kit',description:'Everything needed for professional bridal mehndi application.',price:1499,image:IMG,category:'kits',inStock:false,rating:4.9,reviews:312},
  { id:'sp6',name:'Natural Black Henna Cones (Pack of 6)',description:'Chemical-free black henna for stunning contrast designs.',price:350,image:IMG,category:'cones',inStock:true,rating:4.4,reviews:198},
];

export const mockCities: City[] = [
  { name:'Delhi',state:'Delhi',slug:'delhi',localities:['South Delhi','Dwarka','Rohini','Punjabi Bagh','Karol Bagh'],artistCount:45,averagePrice:12000},
  { name:'Mumbai',state:'Maharashtra',slug:'mumbai',localities:['Bandra','Andheri','Juhu','Dadar','Colaba'],artistCount:38,averagePrice:15000},
  { name:'Jaipur',state:'Rajasthan',slug:'jaipur',localities:['C-Scheme','Malviya Nagar','Vaishali Nagar','Mansarovar'],artistCount:32,averagePrice:8000},
  { name:'Hyderabad',state:'Telangana',slug:'hyderabad',localities:['Banjara Hills','Jubilee Hills','Madhapur','Gachibowli'],artistCount:25,averagePrice:10000},
  { name:'Lucknow',state:'Uttar Pradesh',slug:'lucknow',localities:['Gomti Nagar','Hazratganj','Aliganj','Indira Nagar'],artistCount:20,averagePrice:6000},
  { name:'Bangalore',state:'Karnataka',slug:'bangalore',localities:['Koramangala','Indiranagar','HSR Layout','Whitefield'],artistCount:22,averagePrice:12000},
  { name:'Kolkata',state:'West Bengal',slug:'kolkata',localities:['Park Street','Salt Lake','New Town','Ballygunge'],artistCount:18,averagePrice:7000},
  { name:'Pune',state:'Maharashtra',slug:'pune',localities:['Kothrud','Viman Nagar','Hinjewadi','Baner'],artistCount:15,averagePrice:8000},
  { name:'Ahmedabad',state:'Gujarat',slug:'ahmedabad',localities:['Navrangpura','Satellite','Prahlad Nagar','Bopal'],artistCount:14,averagePrice:7500},
  { name:'Chennai',state:'Tamil Nadu',slug:'chennai',localities:['T Nagar','Adyar','Anna Nagar','Velachery'],artistCount:12,averagePrice:6500},
];

export const mockContentModeration: ContentModerationItem[] = [
  { id:'cm1',artistId:'a9',artistName:'Pooja Choudhary',type:'image',url:IMG,category:'Bridal',submittedAt:'2026-04-30T08:00:00Z',status:'pending'},
  { id:'cm2',artistId:'a15',artistName:'Rekha Devi',type:'image',url:IMG,category:'Traditional',submittedAt:'2026-04-30T09:00:00Z',status:'pending'},
  { id:'cm3',artistId:'a11',artistName:'Sunita Kumari',type:'image',url:IMG,category:'Floral',submittedAt:'2026-04-29T14:00:00Z',status:'pending'},
  { id:'cm4',artistId:'a20',artistName:'Swati Pandey',type:'image',url:IMG,category:'Mandala',submittedAt:'2026-04-29T11:00:00Z',status:'approved'},
];

export const mockAdminStats = {
  totalArtists:142,pendingApprovals:8,totalUsers:12450,totalBookings:3280,totalRevenue:4850000,dau:1250,mau:8900,conversionRate:12.5,
  topCities:[{city:'Delhi',count:45},{city:'Mumbai',count:38},{city:'Jaipur',count:32},{city:'Hyderabad',count:25},{city:'Lucknow',count:20}],
  topArtists:[{name:'Zara Sheikh',bookings:680},{name:'Fatima Khan',bookings:520},{name:'Heena Begum',bookings:490},{name:'Simran Kaur',bookings:420},{name:'Priya Sharma',bookings:340}],
};
