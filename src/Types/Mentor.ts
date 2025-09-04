export interface Review {
  id: string;
  text: string;
  rating: number;
}

export interface Mentor {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  profession: string;
  // Optional fields
  name?: string;
  rating?: number;
  reviews?: Review[];
  bio?: string;
  portfolio?: string;
  image?: string;
  studentsCount?: number;
}
