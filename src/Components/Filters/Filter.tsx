// components/Filter.tsx
import { useState } from 'react';
import styles from './FolderStyles/Filter.module.css';
import { FaChevronDown, FaChevronUp, FaFilter } from 'react-icons/fa';

interface FilterProps {
  onRatingChange?: (ratings: number[]) => void;
  onChapterChange?: (chapters: string[]) => void;
  onPriceChange?: (priceRange: [number, number]) => void;
  onCategoryChange?: (categories: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ 
  onRatingChange, 
  onChapterChange, 
  onPriceChange, 
  onCategoryChange 
}) => {
  const [showRating, setShowRating] = useState(true);
  const [showChapters, setShowChapters] = useState(true);
  const [showPrice, setShowPrice] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  // State for selected filters
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<string[]>(['15-20']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const handleRatingChange = (rating: number) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    
    setSelectedRatings(newRatings);
    onRatingChange?.(newRatings);
  };

  const handleChapterChange = (chapter: string) => {
    const newChapters = selectedChapters.includes(chapter)
      ? selectedChapters.filter(c => c !== chapter)
      : [...selectedChapters, chapter];
    
    setSelectedChapters(newChapters);
    onChapterChange?.(newChapters);
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterHeader}>
        <button className={styles.filterButton}>
          <FaFilter className={styles.filterIcon} />
          Filter
        </button>
      </div>

      {/* Rating */}
      <div className={styles.section}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => setShowRating(!showRating)}
        >
          <h4>Rating</h4>
          {showRating ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showRating && (
          <ul>
            {[5, 4, 3, 2, 1].map((rating) => (
              <li key={rating}>
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                  className={styles.checkbox}
                />
                <div className={styles.starRating}>
                  {renderStars(rating)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chapters */}
      <div className={styles.section}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => setShowChapters(!showChapters)}
        >
          <h4>Number of Chapters</h4>
          {showChapters ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showChapters && (
          <>
            <ul>
              {['1-10', '10-15', '15-20', '20-25'].map((range) => (
                <li key={range}>
                  <input
                    type="checkbox"
                    checked={selectedChapters.includes(range)}
                    onChange={() => handleChapterChange(range)}
                    className={styles.checkbox}
                  />
                  <span className={styles.filterText}>{range}</span>
                </li>
              ))}
            </ul>
            <button className={styles.seeMoreButton}>
              See More ↓
            </button>
          </>
        )}
      </div>

      {/* Price */}
      <div className={styles.section}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => setShowPrice(!showPrice)}
        >
          <h4>Price</h4>
          {showPrice ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showPrice && (
          <div className={styles.sectionContent}>
            <div className={styles.priceRange}>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[0]}
                onChange={(e) => {
                  const newRange: [number, number] = [parseInt(e.target.value), priceRange[1]];
                  setPriceRange(newRange);
                  onPriceChange?.(newRange);
                }}
                className={styles.rangeSlider}
              />
              <div className={styles.priceLabels}>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category */}
      <div className={styles.section}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => setShowCategory(!showCategory)}
        >
          <h4>Category</h4>
          {showCategory ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showCategory && (
          <ul>
            {['Design', 'Development', 'Marketing', 'Business'].map((category) => (
              <li key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => {
                    const newCategories = selectedCategories.includes(category)
                      ? selectedCategories.filter(c => c !== category)
                      : [...selectedCategories, category];
                    setSelectedCategories(newCategories);
                    onCategoryChange?.(newCategories);
                  }}
                  className={styles.checkbox}
                />
                <span className={styles.filterText}>{category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Filter;