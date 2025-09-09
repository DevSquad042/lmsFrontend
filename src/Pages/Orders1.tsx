import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header2 from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";
import '../Styles/Orders1.css'

const Orders1: React.FC = () => {
  console.log('Orders1 component rendered - no enrollment logic here');

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
          Your courses are being processed and will be available in your account shortly.
        </p>
        <div className="order-status__actions" style={{ marginTop: '20px' }}>
          <Link
            to="/profile2"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              marginRight: '10px'
            }}
          >
            View My Courses
          </Link>
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