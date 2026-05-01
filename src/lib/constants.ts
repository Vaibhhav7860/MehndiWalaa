export const SITE_NAME = 'MehndiWalaa';
export const SITE_TAGLINE = "India's Premier Mehndi Artist Discovery & Booking Platform";
export const SITE_DESCRIPTION = 'Find and book verified mehndi artists near you. Browse portfolios, compare prices, and book trusted henna artists for weddings, festivals, and special occasions.';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Find Artists', href: '/artists' },
  { label: 'Design Inspiration', href: '/#inspiration' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'For Artists', href: '/artist-register' },
];

export const DESIGN_STYLES = ['Bridal','Arabic','Rajasthani','Indo-Western','Minimalist','Jaali','Moroccan','Floral','Portrait','Mandala','Traditional'] as const;
export const OCCASIONS = ['Wedding','Engagement','Karva Chauth','Eid','Teej','Diwali','Baby Shower','Festival','Party','Corporate Event'] as const;
export const LANGUAGES = ['Hindi','English','Marathi','Bengali','Tamil','Telugu','Gujarati','Punjabi','Urdu','Kannada'] as const;

export const CITIES = [
  { name: 'Delhi', state: 'Delhi', slug: 'delhi' },
  { name: 'Mumbai', state: 'Maharashtra', slug: 'mumbai' },
  { name: 'Jaipur', state: 'Rajasthan', slug: 'jaipur' },
  { name: 'Lucknow', state: 'Uttar Pradesh', slug: 'lucknow' },
  { name: 'Hyderabad', state: 'Telangana', slug: 'hyderabad' },
  { name: 'Bangalore', state: 'Karnataka', slug: 'bangalore' },
  { name: 'Kolkata', state: 'West Bengal', slug: 'kolkata' },
  { name: 'Chennai', state: 'Tamil Nadu', slug: 'chennai' },
  { name: 'Pune', state: 'Maharashtra', slug: 'pune' },
  { name: 'Ahmedabad', state: 'Gujarat', slug: 'ahmedabad' },
];

export const FESTIVALS = [
  { name: 'Karva Chauth', date: '2026-10-22', daysUntil: 174 },
  { name: 'Diwali', date: '2026-11-08', daysUntil: 191 },
  { name: 'Eid ul-Fitr', date: '2027-03-21', daysUntil: 324 },
  { name: 'Teej', date: '2026-08-12', daysUntil: 103 },
  { name: 'Navratri', date: '2026-10-15', daysUntil: 167 },
];
