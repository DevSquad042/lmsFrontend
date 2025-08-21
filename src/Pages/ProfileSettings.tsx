import React, { useState } from "react";
import Footer from "../Components/Layout/Footer";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import "../assets/css/ProfileSettings.css";

interface Likes {
  interest: string;
  hobbies: string;
  profession: string;
  education: string;
  favoriteFood: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  headline: string;
  description: string;
  language: string;
  likes: Likes;
  image: File | null;
}

const ProfileSettings: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    headline: "",
    description: "",
    language: "",
    likes: {
      interest: "",
      hobbies: "",
      profession: "",
      education: "",
      favoriteFood: "",
    },
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name in formData.likes) {
      setFormData((prev) => ({
        ...prev,
        likes: {
          ...prev.likes,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Header2 />

      <section className="profile-settings-container">
        <ProfileSidebar />

        <div className="profile-settings-content">
          {/* Profile Info */}
          <div className="profile-info-card">
            {/* Name Row */}
            <div className="form-group-row">
              <div className="form-group half-width">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </div>
              <div className="form-group half-width">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            {/* Headline */}
            <div  className="form-group-half-width">
              <label>Headline</label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Enter your headline"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description"
              ></textarea>
            </div>

            {/* Language */}
            <div  className="form-group-half-width">
              <label>Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

          </div>

          {/* Image Upload */}
          {/* Image Upload */}
<div className="profile-image-card">
  <h2>Image Preview</h2>

  {/* Preview */}
  <div className="image-preview">
    {imagePreview ? (
      <img src={imagePreview} alt="Preview" />
    ) : (
      <p>No image selected</p>
    )}
  </div>

  {/* Add/Change Row */}
  <div className="form-group-row">
    <div className="form-group-half-width2">
      <label htmlFor="imageInput">Add/Change Image</label>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
    <button
      type="button"
      className="upload-btn"
      onClick={() => document.getElementById("imageInput")?.click()}
    >
      Upload Image
    </button>
  </div>

  {/* Save Button */}
  <button
    type="button"
    className="save-image-btn"
    onClick={() => console.log("Image saved:", formData.image)}
  >
    Save Image
  </button>
</div>


          {/* Likes */}
          <div className="profile-likes-card">
            <h2>Likes</h2>
            {Object.entries(formData.likes).map(([key, value]) => (
              <div className="form-group" key={key}>
                <label>{key}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfileSettings;







