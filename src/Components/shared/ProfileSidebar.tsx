import './SharedStyles/ProfileSidebar.css';
import profileImage from '../../assets/Images/profileImage.png';
import { FaShareAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const ProfileSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  console.log('User from Redux in ProfileSidebar:', user); // Debug log

  const menuItems = [
    { label: 'Profile', path: '/profile1' },
    { label: 'My Courses', path: '/profile2' },
    { label: 'Teachers', path: '/profile4' },
    { label: 'Message', path: '/profile5' },
    { label: 'My Reviews', path: '/profile3' },
  ];

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          src={user?.profilePicture || profileImage}
          alt="Profile"
          className="profile-img"
        />
        <h2 className="profile-name">
          {user ? `${user.firstName || ''} ${user.lastName || ''}` : 'Guest'}
        </h2>
        <button className="share-btn">
          Share Profile <FaShareAlt className="share-icon" />
        </button>
      </div>
      <ul className="nav-links">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? 'active' : ''}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSidebar;