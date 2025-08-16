export type RatingBreakdown = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

export interface RatingSummaryData {
  average: number;
  total_count: number;
  breakdown: RatingBreakdown;
  userRating: number | null;
}
