import { FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPaidCourses } from "../store/slices/authSlice";
import type { AppDispatch } from "../store";
import Header2 from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";
import '../Styles/Orders1.css'

const Orders1: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  console.log('Orders1 component rendered - no enrollment logic here');

  const handleRefreshCourses = () => {
    // Refresh the user's paid courses data
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
      dispatch(fetchPaidCourses(user.id));
    }
    navigate('/profile2');
  };

  return (
    <div className="orders-page">
      <Header2 />
      <div className="order-status">
        <div className="order-status__icon">
          <FaCheck className="order-status__tick" />
        </div>
        <h2 className="order-status__title">Order Complete</h2>
        <p className="order-status__message">
          Thank you for your purchase! You will receive a confirmation email soon.
        </p>
        <p className="order-status__message">
          Your courses have been enrolled and are now available in your account.
        </p>
        <div className="order-status__actions" style={{ marginTop: '20px' }}>
          <button
            onClick={handleRefreshCourses}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            View My Courses
          </button>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500'
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders1;