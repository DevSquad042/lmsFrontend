import './SharedStyles/Header2.css';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo1 from '../../assets/logo/logo copy.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import type { RootState, AppDispatch } from "../../store/store";
import { searchCourses } from '../../store/slices/coursesSlice';
import LogoutButton from '../../Components/Logout';

const Header2: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogoutSuccess = () => {
    setDropdownOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchCourses(query));
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <header className="header2">
      <div className="header-left2">
        <Link to="/">
          <img src={Logo1} alt="Byway Logo" className="header-logo2" />
        </Link>
        <Link to="/categories" className="header-link">Categories</Link>
      </div>

      <form className="header-search4" onSubmit={handleSearch}>
        <FaSearch className="search-icon4" onClick={handleSearch} />
        <input
          type="text"
          placeholder="Search courses"
          className="search-input4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
    </header>
  );
};

export default Header2;
