import React from "react";

type ButtonProps = {
  label: React.ReactElement | string;
  onClick?: () => void;
  className?: string;   // style it however you want via CSS or Tailwind
  showArrow?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  label,
  className = "",
  onClick,
  showArrow = false,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
      {showArrow && <span className="arrow">➔</span>}
    </button>
  );
};

export default Button;






