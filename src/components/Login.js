import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress, // Added for loading icon
} from "@mui/material";
import { Close, Visibility, VisibilityOff, Email } from "@mui/icons-material";
import RegisterPage from "./RegisterPage";
import { connect } from "react-redux";
import { postLogin } from "../redux/action/action";

const Login = ({ open, handleClose, login, postLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOpenRegister = () => {
    handleClose();
    setOpenRegister(true);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    postLogin(credentials);
  };

  const handleDemoLogin = () => {
    const demoCredentials = {
      email: "demo@example.com",
      password: "password123",
    };
    setCredentials(demoCredentials);
    postLogin(demoCredentials);
  };

  // Effect to handle success, show loading, and navigate
  useEffect(() => {
    if (login.isSuccess) {
      handleClose(); // Close the login modal
      setLoading(true); // Show loading state
      setTimeout(() => {
        setLoading(false); // Hide loading after navigation
        navigate("/checkout"); // Redirect to checkout page
      }, 3000); // 1-second delay
    }
  }, [login.isSuccess, navigate, handleClose]);

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000, // Ensure it’s above everything
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
            Loading...
          </Typography>
        </Box>
      )}

      {/* Login Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "350px",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <Close />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
          >
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            placeholder="example@gmail.com"
            value={credentials.email}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Don't have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleOpenRegister}
            >
              Register
            </span>
          </Typography>

          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 1 }}
            onClick={handleDemoLogin}
          >
            Use Demo Account
          </Button>
        </Box>
      </Modal>

      {/* Register Modal */}
      <RegisterPage
        open={openRegister}
        handleClose={() => setOpenRegister(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postLogin: (data) => dispatch(postLogin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);