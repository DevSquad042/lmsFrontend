import React from 'react';
import './Button.css';

type ButtonProps = {
  label: React.ReactElement | string;
  onClick?: () => void;
  backgroundColor?: string;
  showArrow?: boolean;
  style?: object;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  backgroundColor,
  showArrow = false,
  style
}) => {
  return (
    <button
      className="custom-btn"
      onClick={onClick}
      style={{ backgroundColor, ...style }}
    >
      {label}
      {showArrow && <span className="arrow">➔</span>}
    </button>
  );
};

export default Button;





