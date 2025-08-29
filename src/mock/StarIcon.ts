import React from "react";
import { FaStar } from "react-icons/fa";
import "./StarIcon.css";

interface StarIconProps {
  filled?: boolean;
  size?: number;
  onClick?: () => void;
  ariaLabel?: string;
}

export const StarIcon: React.FC<StarIconProps> = ({
  filled = false,
  size = 24,
  onClick,
  ariaLabel
}) => (
  <FaStar
    size={size}
    className={`star-icon ${filled ? "star-filled" : "star-empty"}`}
    onClick={onClick}
    aria-label={ariaLabel}
    role={onClick ? "button" : "img"}
  />
);
