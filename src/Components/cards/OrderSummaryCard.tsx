// ==========================================
// ORDER SUMMARY COMPONENT
// ==========================================
// Displays price breakdown and checkout button
// Handles: Price calculation display, checkout action

import React from 'react';
import type { OrderSummaryProps } from '../../../src/Types/Index';
import '../cards/OrderSummaryCard.css';

const OrderSummaryCard: React.FC<OrderSummaryProps> = ({ summary, onCheckout }) => {
  return (
    <div className="order-summary">
      <h2 className="summary-title">Order Details</h2>
      
      {/* Price Breakdown */}
      <div className="summary-details">
        <div className="summary-row">
          <span className="summary-label">Price</span>
          <span className="summary-value">${summary.price.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span className="summary-label">Discount</span>
          <span className="summary-value discount">-${Math.abs(summary.discount).toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span className="summary-label">Tax</span>
          <span className="summary-value">${summary.tax.toFixed(2)}</span>
        </div>
        
        <hr className="summary-divider" />
        
        <div className="summary-row total-row">
          <span className="summary-label total-label">Total</span>
          <span className="summary-value total-value">${summary.total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="checkout-btn"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummaryCard;
