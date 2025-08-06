
import './Header1.css';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import Logo1 from '../../assets/logo/Logo.png'

const Header1: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={Logo1} alt="Byway Logo" className="header-logo" />
        <a href="#" className="header-link">Categories</a>
      </div>

      <div className="header-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search courses"
          className="search-input"
        />
      </div>

      <div className="header-right">
        <a href="#" className="header-link">Teach on Byway</a>
        <FaShoppingCart className="header-cart" />
        <button className="btn-outline">Log In</button>
        <button className="btn-filled">Sign Up</button>
      </div>
    </header>
  );
};

export default Header1;

