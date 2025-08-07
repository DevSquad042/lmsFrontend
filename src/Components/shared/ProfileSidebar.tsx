
import './ProfileSidebar.css';
import profileImage from '../../assets/Images/profileImage.png'

import { FaShareAlt } from 'react-icons/fa';

const ProfileSidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src={profileImage} alt="Profile" className="profile-img" />
        <h2 className="profile-name">John Doe</h2>
        <button className="share-btn">
          Share Profile <FaShareAlt className="share-icon" />
        </button>
      </div>

      <ul className="nav-links">
        <li>Profile</li>
        <li>My Courses</li>
        <li className="active">Teachers</li>
        <li>Message</li>
        <li>My Reviews</li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
