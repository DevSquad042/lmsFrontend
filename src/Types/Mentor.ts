export interface Mentor {
  //[x: string]: React.ReactNode;
  id: string; 
  firstName: string; 
  lastName: string; 
  email: string; 
  userName: string; 
  createdAt: string; 
  updatedAt: string; 
  __v: number; 
  name?: string; 
  rating?: number; 
  reviews?: { id: string; text: string; rating: number }[]; 
  bio?: string; 
  portfolio?: string; 
  image?: string; 
}