import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import { setPaidCourses, fetchPaidCourses } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import styles from '../Styles/Checkout.module.css';
import percent from '../assets/logo/percent.png';
import Header2 from '../Components/shared/Header2';
import Footer from '../Components/Layout/Footer';

// Type declarations for Flutterwave
interface FlutterwaveResponse {
  status: string;
  transaction_id?: string;
  tx_ref?: string;
  // Add other properties as needed based on Flutterwave documentation
}

declare global {
  interface Window {
    FlutterwaveCheckout: (config: any) => void;
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
  });

  const [loading, setLoading] = useState(false);

  const courseIds = cartItems.map((item) => item.id);

  const enrollUserInCourses = async (courseIds: string[]): Promise<boolean> => {
    try {
      console.log('Attempting to enroll user in courses:', courseIds);
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No authentication token found for enrollment');
        toast.error('Authentication required for enrollment');
        return false;
      }

      // Try different possible enrollment endpoints
      const enrollmentEndpoints = [
        'https://byway-hoce.onrender.com/api/enroll',
        'https://byway-hoce.onrender.com/api/enrollment',
        'https://byway-hoce.onrender.com/api/courses/enroll'
      ];

      let enrollmentSuccess = false;
      let lastError = null;
      let lastErrorMessage = '';

      for (const endpoint of enrollmentEndpoints) {
        try {
          console.log(`Trying enrollment endpoint: ${endpoint}`);
          const response = await axios.post(
            endpoint,
            { courseIds },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          console.log('Enrollment response:', response.data);
          enrollmentSuccess = true;
          toast.success('Successfully enrolled in courses!');

          // Update local state with new paid courses
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const currentPaidCourses = user.paidCourses || [];
          const updatedPaidCourses = [...new Set([...currentPaidCourses, ...courseIds])];
          dispatch(setPaidCourses(updatedPaidCourses));

          // Update localStorage
          user.paidCourses = updatedPaidCourses;
          localStorage.setItem('user', JSON.stringify(user));

          break;
        } catch (error: any) {
          console.log(`Enrollment failed for ${endpoint}:`, error);
          lastError = error;
          lastErrorMessage = error.response?.data?.message || error.message || 'Unknown error';
        }
      }

      if (!enrollmentSuccess) {
        console.error('All enrollment attempts failed:', lastError);

        // Provide more specific error messages based on the error
        if (lastErrorMessage.includes('Order not found') || lastErrorMessage.includes('already processed')) {
          toast.warning('Payment successful! Enrollment may take a few moments to process. Please check your courses page.');
          return true; // Consider this a success since payment went through
        } else if (lastErrorMessage.includes('Unauthorized') || lastErrorMessage.includes('401')) {
          toast.error('Authentication error. Please log in again.');
          return false;
        } else if (lastErrorMessage.includes('500') || lastErrorMessage.includes('Internal Server Error')) {
          toast.warning('Payment successful! Server is processing enrollment. Please check your courses page in a few minutes.');
          return true; // Consider this a success since payment went through
        } else {
          toast.error(`Payment successful, but enrollment failed: ${lastErrorMessage}. Please contact support.`);
          return false;
        }
      }

      return enrollmentSuccess;
    } catch (error: any) {
      console.error('Enrollment error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';

      if (errorMessage.includes('Order not found') || errorMessage.includes('already processed')) {
        toast.warning('Payment successful! Enrollment may take a few moments to process. Please check your courses page.');
        return true; // Consider this a success since payment went through
      } else {
        toast.error(`Payment successful, but enrollment failed: ${errorMessage}. Please contact support.`);
        return false;
      }
    }
  };

  useEffect(() => {
    const status = searchParams.get('status');
    const transactionId = searchParams.get('transaction_id');

    if (status === 'successful' && transactionId) {
      // Payment was successful
      console.log('Payment successful via URL params, transaction ID:', transactionId);
      console.log('Cart items before clearing:', cartItems);
      const courseIds = cartItems.map(item => item.id);
      dispatch(clearCart());

      // Attempt to enroll user in courses
      const currentCourseIds = cartItems.map((item) => item.id);
      enrollUserInCourses(currentCourseIds).then((enrollmentSuccess) => {
        if (enrollmentSuccess) {
          toast.success('Payment successful! Your order has been placed.');
          navigate('/order1');
        } else {
          // Enrollment failed, but payment succeeded - still show success but warn user
          toast.warning('Payment successful! Please check your courses page to see your enrolled courses.');
          navigate('/order1');
        }
      });
    } else if (status === 'cancelled') {
      console.log('Payment cancelled via URL params');
      toast.error('Payment was cancelled. Please try again.');
    } else if (status === 'failed') {
      console.log('Payment failed via URL params');
      toast.error('Payment failed. Please try again.');
      navigate('/order-failed');
    }
  }, [searchParams, dispatch, navigate, cartItems]);

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
          callback: async function(response: FlutterwaveResponse) {
            console.log('Flutterwave callback response:', response);
            if (response.status === 'successful') {
              console.log('Payment successful, clearing cart and navigating to order1');
              const courseIds = cartItems.map(item => item.id);
              console.log('Course IDs to enroll:', courseIds);
              dispatch(clearCart());

              // Attempt to enroll user in courses
              const enrollmentSuccess = await enrollUserInCourses(courseIds);

              if (enrollmentSuccess) {
                toast.success('Payment successful! Your order has been placed.');
                navigate('/order1');
              } else {
                // Enrollment failed, but payment succeeded - still show success but warn user
                toast.warning('Payment successful! Please check your courses page to see your enrolled courses.');
                navigate('/order1');
              }
            } else {
              console.log('Payment failed or cancelled:', response.status);
              toast.error('Payment failed. Please try again.');
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
    } finally {
      setLoading(false);
    }
  };

  const loadFlutterwaveScript = () => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('flutterwave-script')) {
        console.log('Flutterwave script already loaded');
        resolve(true);
        return;
      }

      console.log('Loading Flutterwave script...');
      const script = document.createElement('script');
      script.id = 'flutterwave-script';
      script.src = 'https://checkout.flutterwave.com/v3.js';
      script.onload = () => {
        console.log('Flutterwave script loaded successfully');
        resolve(true);
      };
      script.onerror = (error) => {
        console.error('Failed to load Flutterwave script:', error);
        reject(new Error('Failed to load Flutterwave script. Please check your internet connection and try again.'));
      };
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