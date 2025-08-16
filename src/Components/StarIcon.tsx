import React from "react";
import { FaStar } from "react-icons/fa";
import "./ComponentStyles/Rating.css";

interface StarIconProps {
  filled?: boolean;
  size?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ariaLabel?: string;
}

export const StarIcon: React.FC<StarIconProps> = ({
  filled = false,
  size = 24,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaLabel
}) => (
  <FaStar
    size={size}
    className={`star-icon ${filled ? "star-filled" : "star-empty"}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    aria-label={ariaLabel}
    role={onClick ? "button" : "img"}
  />
);
