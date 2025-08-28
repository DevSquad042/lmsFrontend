import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { updateProfile, fetchProfile } from "../store/slices/ProfileSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../Components/Layout/Footer";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import "../Styles/ProfileSettings.css";

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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.data);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const user = useSelector((state: RootState) => state.auth.user);

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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        image: null,
      });
    }
  }, [profile]);

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

  const handleImageUpload = () => {
    if (!formData.image) {
      toast.warning("No image selected.");
      return;
    }

    const data = new FormData();
    data.append("image", formData.image);

    console.log("Prepared image for upload:", data);
    toast.success("Image ready to upload!");
  };

  const handleSubmit = () => {
    const { firstName, lastName, headline, description, language, likes, image } = formData;
    const requiredFields = [firstName, lastName, headline, description, language];
    const likesFilled = Object.values(likes).every((val) => val.trim() !== "");

    if (requiredFields.some((field) => field.trim() === "")) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (!likesFilled) {
      toast.error("Please complete all 'Likes' fields.");
      return;
    }

    if (!image) {
      toast.warning("Please upload a profile image before submitting.");
      return;
    }

    dispatch(updateProfile(formData));
    toast.success("Profile updated successfully!");
  };

  return (
    <div>
      <Header2 />
      <section className="profile-settings-container">
        <ProfileSidebar />
        <form
          className="profile-settings-content"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Profile Info */}
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

            <div className="form-group-half-width">
              <label>Headline</label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Enter your headline"
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

            <div className="form-group-half-width">
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
          <div className="profile-image-card">
            <h2>Image Preview</h2>
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <p>No image selected</p>
              )}
            </div>
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
            <button
              type="button"
              className="save-image-btn"
              onClick={handleImageUpload}
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

          {loading && <p className="loading-text">Saving profile...</p>}
        </form>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProfileSettings;













