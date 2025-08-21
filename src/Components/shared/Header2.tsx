import './SharedStyles/Header2.css';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io"
import Logo1 from '../../assets/logo/Logo.png'
import { Link } from 'react-router-dom';

const Header2: React.FC = () => {
  return (
    <header className="header2">
      <div className="header-left2">
        <img src={Logo1} alt="Byway Logo" className="header-logo2" />
        <a href="#" className="header-link">Categories</a>
      </div>

      <div className="header-search2">
        <FaSearch className="search-icon2" />
        <input
          type="text"
          placeholder="Search courses"
          className="search-input2"
        />
      </div>

      <div className="right-header2">
         <a href="#" className="header-link2">Teach on Byway</a>
        <div className="icons2">
          
          <Link to="/profile">
         <IoMdHeartEmpty className="header-heart" />
         </Link>

        <Link to="/cart">
          <FaShoppingCart className="header-cart" />
        </Link>

        <Link to="/notifications">
          <IoIosNotificationsOutline className="header-notification" />
        </Link>
        </div>
       </div>
    </header>
  );
};

export default Header2;