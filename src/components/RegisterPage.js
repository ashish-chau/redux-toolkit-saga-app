import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Close, Visibility, VisibilityOff, Email, Person } from "@mui/icons-material";

const RegisterPage = ({ open, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
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
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <Close />
        </IconButton>

        {/* Register Heading */}
        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
          Register
        </Typography>

        {/* Name Input */}
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          placeholder="John Doe"
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
          type="email"
          margin="normal"
          placeholder="example@gmail.com"
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
          type={showPassword ? "text" : "password"}
          margin="normal"
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
          type={showConfirmPassword ? "text" : "password"}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Register Button */}
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>

        {/* Already have an account? Log In */}
        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          Already have an account? <span style={{ color: "blue", cursor: "pointer" }}>Log In</span>
        </Typography>
      </Box>
    </Modal>
  );
};

export default RegisterPage;
