export interface Review {
  id: string;
  text: string;
  rating: number;
}

export interface Mentor {
  profession: string;
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  userName?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;

  // Optional fields
  name?: string;
  rating?: number;
  reviews?: Review[];
  bio?: string;
  portfolio?: string;
  image?: string;
  profilePicture?: string; // ✅ added for API compatibility
  studentsCount?: number; // ✅ added for MentorCard use
}
