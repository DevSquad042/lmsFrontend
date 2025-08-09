import React from 'react';
import './Experts.css';

export type ExpertsProps = {
  id: string;
  image: string;
  name: string;
  title: string;
  rating: number;
  students: number;
};

const Experts: React.FC<ExpertsProps> = ({
  id,
  image,
  name,
  title,
  rating,
  students,
}) => {
  return (
    <div className="expert-card" key={id}>
      <img src={image} alt={name} className="expert-image" />
      <div className="expert-content">
        <h3 className="expert-name">{name}</h3>
        <p className="expert-title">{title}</p>
        <hr className="expert-divider" />
        <div className="expert-meta">
          <div className="expert-rating">
            <span className="star">⭐</span>
            <span>{rating}</span>
          </div>
          <div className="expert-students">
            <span>{students.toLocaleString()} Students</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experts;

