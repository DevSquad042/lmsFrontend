import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Components/Layout/Footer";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import { type RootState, type AppDispatch } from "../store/store";
import { setPaidCourses, setUser } from "../store/slices/authSlice"; // ✅ import setUser
import "../Styles/ProfileSettings.css";

interface FormDataType {
  firstName: string;
  lastName: string;
  headline: string;
  description: string;
  language: string;
  linkedin: string;
  youtube: string;
  facebook: string;
  website: string;
  x: string;
  profilePicture: File | null;
}

const ProfileSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    headline: "",
    description: "",
    language: "",
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

  // ✅ ref for file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Prefill profile data safely
  useEffect(() => {
    if (!user) return;

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      headline: user.headline || "",
      description: user.description || "",
      language: user.language || "",
      linkedin: user.linkedin || "",
      youtube: user.youtube || "",
      facebook: user.facebook || "",
      website: user.website || "",
      x: user.x || "",
      profilePicture: null,
    });

    setImagePreview(user.profilePicture || null);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    if (!token) {
      setMessage("No token found. Please log in again ❌");
      return;
    }

    if (!user?.id) {
      setMessage("User ID not found. Please log in again ❌");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          if (value instanceof File) {
            data.append(key, value);
          } else {
            data.append(key, String(value));
          }
        }
      });

      const response = await fetch(
        `https://byway-hoce.onrender.com/api/profile/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response: ${text}`);
      }

      const result = await response.json();

      if (!response.ok) {
        setMessage(
          result.message || `Error ${response.status}: ${response.statusText} ❌`
        );
        return;
      }

      const updatedUser = { ...user, ...result };

      // ✅ Sync Redux + localStorage
      dispatch(setUser(updatedUser));

      if (result.paidCourses) dispatch(setPaidCourses(result.paidCourses));

      setMessage("Profile updated successfully ✅");
      setFormData((prev) => ({ ...prev, profilePicture: null }));
      setImagePreview(result.profilePicture || null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`Error updating profile: ${err.message} ❌`);
      } else {
        setMessage("An unknown error occurred ❌");
      }
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
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </div>
              <div className="form-group half-width">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
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
                value={formData.headline || ""}
                onChange={handleChange}
                placeholder="Enter headline"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Write a short description"
              />
            </div>

            {/* ✅ New Language dropdown */}
            <div className="form-group">
              <label>Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="">-- Select Language --</option>
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>
          </div>

          <div className="profile-image-card">
            <h2>Profile Picture</h2>
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <p>No image selected</p>
              )}
            </div>
            <div className="form-group">
              <label>Add/Change Profile</label>
              <div className="input-forms">
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef} // ✅ added ref
                />
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => fileInputRef.current?.click()} // ✅ trigger input
                >
                  Upload
                </button>
              </div>
            </div>

            <button
              type="button"
              className="savee-btn"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
            {message && <p className="status-message">{message}</p>}
          </div>

          <div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin || ""}
                onChange={handleChange}
                placeholder="Enter LinkedIn URL"
              />
            </div>

            <div className="form-group">
              <label>YouTube</label>
              <input
                type="text"
                name="youtube"
                value={formData.youtube || ""}
                onChange={handleChange}
                placeholder="Enter YouTube URL"
              />
            </div>

            <div className="form-group">
              <label>Facebook</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook || ""}
                onChange={handleChange}
                placeholder="Enter Facebook URL"
              />
            </div>

            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                placeholder="Enter website"
              />
            </div>

            <div className="form-group">
              <label>X (Twitter)</label>
              <input
                type="text"
                name="x"
                value={formData.x || ""}
                onChange={handleChange}
                placeholder="Enter X username"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProfileSettings;
