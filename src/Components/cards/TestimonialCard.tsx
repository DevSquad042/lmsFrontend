
import { FaQuoteLeft } from 'react-icons/fa';
import './CardsStyle/Testimonial.css';

interface TestimonialCardProps {
  text: string;
  image: string;
  name: string;
  title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, image, name, title }) => {
  return (
    <div className="testimonial-card">
      <FaQuoteLeft className="testimonial-quote-icon" />
      <p className="testimonial-text">"{text}"</p>
      <div className="testimonial-author">
        <img src={image} alt={name} />
        <div className="testimonial-author-info">
          <span className="testimonial-author-name">{name}</span>
          <span className="testimonial-author-title">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
