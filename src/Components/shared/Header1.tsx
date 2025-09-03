
import './SharedStyles/Header1.css';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import Logo1 from '../../assets/logo/logo copy.png'
import { Link } from 'react-router-dom';

const Header1: React.FC = () => {
  return (
    <header className="header">
       <div className="header-left2">
        <Link to="/">
          <img src={Logo1} alt="Byway Logo" className="header-logo2" />
        </Link>
        <Link to="/categories" className="header-link">Categories</Link>
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

