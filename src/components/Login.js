import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Import navigation hook
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Close, Visibility, VisibilityOff, Email } from "@mui/icons-material";

import RegisterPage from "./RegisterPage";
import { connect } from "react-redux";
import { postLogin } from "../redux/action/action";

const Login = ({ open, handleClose, login, postLogin }) => {
  const navigate = useNavigate(); // 🚀 React Router navigation hook
  const [showPassword, setShowPassword] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOpenRegister = () => {
    handleClose();
    setOpenRegister(true);
  };

  // Handle input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = () => {
    postLogin(credentials);
  };

  // Handle demo login
  const handleDemoLogin = () => {
    const demoCredentials = {
      email: "demo@example.com",
      password: "password123",
    };
    setCredentials(demoCredentials);
    postLogin(demoCredentials);
  };

  // ✅ Effect to handle success and navigate to checkout
  useEffect(() => {
    if (login.isSuccess) {
      alert("Login successful!"); // ✅ Show success message
      handleClose(); // ✅ Close the login modal
      navigate("/checkout"); // ✅ Redirect to the checkout page
    }
  }, [login.isSuccess, navigate, handleClose]);

  return (
    <>
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
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <Close />
          </IconButton>

          {/* Login Heading */}
          <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
            Login
          </Typography>

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Login Button */}
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
            Login
          </Button>

          {/* Register Link */}
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Don't have an account?{" "}
            <span style={{ color: "blue", cursor: "pointer" }} onClick={handleOpenRegister}>
              Register
            </span>
          </Typography>

          {/* Demo Account Button */}
          <Button fullWidth variant="contained" color="error" sx={{ mt: 1 }} onClick={handleDemoLogin}>
            Use Demo Account
          </Button>
        </Box>
      </Modal>

      {/* Register Modal */}
      <RegisterPage open={openRegister} handleClose={() => setOpenRegister(false)} />
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
