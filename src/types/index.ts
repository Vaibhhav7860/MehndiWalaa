// ─── Artist Types ────────────────────────────────────────────
export interface Artist {
  id: string;
  name: string;
  slug: string;
  profileImage: string;
  coverImage: string;
  city: string;
  state: string;
  locality: string;
  phone: string;
  whatsapp: string;
  email: string;
  bio: string;
  experience: number;
  teamSize: number;
  languages: string[];
  designStyles: DesignStyle[];
  occasions: OccasionType[];
  priceRange: PriceRange;
  services: Service[];
  portfolio: PortfolioImage[];
  albums: Album[];
  youtubeVideos: string[];
  reviews: Review[];
  rating: number;
  totalBookings: number;
  repeatClientPercent: number;
  responseTime: string;
  platformSince: string;
  isVerified: boolean;
  isRecommended: boolean;
  isEmergencyAvailable: boolean;
  trialSessionEnabled: boolean;
  trialPrice: number | null;
  availability: AvailabilityDay[];
  profileCompletion: number;
  totalEarnings: number;
  walletBalance: number;
  membershipPlan: MembershipPlan;
  weeklyViews: number;
  faqs: FAQ[];
  cancellationPolicy: string;
}

export type DesignStyle =
  | 'Bridal'
  | 'Arabic'
  | 'Rajasthani'
  | 'Indo-Western'
  | 'Minimalist'
  | 'Jaali'
  | 'Moroccan'
  | 'Floral'
  | 'Portrait'
  | 'Mandala'
  | 'Traditional';

export type OccasionType =
  | 'Wedding'
  | 'Engagement'
  | 'Karva Chauth'
  | 'Eid'
  | 'Teej'
  | 'Diwali'
  | 'Baby Shower'
  | 'Festival'
  | 'Party'
  | 'Corporate Event';

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: PriceRange;
  duration: string;
  designCategory: DesignStyle;
}

export interface PortfolioImage {
  id: string;
  url: string;
  caption: string;
  category: DesignStyle;
  occasion: OccasionType;
  isApproved: boolean;
}

export interface Album {
  id: string;
  title: string;
  images: PortfolioImage[];
  priceRange: PriceRange;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  text: string;
  photos: string[];
  occasion: OccasionType;
  date: string;
  isVerified: boolean;
}

export interface AvailabilityDay {
  date: string;
  status: 'available' | 'booked' | 'blocked';
}

export type MembershipPlan = 'free' | 'silver' | 'gold' | 'platinum';

export interface FAQ {
  question: string;
  answer: string;
}

// ─── User Types ─────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  phone: string;
  city: string;
  image: string;
  role: 'customer' | 'artist' | 'admin' | 'sub-admin';
  shortlistedArtists: string[];
  moodBoard: MoodBoardItem[];
  bookings: Booking[];
}

export interface MoodBoardItem {
  id: string;
  imageUrl: string;
  occasion: OccasionType;
  notes: string;
  artistId?: string;
  savedAt: string;
}

// ─── Booking Types ──────────────────────────────────────────
export type BookingStatus =
  | 'enquiry_sent'
  | 'contacted'
  | 'booking_confirmed'
  | 'service_in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  userId: string;
  artistId: string;
  artistName: string;
  status: BookingStatus;
  occasion: OccasionType;
  serviceDate: string;
  bookingDate: string;
  designCategory: DesignStyle;
  numberOfPersons: number;
  totalAmount: number;
  advancePaid: number;
  remainingAmount: number;
  duration: string;
  notes: string;
  address: string;
  timeline: BookingTimelineEntry[];
}

export interface BookingTimelineEntry {
  status: BookingStatus;
  timestamp: string;
  note?: string;
}

// ─── Lead Types ─────────────────────────────────────────────
export interface Lead {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  artistId: string;
  occasion: OccasionType;
  eventDate: string;
  message: string;
  budget: string;
  city: string;
  status: 'new' | 'unlocked' | 'contacted' | 'converted' | 'fake';
  createdAt: string;
  isUrgent: boolean;
}

// ─── Chat Types ─────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  images: string[];
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'mood-board' | 'system';
}

export interface ChatThread {
  id: string;
  participants: string[];
  artistName: string;
  artistImage: string;
  lastMessage: ChatMessage;
  unreadCount: number;
  bookingId?: string;
}

// ─── Invoice Types ──────────────────────────────────────────
export interface Invoice {
  id: string;
  invoiceNumber: string;
  artistId: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  occasion: OccasionType;
  bookingDate: string;
  serviceDate: string;
  serviceTime: string;
  designCategory: DesignStyle;
  numberOfPersons: number;
  totalAmount: number;
  advanceReceived: number;
  remainingAmount: number;
  duration: string;
  notes: string;
  status: 'provisional' | 'final';
  createdAt: string;
}

// ─── Wallet Types ───────────────────────────────────────────
export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: string;
  balance: number;
}

// ─── Notification Types ─────────────────────────────────────
export interface Notification {
  id: string;
  type: 'lead' | 'booking' | 'review' | 'wallet' | 'system' | 'festival' | 'approval';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  icon: string;
}

// ─── Store Types ────────────────────────────────────────────
export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'cones' | 'oils' | 'tools' | 'accessories' | 'kits';
  inStock: boolean;
  rating: number;
  reviews: number;
}

// ─── Admin Types ────────────────────────────────────────────
export interface AdminStats {
  totalArtists: number;
  pendingApprovals: number;
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  dau: number;
  mau: number;
  conversionRate: number;
  topCities: { city: string; count: number }[];
  topArtists: { name: string; bookings: number }[];
}

export interface ContentModerationItem {
  id: string;
  artistId: string;
  artistName: string;
  type: 'image' | 'video';
  url: string;
  category: DesignStyle;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

// ─── Filter Types ───────────────────────────────────────────
export interface ArtistFilters {
  city: string;
  locality: string;
  minBudget: number;
  maxBudget: number;
  designStyles: DesignStyle[];
  occasions: OccasionType[];
  languages: string[];
  trialAvailable: boolean;
  emergencyAvailable: boolean;
  minRating: number;
  teamSize: string;
  experience: string;
  sortBy: 'rating' | 'price_low' | 'price_high' | 'bookings' | 'response_time';
}

// ─── City/Location Types ────────────────────────────────────
export interface City {
  name: string;
  state: string;
  slug: string;
  localities: string[];
  artistCount: number;
  averagePrice: number;
}
