/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Footer from "../Components/Layout/Footer";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import "../Styles/ProfileSettings.css";

interface FormDataType {
  firstName: string;
  lastName: string;
  headline: string;
  description: string;
  linkedin: string;
  youtube: string;
  facebook: string;
  website: string;
  x: string;
  profilePicture: File | null;
}

const ProfileSettings: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    headline: "",
    description: "",
    linkedin: "",
    youtube: "",
    facebook: "",
    website: "",
    x: "",
    profilePicture: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Prefill profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("https://byway-hoce.onrender.com/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const data = await res.json();
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          headline: data.headline || "",
          description: data.description || "",
          linkedin: data.linkedin || "",
          youtube: data.youtube || "",
          facebook: data.facebook || "",
          website: data.website || "",
          x: data.x || "",
          profilePicture: null,
        });
        setImagePreview(data.profilePictureUrl || null);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found. Please log in again ❌");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) data.append(key, value as any);
      });

      const response = await fetch(
        "https://byway-hoce.onrender.com/api/profile/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Something went wrong ❌");
        return;
      }

      // Update formData and imagePreview with returned data
      setFormData({
        firstName: result.firstName || "",
        lastName: result.lastName || "",
        headline: result.headline || "",
        description: result.description || "",
        linkedin: result.linkedin || "",
        youtube: result.youtube || "",
        facebook: result.facebook || "",
        website: result.website || "",
        x: result.x || "",
        profilePicture: null,
      });
      setImagePreview(result.profilePictureUrl || null);
      setMessage("Profile updated successfully ✅");
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("Error updating profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header2 />
      <section className="profile-settings-container">
        <ProfileSidebar />

        <div className="profile-settings-content">
          <div className="profile-info-card">
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

            <div className="form-group">
              <label>Headline</label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Enter headline"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description"
              ></textarea>
            </div>

            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="Enter LinkedIn URL"
              />
            </div>

            <div className="form-group">
              <label>YouTube</label>
              <input
                type="text"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                placeholder="Enter YouTube URL"
              />
            </div>

            <div className="form-group">
              <label>Facebook</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Enter Facebook URL"
              />
            </div>

            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter website"
              />
            </div>

            <div className="form-group">
              <label>X (Twitter)</label>
              <input
                type="text"
                name="x"
                value={formData.x}
                onChange={handleChange}
                placeholder="Enter X username"
              />
            </div>
          </div>

          <div className="profile-image-card">
            <h2>Profile Picture</h2>
            <div className="image-preview">
              {imagePreview ? <img src={imagePreview} alt="Preview" /> : <p>No image selected</p>}
            </div>
            <div className="form-group">
              <label htmlFor="imageInput">Upload Profile Picture</label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <button
            type="button"
            className="save-btn"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

          {message && <p className="status-message">{message}</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProfileSettings;
