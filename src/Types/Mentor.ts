// types/instructor.ts
export interface Instructor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  role: 'instructor';
  // Include other relevant fields as per your API, e.g., 'rating', 'students', 'bio', 'areasOfExpertise', 'professionalExperience'
}