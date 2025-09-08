export interface Review {
  id: string;
  courseId: number;
  userId: string;
  rating: number; // 1..5
  comment: string;

  created_at: string;
}

export interface ReviewList {
  page: number;
  pageSize: number;
  items: Review[];
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
}
