import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../Styles/Checkout.module.css';
import paypal from '../assets/logo/paypal.png';
import visa from '../assets/logo/visa.png';
import percent from '../assets/logo/percent.png';
import Header2 from '../Components/shared/Header2';
import Footer from '../Components/Layout/Footer';

interface FlutterwaveResponse {
  status: string;
  transaction_id?: string;
  tx_ref?: string;
}

interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  redirect_url: string;
  customer: {
    email: string;
    name: string;
    phone_number: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  meta: {
    courses: string[];
    course_titles: string[];
    course_images: string[];
    country: string;
    state: string;
    total_items: number;
  };
  callback: (response: FlutterwaveResponse) => void;
  onclose: () => void;
}

declare global {
  interface Window {
    FlutterwaveCheckout: (config: FlutterwaveConfig) => void;
  }
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [formData, setFormData] = useState({
    country: '',
    state: '',
    email: '',
    method: 'card',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Handle Flutterwave payment callback
    const status = searchParams.get('status');
    const transactionId = searchParams.get('transaction_id');

    if (status === 'successful' && transactionId) {
      // Payment was successful
      dispatch(clearCart());
      toast.success('Payment successful! Your order has been placed.');
      navigate('/order1');
    } else if (status === 'cancelled') {
      toast.error('Payment was cancelled. Please try again.');
    } else if (status === 'failed') {
      toast.error('Payment failed. Please try again.');
      navigate('/order-failed');
    }
  }, [searchParams, dispatch, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCheckout = async () => {
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

    try {
      setLoading(true);
      
      // Prepare payment data
      const courseIds = cartItems.map((item) => item.id);
      const courseTitles = cartItems.map((item) => item.title);
      const courseImages = cartItems.map((item) => item.image);
      const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      
      // Use the first course image as the logo for Flutterwave (or your own logo)
      const logoUrl = cartItems[0]?.image || `${window.location.origin}/logo.png`;
      
      const paymentData = {
        tx_ref: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        amount: total,
        currency: 'NGN',
        redirect_url: `${window.location.origin}/checkout`,
        customer: {
          email: formData.email,
          name: 'Customer',
          phone_number: '' 
        },
        customizations: {
          title: 'Course Purchase',
          description: cartItems.length === 1 
            ? cartItems[0].title 
            : `${cartItems.length} Courses`,
          logo: logoUrl
        },
        meta: {
          courses: courseIds,
          course_titles: courseTitles,
          course_images: courseImages,
          country: formData.country,
          state: formData.state,
          total_items: cartItems.length
        },
      };

      // Load Flutterwave script
      await loadFlutterwaveScript();
      
      // Initialize Flutterwave payment
      if (window.FlutterwaveCheckout) {
        window.FlutterwaveCheckout({
          public_key: 'FLWPUBK_TEST-c893d9e0dcb31cc02a354247a5d2f3f1-X', // Replace with your public key
          ...paymentData,
          callback: function(response: FlutterwaveResponse) {
            if (response.status === 'successful') {
              dispatch(clearCart());
              navigate('/order1');
            } else {
              navigate('/order-failed');
            }
          },
          onclose: function() {
            toast.info('Payment window closed');
          },
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred during payment. Please try again.');
      navigate('/order-failed');
    } finally {
      setLoading(false);
    }
  };

  const loadFlutterwaveScript = () => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('flutterwave-script')) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'flutterwave-script';
      script.src = 'https://checkout.flutterwave.com/v3.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Flutterwave script'));
      document.body.appendChild(script);
    });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal > 100 ? -10 : 0;
  const tax = (subtotal + discount) * 0.1;
  const total = subtotal + discount + tax;

  return (
    <>
      <Header2 />
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
              <h3 className={styles.sectionTitle}>Payment Method</h3>
              <div className={styles.paymentCard}>
                <div className={styles.radioRow}>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="method"
                      value="card"
                      checked={formData.method === 'card'}
                      onChange={handleChange}
                    />
                    <span className={styles.radioLabel}>Credit/Debit Card</span>
                  </label>
                  <div className={styles.cardIcons}>
                    <img src={visa} alt="visa logo" />
                  </div>
                </div>
                <div className={styles.divider} />
                <label className={styles.radioBottom}>
                  <input
                    type="radio"
                    name="method"
                    value="paypal"
                    checked={formData.method === 'paypal'}
                    onChange={handleChange}
                  />
                  <span className={styles.radioLabel}>PayPal</span>
                  <span className={styles.paypalIcon}>
                    <img src={paypal} alt="paypal logo" />
                  </span>
                </label>
              </div>
              <div className={styles.paymentNote}>
                <p>💳 You will enter your card details securely on the Flutterwave payment page.</p>
                <p>🔒 Your payment information is processed securely and never stored on our servers.</p>
              </div>
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
                      <div className={styles.price}>NGN{(item.price * item.quantity).toFixed(2)}</div>
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
                <span className={styles.neg}>NGN{discount.toFixed(2)}</span>
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
              {loading ? (
                <>
                  <span className={styles.loadingSpinner}></span>
                  Processing...
                </>
              ) : (
                'Proceed to Payment'
              )}
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