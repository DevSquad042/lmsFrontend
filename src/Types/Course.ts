// types/Course.ts
import type { Review } from "./rating";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  categories?: string[];
  tags?: string[];
  thumbnail: string;
  sections: { title: string; videoUrl: string; isPreview: boolean }[];
  rating: number;
  reviews: Review[];
}
