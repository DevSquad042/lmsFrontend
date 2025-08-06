import React from 'react';
import './Button.css';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  backgroundColor?: string;
  showArrow?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  backgroundColor,
  showArrow = false,
}) => {
  return (
    <button
      className="custom-btn"
      onClick={onClick}
      style={{ backgroundColor }}
    >
      {label}
      {showArrow && <span className="arrow">➔</span>}
    </button>
  );
};

export default Button;





