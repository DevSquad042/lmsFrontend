// src/Types/Mentor.ts

export interface Mentor {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviews: { id: string; text: string; rating: number }[];
  bio: string;
  portfolio: string;
  image: string;
}