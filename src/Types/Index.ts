// ==========================================
// TYPE DEFINITIONS
// ==========================================
// This file contains all TypeScript interfaces and types
// used throughout the shopping cart application

export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  totalRatings: number;
  totalHours: number;
  lectures: number;
  level: string;
  image: Element | string; // Can be a URL or an imported image element
}

export interface OrderSummary {
  price: number;
  discount: number;
  tax: number;
  total: number;
}

// Props interfaces for components
export interface CourseCardProps {
  course: Course;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
}

export interface OrderSummaryProps {
  summary: OrderSummary;
  onCheckout: () => void;
}
