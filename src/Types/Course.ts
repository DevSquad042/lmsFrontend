

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  thumbnail: string;
  categories?: string[];
  tags?: string[];
  sections?: {
    title: string;
    videoUrl: string;
    isPreview: boolean;
  }[];
}