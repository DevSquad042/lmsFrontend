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
  image: string;
}

export interface CourseCardProps {
  course: Course;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
}
