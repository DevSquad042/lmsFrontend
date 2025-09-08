import './SharedStyles/Header1.css';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Logo1 from '../../assets/logo/logo copy.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const Header1: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchCourses();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://byway-hoce.onrender.com/api/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-left2">
        <Link to="/">
          <img src={Logo1} alt="Byway Logo" className="header-logo2" />
        </Link>
        <Link to="/categories" className="header-link">Categories</Link>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="header-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search courses"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            {isLoading ? (
              <div className="search-loading">Loading...</div>
            ) : (
              searchResults.map((course) => (
                <Link
                  key={course._id}
                  to={`/course/${course._id}`}
                  className="search-result-item"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="search-result-thumbnail"
                  />
                  <div className="search-result-info">
                    <h3>{course.title}</h3>
                    <p>{course.description.substring(0, 100)}...</p>
                    <p className="search-result-price">${course.price}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      <div className="header-right">
        <Link to="/" className="header-link2">Teach on Byway</Link>
        <Link to="/cart"><FaShoppingCart className="header-cart" /></Link>
        <Link to="/login">
          <button className="btn-outline">Log In</button>
        </Link>
        <Link to="/register">
          <button className="btn-filled">Sign Up</button>
        </Link>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/categories" className="mobile-link" onClick={() => setMenuOpen(false)}>Categories</Link>
        <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Teach on Byway</Link>
        <Link to="/cart" className="mobile-link" onClick={() => setMenuOpen(false)}>Cart</Link>
        <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>Log In</Link>
        <Link to="/register" className="mobile-link" onClick={() => setMenuOpen(false)}>Sign Up</Link>
      </div>
    </header>
  );
};

export default Header1;