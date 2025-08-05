import './Header2.css';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io"
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

      <div className="right-header">
         <a href="#" className="header-link">Teach on Byway</a>
        <div className="icons">
         <IoMdHeartEmpty className="header-heart" />
        <FaShoppingCart className="header-cart" />
        <IoIosNotificationsOutline className="header-notification" />
        </div>
       </div>
    </header>
  );
};

export default Header1;