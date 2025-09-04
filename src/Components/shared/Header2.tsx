import React from 'react';
import './SharedStyles/Header2.css';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo1 from '../../assets/logo/logo copy.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import type { RootState } from "../../store/store";
import LogoutButton from '../../Components/Logout';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const Header2: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogoutSuccess = () => {
     setDropdownOpen(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim()) {
        try {
          setIsLoading(true);
          const response = await fetch(`https://byway-hoce.onrender.com/api/search?query=${encodeURIComponent(searchQuery)}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setSearchResults(data.results || []);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.warning('Please enter a search term');
      return;
    }

    // Navigate to courses page with search results
    navigate('/courses', {
      state: {
        searchQuery: searchQuery.trim(),
        fromSearch: true
      }
    });

    // Clear search input
    setSearchQuery('');
  };

  // Handle mobile search functionality
  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobileSearchQuery.trim()) {
      toast.warning('Please enter a search term');
      return;
    }

    setMobileSearchOpen(false);

    // Navigate to courses page with search results
    navigate('/courses', {
      state: {
        searchQuery: mobileSearchQuery.trim(),
        fromSearch: true
      }
    });

    // Clear search input
    setMobileSearchQuery('');
  };

  // Toggle mobile search overlay
  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  return (
    <header className="header2">
      <div className="header-left2">
        <Link to="/">
          <img src={Logo1} alt="Byway Logo" className="header-logo2" />
        </Link>
        <Link to="/categories" className="header-link">Categories</Link>
        <button className="mobile-menu-btn" aria-label="Menu">
          ☰
        </button>
      </div>

      <form className="header-search4" onSubmit={handleSearch}>
        <FaSearch className="search-icon4" />
        <input
          type="text"
          placeholder="Search courses"
          className="search-input4"
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
      </form>

      <div className="right-header2">
        <Link to="/" className="header-link2">Teach on Byway</Link>

        <div className="icons2">
          <Link to="/profile">
            <IoMdHeartEmpty className="header-heart" />
          </Link>

          <Link to="/cart" className="cart-wrapper">
            <FaShoppingCart className="header-cart" />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>

          <Link to="/notifications">
            <IoIosNotificationsOutline className="header-notification" />
          </Link>
        </div>

        <button
          className="mobile-search-btn"
          onClick={toggleMobileSearch}
          aria-label="Search"
        >
          <FaSearch />
        </button>

        <div className="user-avatar-wrapper" onClick={toggleDropdown}>
          <div className="user-avatar">B</div>
          {dropdownOpen && (
            <div className="user-dropdown">
              <Link to="/">Home</Link>
              <Link to="/profile1">Settings</Link>
              <LogoutButton onLogoutSuccess={handleLogoutSuccess} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="mobile-search-overlay active" onClick={toggleMobileSearch}>
          <div className="mobile-search-container" onClick={(e) => e.stopPropagation()}>
            <form className="mobile-search-form" onSubmit={handleMobileSearch}>
              <input
                type="text"
                placeholder="Search courses..."
                className="mobile-search-input"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="mobile-search-submit"
                disabled={!mobileSearchQuery.trim()}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header2;