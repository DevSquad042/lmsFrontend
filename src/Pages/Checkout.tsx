import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../Styles/Checkout.module.css';
import percent from '../assets/logo/percent.png';
import Header1 from '../Components/shared/Header1';
import Footer from '../Components/Layout/Footer';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [formData, setFormData] = useState({
    country: '',
    state: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const status = searchParams.get('status');
    const transactionId = searchParams.get('transaction_id');

    if (status === 'successful' && transactionId) {
      dispatch(clearCart());
      toast.success('Payment successful! Your order has been placed.');
      navigate('/order1');
    } else if (status === 'cancelled' || status === 'failed') {
      toast.error('Payment failed. Please try again.');
      navigate('/order2');
    }
  }, [searchParams, dispatch, navigate]);

  useEffect(() => {
    console.log('Cart items in checkout:', cartItems);
    console.log('Cart items from localStorage:', localStorage.getItem('cart'));
  }, [cartItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCheckout = async () => {
    console.log('Cart items at checkout time:', cartItems);
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before proceeding.');
      return;
    }

    if (!formData.country || !formData.state || !formData.email) {
      toast.warning('Please fill in your country, state, and email.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const courseIds = cartItems.map((item) => item.id);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const paymentData = {
      courses: courseIds,
      totalAmount: total,
      email: formData.email,
      country: formData.country,
      state: formData.state,
    };

    console.log('Payment data being sent:', paymentData);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to checkout.');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://byway-hoce.onrender.com/api/flutterwave/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('API response:', result);

      if (response.ok) {
        const link = result.checkoutLink || result.data?.link;
        if (link) {
          window.location.href = link; // Redirect to Flutterwave's payment page
        } else {
          toast.error('Payment initiation failed: No payment link received.');
        }
      } else {
        toast.error(result.message || 'Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred during payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal > 100 ? -10 : 0;
  const tax = (subtotal + discount) * 0.1;
  const total = subtotal + discount + tax;

  return (
    <>
      <Header1 />
      <div className={styles.container}>
        <div className={styles.pageTitleRow}>
          <h1 className={styles.pageTitle}>Checkout Page</h1>
          <nav className={styles.breadcrumbs}>
            <Link to="/details">Details</Link> › <Link to="/cart">Shopping Cart</Link> ›{' '}
            <span className={styles.muted}>Checkout</span>
          </nav>
        </div>

        <div className={styles.layout}>
          <div className={styles.leftCol}>
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Billing Information</h3>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter Country"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>State/Union Territory</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter State"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>
              <p className={styles.paymentInfo}>
                You will be redirected to Flutterwave to complete your payment securely.
              </p>
            </div>
          </div>
          <aside className={styles.rightCol}>
            <h2 className={styles.sectionTitle}>Order Details</h2>
            <div className={styles.card}>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
                    <img src={item.image} alt={item.title} className={styles.thumb} />
                    <div className={styles.desc}>
                      <div className={styles.category}>Course</div>
                      <div className={styles.title}>{item.title}</div>
                      <div className={styles.meta}>Qty: {item.quantity}</div>
                      <div className={styles.price}>${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyMessage}>
                  Your cart is empty. Please add items to proceed.
                </div>
              )}
            </div>
            <div className="coupon">
              <label className={styles.couponBtn}>
                <img src={percent} alt="" />
                <span> APPLY COUPON CODE</span>
              </label>
            </div>
            <div className={styles.card}>
              <div className={styles.line}>
                <span>Subtotal</span>
                <span>NGN{subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.line}>
                <span>Discount</span>
                <span className={styles.neg}>${discount.toFixed(2)}</span>
              </div>
              <div className={styles.line}>
                <span>Tax</span>
                <span>NGN{tax.toFixed(2)}</span>
              </div>
              <div className={styles.total}>
                <span>Total</span>
                <span>NGN{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className={styles.proceedBtn}
              onClick={handleCheckout}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            {cartItems.length === 0 && (
              <div className={styles.warningText}>
                Please add items to your cart before proceeding.
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;