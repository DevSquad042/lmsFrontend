import './SharedStyles/Header1.css';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import Logo1 from '../../assets/logo/logo copy.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import type { AppDispatch } from '../../store/store';
import { searchCourses } from '../../store/slices/coursesSlice';

const Header1: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchCourses(query));
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <header className="header">
      <div className="header-left2">
        <Link to="/">
          <img src={Logo1} alt="Byway Logo" className="header-logo2" />
        </Link>
        <Link to="/categories" className="header-link">Categories</Link>
      </div>

      <form className="header-search" onSubmit={handleSearch}>
        <FaSearch className="search-icon" onClick={handleSearch} />
        <input
          type="text"
          placeholder="Search courses"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

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
    </header>
  );
};

export default Header1;
