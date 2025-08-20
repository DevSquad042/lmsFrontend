import React from 'react';
import './SharedStyles/Button.css';

type ButtonProps = {
  label: React.ReactElement | string;
  onClick?: () => void;
  backgroundColor?: string;
  showArrow?: boolean;
  style?: object;
  className?: string; // allows extending styles
};

const Button: React.FC<ButtonProps> = ({
  label,
  className = "",
  onClick,
  backgroundColor,
  showArrow = false,
  style
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      style={{ backgroundColor, ...style }}
    >
      {label}
      {showArrow && <span className="arrow">➔</span>}
    </button>
  );
};

export default Button;





