
import './CourseCard.css';

export type CourseCardProps = {
  id: string;
  image: string;
  title: string;
  author: string;
  rating: number;
  ratingCount: number;
  totalHours: number;
  totalLectures: number;
  level: string;
  price: number;
};

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  image,
  title,
  author,
  rating,
  ratingCount,
  totalHours,
  totalLectures,
  level,
  price,
}) => {
  const stars = '★'.repeat(Math.round(rating)).padEnd(5, '☆');

  return (
    <div className="course-card" key={id}>
      <img src={image} alt={title} className="course-image" />
      <h3 className="course-title">{title}</h3>
      <p className="course-author">By {author}</p>
      <p className="course-rating">
        <span className="stars">{stars}</span>{' '}
        <span className="rating-count">({ratingCount} Ratings)</span>
      </p>
      <p className="course-info">
        {totalHours} Total Hours. {totalLectures} Lectures. {level}
      </p>
      <p className="course-price">${price}</p>
    </div>
  );
};

export default CourseCard;
