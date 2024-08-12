// src/components/LoginForm.tsx
import React from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";

const LoginForm: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        // Reduced top margin to decrease overall height
        py: 1,
        px: 2, // Reduced padding to decrease overall height
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6">Sign In</Typography>
      <TextField
        fullWidth
        size="small"
        label="Email"
        variant="outlined"
        margin="dense"
        InputLabelProps={{
          shrink: true,
          sx: {
            top: "0px", // Adjust the label position
            fontSize: "1rem", // Adjust label font size if necessary
          },
        }}
        sx={{
          "& .MuiInputBase-root": {
            height: "32px", // Adjust the height of the input
          },
          "& .MuiOutlinedInput-root": {
            height: "32px", // Ensure the input field height matches
          },
        }}
      />
      <TextField
        fullWidth
        size="small"
        label="Password"
        variant="outlined"
        margin="dense"
        type="password"
        InputLabelProps={{
          shrink: true,
          sx: {
            top: "0px", // Adjust the label position
            fontSize: "1rem", // Adjust label font size if necessary
          },
        }}
        sx={{
          "& .MuiInputBase-root": {
            height: "32px", // Adjust the height of the input
          },
          "& .MuiOutlinedInput-root": {
            height: "32px", // Ensure the input field height matches
          },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 1, backgroundColor: "#333", color: "#fff" }}
      >
        Sign In
      </Button>
      <Box textAlign="center" mt={1}>
        <Link href="#" variant="body2" sx={{ color: "black" }}>
          Forgot password?
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
