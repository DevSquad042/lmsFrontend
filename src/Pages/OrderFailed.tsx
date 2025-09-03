import { MdCancel } from "react-icons/md";
import Header2 from "../Components/shared/Header2";
import Footer from "../Components/Layout/Footer";
import '../Styles/OrderFailed.css'

const OrderFailed: React.FC = () => {
  return (
    <div className="orders-page">
      <Header2 />
      <div className="order-status">
        <div className="order-status__iconn">
          <MdCancel className="order-status__tick" />
        </div>
        <h2 className="order-status__title">Order Failed</h2>
        <p className="order-status__message">
          Unfortunately, your order could not be processed.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default OrderFailed;