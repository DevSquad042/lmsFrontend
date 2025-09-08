import './SharedStyles/Header1.css';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Logo1 from '../../assets/logo/logo copy.png';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <Link to="/">
            <img src={Logo1} alt="Byway Logo" className="header-logo" />
          </Link>
          <Link to="/categories" className="header-link desktop-only">Categories</Link>
        </div>

        <div className="header-search" ref={searchRef}>
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
                    to={`/courses/${course._id}`}
                    className="search-result-item"
                    onClick={() => setSearchResults([])}
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
          <Link to="/" className="header-link desktop-only">Teach on Byway</Link>
          <div className="auth-buttons desktop-only">
            <Link to="/login">
              <button className="btn-outline">Log In</button>
            </Link>
            <Link to="/register">
              <button className="btn-filled">Sign Up</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} ref={mobileMenuRef}>
        <div className="mobile-menu-content">
          <Link to="/categories" className="mobile-menu-link" onClick={toggleMobileMenu}>
            Categories
          </Link>
          <Link to="/" className="mobile-menu-link" onClick={toggleMobileMenu}>
            Teach on Byway
          </Link>
          <div className="mobile-auth-buttons">
            <Link to="/login" onClick={toggleMobileMenu}>
              <button className="btn-outline">Log In</button>
            </Link>
            <Link to="/register" onClick={toggleMobileMenu}>
              <button className="btn-filled">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header1;