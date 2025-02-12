import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout()); // Clear auth state
    navigate("/login"); // Redirect to login page
  }, [dispatch, navigate]);

  return null; // No UI needed, just execute logout logic
};

export default Logout;
