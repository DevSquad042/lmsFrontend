import React from 'react';
import './Button.css';

type ButtonProps = {
  label: string;
  onClick: () => void;
  backgroundColor?: string; // optional background color
};

const Button: React.FC<ButtonProps> = ({ label, onClick, backgroundColor }) => {
  return (
    <button
      className="custom-btn"
      onClick={onClick}
      style={{ backgroundColor }}
    >
      {label}
    </button>
  );
};

export default Button;

