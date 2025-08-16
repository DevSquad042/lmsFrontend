// Data file for the course detail page
import courseImg from '../assets/Images/course.jpg';

export const courseData = {
  id: 'ux-design-course',
  title: 'Introduction to User Experience Design',
  author: 'Ronald Richards',
  rating: 4.6,
  reviews: 40845,
  students: 500,
  totalHours: 22,
  lectures: 155,
  level: 'All levels',
  price: 49.5,
  originalPrice: 99.0,
  discount: 50,
  image: courseImg,
  description: 'This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.',
  certification: true,
  languages: ['English', 'Spanish', 'Italian', 'German']
};

export const syllabusData = [
  { title: 'Introduction to UX Design', lessons: 5, duration: '1 hour' },
  { title: 'Basics of User-Centered Design', lessons: 8, duration: '1 hour' },
  { title: 'Elements of User Experience', lessons: 6, duration: '1 hour' },
  { title: 'Visual Design Principles', lessons: 7, duration: '1 hour' }
];

export const instructorData = {
  name: 'Ronald Richards',
  title: 'UX/UI Designer',
  rating: 4.7,
  reviews: 40845,
  students: 500,
  courses: 15,
  image: courseImg,
  bio: 'With over a decade of industry experience, Ronald brings a wealth of practical knowledge to the classroom. He has played a pivotal role in designing user-centric interfaces for renowned tech companies, ensuring both aesthetic appeal and user friendliness.'
};

export const reviewsData = [
  {
    id: 1,
    name: 'Mark Doe',
    rating: 5,
    date: 'Reviewed on 22nd March, 2024',
    text: 'I was totally overwhelmed, having no prior design experience, but the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
    avatar: courseImg
  },
  {
    id: 2,
    name: 'Mark Doe',
    rating: 5,
    date: 'Reviewed on 22nd March, 2024',
    text: 'I was totally overwhelmed, having no prior design experience, but the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
    avatar: courseImg
  },
  {
    id: 3,
    name: 'Mark Doe',
    rating: 5,
    date: 'Reviewed on 22nd March, 2024',
    text: 'I was totally overwhelmed, having no prior design experience, but the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
  }
];