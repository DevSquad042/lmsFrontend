// src/Types/Review.ts

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  targetId: string; // The ID of the course or instructor being reviewed
  createdAt: string;
}

export interface AverageRating {
  averageRating: number;
  numberOfRatings: number;
}
