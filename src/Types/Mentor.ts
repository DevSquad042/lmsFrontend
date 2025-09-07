export interface Review {
  _id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reviewCount?: number;
  totalRatings?: number;
}

export interface Profile {
  _id: string;
  userId: string;
  headline?: string;
  description?: string;
  languages?: string[];
  profilePicture?: string;
  profilePictureId?: string;
  linkedin?: string;
  youtube?: string;
  facebook?: string;
  website?: string;
  x?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Mentor {
  _id: string; // ✅ use API _id
  id: string; // alias for _id
  name?: string; // constructed from firstName and lastName
  firstName: string;
  lastName: string;
  email: string;
  userName?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  verified?: boolean;

  // Ratings
  avgRating?: number;
  totalReviews?: number;

  // Relations
  reviews?: Review[];
  profile?: Profile | null;

  // Legacy / fallback fields
  profession?: string;
  image?: string;
  profilePicture?: string; // kept for compatibility
  studentsCount?: number;  // still useful in frontend
}
