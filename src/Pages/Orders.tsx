import { FaCheck } from "react-icons/fa";
import Header2 from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";
import '../Styles/Orders.css'

const Orders: React.FC = () => {
  return (
    <div className="orders-page">
      <Header2 />
      <div className="order-status">
        <div className="order-status__icon">
          <FaCheck className="order-status__tick" />
        </div>
        <h2 className="order-status__title">Order Complete</h2>
        <p className="order-status__message">
          You will receive a confirmation email soon!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;


