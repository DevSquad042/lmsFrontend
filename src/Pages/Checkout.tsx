import React from "react";
import styles from "../Styles/Checkout.module.css";
import paypal from "../assets/logo/paypal.png";
import visa from "../assets/logo/visa.png";
import percent from "../assets/logo/percent.png"
// import { FaCcVisa, FaPaypal } from "react-icons/fa";

import uxImage from "../assets/Images/checkout.svg";
import Header1 from "../Components/shared/Header1";
import Footer from "../Components/Layout/Footer"

const CheckoutPage: React.FC = () => {
  return (
    <>
    <Header1/>
    <div className={styles.container}>
      {/* Page header */}
      < div className={styles.pageTitleRow}>
        
          <h1 className={styles.pageTitle}>Checkout Page</h1>
          <nav className={styles.breadcrumbs}>
            <span>Details</span> › <span>Shopping Cart</span> ›{" "}
            <span className={styles.muted}>Checkout</span>
          </nav>
        
      </div>

      {/* Main layout */}
      <div className={styles.layout}>
        {/* LEFT COL - FORM */}
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Country</label>
                <input type="text" placeholder="Enter Country" />
              </div>

              <div className={styles.field}>
                <label>State/Union Territory</label>
                <input type="text" placeholder="Enter State" />
              </div>
            </div>

            <h3 className={styles.sectionTitle}>Payment Method</h3>

            <div className={styles.paymentCard}>
              <div className={styles.radioRow}>
                <label className={styles.radio}>
                  <input type="radio" name="method" defaultChecked />
                  <span className={styles.radioLabel}>Credit/Debit Card</span>
                </label>
                <div className={styles.cardIcons}>
                  <img src={visa} alt="visa logo" />
                </div>
              </div>

              <div className={styles.formField}>
                <label>Name of Card</label>
                <input placeholder="Name of card" />
              </div>

              <div className={styles.formField}>
                <label>Card Number</label>
                <input placeholder="Card Number" />
              </div>

              <div className={styles.rowTwo}>
                <div className={styles.formField}>
                  <label>Expiry Date</label>
                  <input placeholder="MM / YY" />
                </div>
                <div className={styles.formField}>
                  <label>CVC/CVV</label>
                  <input placeholder="CVC" />
                </div>
              </div>

              <div className={styles.divider} />

              <label className={styles.radioBottom}>
                <input type="radio" name="method" />
                <span className={styles.radioLabel}>PayPal</span>
                <span className={styles.paypalIcon}>
                   <img src={paypal} alt="paypal logo" />
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COL - ORDER SUMMARY */}
        <aside className={styles.rightCol}>
          <h2 className={styles.sectionTitle}>Order Details</h2>
          <div className={styles.card}>
            <div className={styles.orderItem}>
              <img src={uxImage} alt="course thumbnail" className={styles.thumb} />
              <div className={styles.desc}>
                <div className={styles.category}>Design</div>
                <div className={styles.title}>Introduction to User Experience Design</div>
                <div className={styles.meta}>155 Lectures · 22 Total Hours</div>
                <div className={styles.price}>$45.00</div>
              </div>
            </div>
          </div>


           <div className="coupon">
             <label className={styles.couponBtn}> 
              <img src={percent} alt="" />
              <span> APPLY COUPON CODE</span></label>
           </div>
        

          <div className={styles.card}>
            <div className={styles.line}>
              <span>Price</span>
              <span>$300.00</span>
            </div>
            <div className={styles.line}>
              <span>Discount</span>
              <span className={styles.neg}>- $10.00</span>
            </div>
            <div className={styles.line}>
              <span>Tax</span>
              <span>$20.00</span>
            </div>

            <div className={styles.total}>
              <span>Total</span>
              <span>$290.00</span>
            </div>
          </div>

          <button className={styles.proceedBtn}>Proceed to Checkout</button>
        </aside>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CheckoutPage;