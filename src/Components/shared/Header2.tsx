import './SharedStyles/Header2.css';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo1 from '../../assets/logo/Logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store"; // ✅ adjust path if needed

const Header2: React.FC = () => {
  // ✅ Read cart items from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // ✅ Count total items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header2">
      <div className="header-left2">
        <img src={Logo1} alt="Byway Logo" className="header-logo2" />
        <Link to="/categories" className="header-link">Categories</Link>
      </div>

      <div className="header-search4">
        <FaSearch className="search-icon4" />
        <input
          type="text"
          placeholder="Search courses"
          className="search-input4"
        />
      </div>

      <div className="right-header2">
        <Link to="/teach" className="header-link2">Teach on Byway</Link>

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
      </div>
    </header>
  );
};

export default Header2;
