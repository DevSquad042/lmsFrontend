import './SharedStyles/Header2.css';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo1 from '../../assets/logo/logo copy.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
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
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogoutSuccess = () => {
    setDropdownOpen(false);
  };

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
      const response = await fetch(
        `https://byway-hoce.onrender.com/api/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );
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

  const handleCourseClick = (id: string) => {
    setSearchResults([]); // close dropdown
    setSearchQuery('');   // clear input
    navigate(`/courses/${id}`);
  };

  // Get initials from user (fallback to "?" if not logged in)
  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : null;

  return (
    <header className="header2">
      <div className="header-left2">
        <Link to="/">
          <img src={Logo1} alt="Byway Logo" className="header-logo2" />
        </Link>
        <Link to="/categories" className="header-link">Categories</Link>
      </div>

      <div className="header-search4">
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
                <div
                  key={course._id}
                  className="search-result-item"
                  onClick={() => handleCourseClick(course._id)}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="search-result-thumbnail"
                  />
                  <div className="search-result-info">
                    <h3>{course.title}</h3>
                    <p>{course.description.substring(0, 100)}...</p>
                    <p className="search-result-price">₦{course.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

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

        {/* User section */}
        {user ? (
          <div className="user-avatar-wrapper" onClick={toggleDropdown}>
            <div className="user-avatar">{userInitials}</div>
            {dropdownOpen && (
              <div className="user-dropdown">
                <Link to="/">Home</Link>
                <Link to="/profile1">Settings</Link>
                <Link to="/">
                  <LogoutButton onLogoutSuccess={handleLogoutSuccess} />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header2;
