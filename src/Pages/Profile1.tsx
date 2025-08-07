import React, { useState } from 'react';
import '../assets/css/Profile1.css';
import ProfileSidebar from '../Components/shared/ProfileSidebar';

interface FormData {
  firstName: string;
  lastName: string;
  headline: string;
  description: string;
  language: string;
}

const languageOptions = ['English', 'French', 'Spanish', 'German', 'Chinese'];

const Profile1: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    headline: '',
    description: '',
    language: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="app-layout">
      <ProfileSidebar />
      <div className="main-content">
        <form className="profile-form">
          <div className='name-form'>
            <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder='label'
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
               placeholder='label'
            />
          </div>

          </div>
          <div className="form-group">
            <label>Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
               placeholder='label'
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
               placeholder='label'
            />
          </div>

          <div className="form-group">
            <label>Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
            
            >
              <option value="">-- Select Language --</option>
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile1;


