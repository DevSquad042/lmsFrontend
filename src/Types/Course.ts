import type { Key } from "react";

// types/Course.ts
export interface Course {
  [x: string]: Key | null | undefined;
  id: string;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  details: string;
  price: number;
  image: string;
  chapters?: number;
  category?: string;
  hours?: number;
  lectures?: number;
  level?: string;
}