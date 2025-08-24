import './ComponentStyles/TopCategories.css';
import CategoryCard from './cards/CategoryCard';
import { FaCode, FaStar, FaAtom, FaPaintBrush } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TopCategories: React.FC = () => {
  // ✅ helper function to scroll up
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="top-categories-section">
      <div className="top-categories-header">
        <h2>Top Categories</h2>
        <Link 
          to="/categories" 
          className="see-all" 
          onClick={handleScrollTop}
        >
          See All
        </Link>
      </div>
      <div className="categories-grid">
        <CategoryCard icon={<FaCode />} title="Development" count="11 Courses" />
        <CategoryCard icon={<FaStar />} title="Astrology" count="30 Courses" />
        <CategoryCard icon={<FaAtom />} title="Physics" count="20 Courses" />
        <CategoryCard icon={<FaPaintBrush />} title="Art & Design" count="18 Courses" />
      </div>
    </section>
  );
};

export default TopCategories;



