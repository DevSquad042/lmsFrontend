import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/authSlice";
import type { AppDispatch, RootState } from "../store";

interface LogoutButtonProps {
  onLogoutSuccess?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogoutSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    console.log("Logout button clicked");
    const result = await dispatch(logoutUser());
    console.log("Navigating to /");
    if (logoutUser.rejected.match(result)) {
      console.error("Logout error:", result.payload);
    } else {
      if (onLogoutSuccess) {
        onLogoutSuccess(); // Call the success callback (e.g., to close dropdown)
      }
      navigate("/", { replace: true });
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="dropdown-logout-button">
        Logout
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LogoutButton;