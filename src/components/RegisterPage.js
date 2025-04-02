import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Close,
  Visibility,
  VisibilityOff,
  Email,
  Person,
} from "@mui/icons-material";
import { userRegister } from "../redux/action/action";

const RegisterPage = ({ open, handleClose, userRegister,user }) => {
  // State for input fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setErrorMessage("");

    // Send data to backend
    try {
      await userRegister(formData);
      alert("✅ Registration successful!");
      handleClose(); // Close modal after successful registration
    } catch (error) {
      setErrorMessage("❌ Registration failed! Try again.");
    }
  };

  console.log("USER",user)

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <Close />
        </IconButton>

        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
        >
          Register
        </Typography>

        {/* Name Input */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          placeholder="John Doe"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        {/* Email Input */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          placeholder="example@gmail.com"
          required
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
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
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

        {/* Confirm Password Input */}
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Error Message */}
        {errorMessage && (
          <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
            {errorMessage}
          </Typography>
        )}

        {/* Register Button */}
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>

        {/* Already have an account? Log In */}
        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          Already have an account?{" "}
          <span style={{ color: "blue", cursor: "pointer" }}>Log In</span>
        </Typography>
      </Box>
    </Modal>
  );
};

// Redux Connection
const mapStateToProps = (state) => ({
  user: state.UserRegister || {},
});

const mapDispatchToProps = (dispatch) => ({
  userRegister: (payload) => dispatch(userRegister(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
