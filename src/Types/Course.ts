// import type { Key } from "react";

// types/Course.ts

// export interface Course {
//   [x: string]: Key | null | undefined;
//   id: string;
//   title: string;
//   description: string;
//   instructor: string;
//   price: number;
//   originalPrice?: number;
//   discount?: number;
//   categories?: undefined;
//   tags?: undefined;
//   thumbnail: string;
//   sections: { title: string; videoUrl: string; isPreview: boolean }[];
//   rating: number;
//   reviews: number;
// }

// types/Course.ts
export interface Course {
  _id: string; 
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  details: string;
  price: number;
  thumbnail: string;
  originalPrice?: number;
  discount?: number;
  categories?: string[];
  tags?: string[];
}

