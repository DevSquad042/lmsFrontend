export interface Review {
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
  courseId: string;
  average: number; // 0..5
  total: number;
  breakdown: { [k: number]: number }; // {1..5}
}
