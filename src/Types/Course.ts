// types/Course.ts
export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  description: string;
  price: number;
  thumbnail: string;
  chapters?: number;
  category?: string;
  youtubeLink?: string;
  pdf?: string;
  hours?: number;
  lectures?: number;
  level?: string;
}