/* eslint-disable @typescript-eslint/no-explicit-any */


export interface Section {
  title: string;
        videoFile: string;
        videoUrl: string;
        pdf: string;
        _id: string;
        isPreview: boolean;
}

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  avatar?: string;
  date?: string;
}

export interface VideoProgress {
  completedVideos: number;
  totalVideos: number;
  completionPercentage: number;
  lastWatchedVideo?: string;
  watchedVideos: string[]; // Array of video IDs that have been watched
}

export interface Course {
  // id: any;
  _id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number; // average rating
  reviews: Review[]; // ✅ now array, not number
  price: number;
  discountPercentage?: number;
  discountExpiry?: string | null;
  discountedPrice?: number;

  // Categories & tags
  categories: string[];
  tags: string[];

  // Media
  thumbnail: string;
  sections: Section[];

  // Extra learning info
  hours: number;
  lectures: number;
  chapters: number;
  level: CourseLevel;

  // Progress tracking (optional - populated from API)
  progress?: VideoProgress;

  // Meta
  createdAt: string;
  updatedAt: string;
  __v: number;
}
