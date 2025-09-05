// src/data/courses.ts
import type { Course } from '../Types/Course';
import courseImg from '../assets/Images/course.jpg';

const now = new Date().toISOString();

export const courses: Course[] = [
  {
    _id: 'course-1',
    title: "Beginner's Guide to Design",
    instructor: 'Ronald Richards',
    rating: 5,
    reviews: [
      {
        id: 'r1',
        userId: 'user123',
        rating: 5,
        comment: 'Great for beginners!',
        avatar: '/default-avatar.png',
        date: now
      }
    ],
    description: '22 Total Hours. 155 Lectures. Beginner',
    price: 149.9,
    thumbnail: courseImg,
    chapters: 18,
    hours: 22,
    lectures: 155,
    level: 'Beginner',
    categories: ['Design'],
    tags: ['Design', 'Beginner'],
    sections: [
      {
        title: 'Introduction',
        videoFile: 'intro.mp4',
        videoUrl: 'https://example.com/videos/intro',
        pdf: 'intro.pdf',
        _id: 'section-1',
        isPreview: true
      }
    ],
    createdAt: now,
    updatedAt: now,
    __v: 0
  },
  {
    _id: 'course-2',
    title: 'Advanced React Development',
    instructor: 'Sarah Johnson',
    rating: 4,
    reviews: [
      {
        id: 'r2',
        userId: 'user456',
        rating: 4,
        comment: 'Very detailed course!',
        avatar: '/default-avatar.png',
        date: now
      }
    ],
    description: '35 Total Hours. 220 Lectures. Advanced',
    price: 199.9,
    thumbnail: courseImg,
    chapters: 25,
    hours: 35,
    lectures: 220,
    level: 'Advanced',
    categories: ['Development'],
    tags: ['React', 'Advanced'],
    sections: [
      {
        title: 'Setup & Environment',
        videoFile: 'setup.mp4',
        videoUrl: 'https://example.com/videos/setup',
        pdf: 'setup.pdf',
        _id: 'section-2',
        isPreview: true
      }
    ],
    createdAt: now,
    updatedAt: now,
    __v: 0
  },
  {
    _id: 'course-3',
    title: 'UI/UX Design Masterclass',
    instructor: 'Michael Chen',
    rating: 5,
    reviews: [
      {
        id: 'r3',
        userId: 'user789',
        rating: 5,
        comment: 'Loved the UI/UX principles explained!',
        avatar: '/default-avatar.png',
        date: now
      }
    ],
    description: '40 Total Hours. 180 Lectures. Intermediate',
    price: 179.9,
    thumbnail: courseImg,
    chapters: 22,
    hours: 40,
    lectures: 180,
    level: 'Intermediate',
    categories: ['Design'],
    tags: ['UI/UX', 'Intermediate'],
    sections: [
      {
        title: 'Getting Started',
        videoFile: 'start.mp4',
        videoUrl: 'https://example.com/videos/start',
        pdf: 'start.pdf',
        _id: 'section-3',
        isPreview: true
      }
    ],
    createdAt: now,
    updatedAt: now,
    __v: 0
  },
  // Generate more mock courses
  ...Array.from({ length: 6 }, (_, index) => {
    const level = ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)];
    const hours = Math.floor(Math.random() * 20) + 20;
    const lectures = Math.floor(Math.random() * 100) + 100;

    return {
      _id: `course-${index + 4}`,
      title: `Course ${index + 4}`,
      instructor: 'Various Authors',
      rating: Math.floor(Math.random() * 2) + 4,
      reviews: [
        {
          id: `r-${index + 4}`,
          userId: `user${index + 4}`,
          rating: Math.floor(Math.random() * 2) + 4,
          comment: 'Good course!',
          avatar: '/default-avatar.png',
          date: now
        }
      ],
      description: `${hours} Total Hours. ${lectures} Lectures. ${level}`,
      price: Math.floor(Math.random() * 100) + 99,
      thumbnail: courseImg,
      chapters: Math.floor(Math.random() * 10) + 15,
      hours,
      lectures,
      level,
      categories: ['Design', 'Development', 'Business'].slice(
        0,
        Math.floor(Math.random() * 3) + 1
      ),
      tags: ['Popular', level],
      sections: [
        {
          title: 'Overview',
          videoFile: 'overview.mp4',
          videoUrl: 'https://example.com/videos/overview',
          pdf: 'overview.pdf',
          _id: `section-${index + 4}`
        }
      ],
      createdAt: now,
      updatedAt: now,
      __v: 0
    } as Course;
  })
];

export default courses;
