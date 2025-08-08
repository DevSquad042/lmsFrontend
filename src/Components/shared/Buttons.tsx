// import React from 'react';
// import './Button.css';

// type ButtonProps = {
//   label: React.ReactElement;
//   onClick?: () => void;
//   backgroundColor?: string;
//   showArrow?: boolean;
// };

// const Button: React.FC<ButtonProps> = ({
//   label,
//   onClick,
//   backgroundColor,
//   showArrow = false,
// }) => {
//   return (
//     <button
//       className="custom-btn"
//       onClick={onClick}
//       style={{ backgroundColor }}
//     >
//       {label}
//       {showArrow && <span className="arrow">➔</span>}
//     </button>
//   );
// };

// export default Button;




import React from 'react';
import './Button.css';

type ButtonProps = {
  label: React.ReactElement;
  onClick: () => void;
  backgroundColor?: string; // optional background color
  style?: Object
};

const Button: React.FC<ButtonProps> = ({ label, onClick, backgroundColor, style }) => {
  return (
    <button
      className="custom-btn"
      onClick={onClick}
      style={{ backgroundColor, ...style }}
    >
      {label}
    </button>
  );
};

export default Button;

