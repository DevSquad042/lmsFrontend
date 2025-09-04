import './SharedStyles/Header2.css';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo1 from '../../assets/logo/logo copy.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { useState } from 'react';
import type { RootState } from "../../store/store";
import { searchCourses } from '../../store/slices/courseSlice';
import LogoutButton from '../../Components/Logout';
import { toast } from 'react-toastify';

const Header2: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close dropdown after logout to improve UX
  const handleLogoutSuccess = () => {
    setDropdownOpen(false); // Close dropdown after logout
  };

  // Handle search functionality
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.warning('Please enter a search term');
      return;
    }

    setIsSearching(true);

    try {
      // Dispatch search action
      await dispatch(searchCourses(searchQuery.trim())).unwrap();

      // Navigate to courses page with search results
      navigate('/courses', {
        state: {
          searchQuery: searchQuery.trim(),
          fromSearch: true
        }
      });

      // Clear search input
      setSearchQuery('');
    } catch (error: any) {
      console.error('Search failed:', error);
      toast.error(error.message || 'Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle mobile search functionality
  const handleMobileSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobileSearchQuery.trim()) {
      toast.warning('Please enter a search term');
      return;
    }

    setIsSearching(true);
    setMobileSearchOpen(false);

    try {
      // Dispatch search action
      await dispatch(searchCourses(mobileSearchQuery.trim())).unwrap();

      // Navigate to courses page with search results
      navigate('/courses', {
        state: {
          searchQuery: mobileSearchQuery.trim(),
          fromSearch: true
        }
      });

      // Clear search input
      setMobileSearchQuery('');
    } catch (error: any) {
      console.error('Search failed:', error);
      toast.error(error.message || 'Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Toggle mobile search overlay
  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
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
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSearching}
        />
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
              <LogoutButton onLogoutSuccess={handleLogoutSuccess} /> {/* Replace Link with LogoutButton */}
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
                disabled={isSearching}
                autoFocus
              />
              <button
                type="submit"
                className="mobile-search-submit"
                disabled={isSearching || !mobileSearchQuery.trim()}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header2;