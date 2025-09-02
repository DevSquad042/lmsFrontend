export interface Course {
  id: string;
  rating: number;
  _id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  discountPercentage?: number;
  discountExpiry?: string | null;
  categories: string[];
  tags: string[];
  thumbnail: string;
  sections: {
    title: string;
    videoFile: string;
    videoUrl: string;
    pdf: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  discountedPrice?: number;
}
