interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string | null;
  bio?: string | null;
  location?: string | null;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  badges: Badge[];
  courses: Course[];
  reviews: Review[];
  events: Event[];
  bookings: Booking[];
  communityPosts: CommunityPost[];
  comments: Comment[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  schedule: Date;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  instructor: User;
  reviews: Review[];
  bookings: Booking[];
}

interface Review {
  id: string;
  rating: number;
  reviewText?: string | null;
  createdAt: Date;
  updatedAt: Date;
  course: Course;
  user: User;
}

interface Event {
  id: string;
  title: string;
  description?: string | null;
  eventDate: Date;
  location?: string | null;
  createdAt: Date;
  updatedAt: Date;
  creator: User;
  attendees: User[];
}

interface Booking {
  id: string;
  bookingDate: Date;
  status: string;
  totalPrice: number;
  charityDonation?: number | null;
  createdAt: Date;
  updatedAt: Date;
  course: Course;
  user: User;
}

interface Badge {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
}

interface CommunityPost {
  id: string;
  content: string;
  postDate: Date;
  createdAt: Date;
  updatedAt: Date;
  creator: User;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  commentDate: Date;
  createdAt: Date;
  updatedAt: Date;
  communityPost: CommunityPost;
  user: User;
}
