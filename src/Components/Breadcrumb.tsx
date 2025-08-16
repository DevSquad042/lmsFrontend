// ==========================================
// BREADCRUMB COMPONENT
// ==========================================
// Navigation breadcrumb trail showing current page location
// Handles: Page navigation hierarchy display

import React from 'react';
import '../Components/ComponentStyles/Breadcrumb.css';

const Breadcrumb: React.FC = () => {
  return (
    <nav className="breadcrumb">
      <div className="breadcrumb-container">
        <div className="breadcrumb-list">
          <span className="breadcrumb-item">Categories</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item">Details</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Shopping Cart</span>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;
