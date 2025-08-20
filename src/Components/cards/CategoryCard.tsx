
import './CardsStyle/CategoryCard.css'

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
 count: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, count }) => {
  return (
    <div className="category-card">
      <div className="category-icon">{icon}</div>
      <h3 className="category-title">{title}</h3>
      <p className="category-count">{count}</p>
    </div>
  );
};

export default CategoryCard;
