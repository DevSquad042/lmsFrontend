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
import Header1 from '../Components/shared/Header1';
import Footer from '../Components/Layout/Footer';

// Define interface for form data
interface FormData {
  country: string;
  state: string;
  email: string;
  method: 'flutterwave' | 'card' | 'paypal';
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

// Define interface for cart item (adjust based on your actual cart item structure)
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];

  const [formData, setFormData] = useState<FormData>({
    country: '',
    state: '',
    email: '',
    method: 'flutterwave', // Default to Flutterwave
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

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

  const isValidCardNumber = (num: string): boolean => /^\d{16}$/.test(num);
  const isValidExpiry = (exp: string): boolean => {
    const [monthStr, yearStr] = exp.split('/').map((s) => s.trim());
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    if (!month || !year || month < 1 || month > 12) return false;
    const now = new Date();
    const expiryDate = new Date(2000 + year, month);
    return expiryDate > now;
  };
  const isValidCVC = (cvc: string): boolean => /^\d{3,4}$/.test(cvc);
  const isValidName = (name: string): boolean => /^[A-Za-z\s]{2,}$/.test(name);
  const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

    if (formData.method === 'card') {
      if (
        !isValidName(formData.cardName) ||
        !isValidCardNumber(formData.cardNumber) ||
        !isValidExpiry(formData.expiry) ||
        !isValidCVC(formData.cvc)
      ) {
        toast.error('Invalid card details. Please check and try again.');
        return;
      }
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
      const result: { checkoutLink?: string; data?: { link?: string }; message?: string } = await response.json();
      console.log('API response:', result);

      if (response.ok) {
        const link = result.checkoutLink || result.data?.link;
        if (link) {
          window.location.href = link;
        } else {
          toast.error('Payment initiation failed: No payment link received.');
        }
      } else {
        toast.error(result.message || 'Payment initiation failed. Please try again.');
      }
    } catch (error: unknown) {
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
                      value="flutterwave"
                      checked={formData.method === 'flutterwave'}
                      onChange={handleChange}
                    />
                    <span className={styles.radioLabel}>Flutterwave</span>
                  </label>
                </div>
                <div className={styles.divider} />
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
                {formData.method === 'card' && (
                  <>
                    <div className={styles.formField}>
                      <label>Name of Card</label>
                      <input
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="Name on card"
                        required
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Card Number</label>
                      <input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className={styles.rowTwo}>
                      <div className={styles.formField}>
                        <label>Expiry Date</label>
                        <input
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          placeholder="MM / YY"
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>CVC/CVV</label>
                        <input
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleChange}
                          placeholder="CVC"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
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