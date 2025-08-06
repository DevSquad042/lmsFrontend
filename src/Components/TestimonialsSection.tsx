import React, { useRef } from 'react';
import TestimonialCard from './cards/TestimonialCard'
// import './Testimonial.css';

const testimonials = [
  {
    text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
    image: '/images/user1.jpg',
    name: 'Jane Doe',
    title: 'Product Manager',
  },
  {
    text: 'The interactive lessons and real-world projects helped me build confidence in my coding skills. Highly recommended!',
    image: '/images/user2.jpg',
    name: 'John Smith',
    title: 'Software Engineer',
  },
  {
    text: 'This platform stands out for its simplicity and depth. I love how practical and beginner-friendly it is.',
    image: '/images/user3.jpg',
    name: 'Ada Johnson',
    title: 'Frontend Developer',
  },

  {
    text: 'This platform stands out for its simplicity and depth. I love how practical and beginner-friendly it is.',
    image: '/images/user3.jpg',
    name: 'Ada Johnson',
    title: 'Frontend Developer',
  },
  {
    text: 'This platform stands out for its simplicity and depth. I love how practical and beginner-friendly it is.',
    image: '/images/user3.jpg',
    name: 'Ada Johnson',
    title: 'Frontend Developer',
  },
  {
    text: 'This platform stands out for its simplicity and depth. I love how practical and beginner-friendly it is.',
    image: '/images/user3.jpg',
    name: 'Ada Johnson',
    title: 'Frontend Developer',
  },
  {
    text: 'This platform stands out for its simplicity and depth. I love how practical and beginner-friendly it is.',
    image: '/images/user3.jpg',
    name: 'Ada Johnson',
    title: 'Frontend Developer',
  },
  {
    text: 'This platform stands out for its simplicity and depth. I love how practical and beginner-friendly it is.',
    image: '/images/user3.jpg',
    name: 'Ada Johnson',
    title: 'Frontend Developer',
  },
];

const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-header-row">
        <h1 className="testimonial-header">What our customers say <br />About Us</h1>
        <div className="testimonial-scroll-controls">
          <button className="scroll-btn" onClick={() => scroll('left')}>{'<'}</button>
          <button className="scroll-btn" onClick={() => scroll('right')}>{'>'}</button>
        </div>
      </div>

      <div className="testimonial-cards-container" ref={scrollRef}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
