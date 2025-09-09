export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1..5
  reviewText: string;
  date: string;
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
