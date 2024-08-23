// src/components/LoginForm.tsx
import React from "react";
import {Button, Box, Typography } from "@mui/material";
import MicrosoftIcon from '@mui/icons-material/Microsoft';

const LoginForm: React.FC = () => {
  return (
    <Box
    sx={{
      width: "100%",
      maxWidth: 400,
      mx: "auto",
      py: 2,
      px: 3,
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      textAlign: "center", // Center the text inside the box
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      Sign In Using Microsoft
    </Typography>

    <Button
      fullWidth
      variant="contained"
      startIcon={<MicrosoftIcon />}
      sx={{
        mt: 2,
        backgroundColor: "#0078D4", // Microsoft blue
        color: "#fff",
        fontWeight: "bold",
        fontSize: "16px",
        textTransform: "none", // To keep the button text case consistent
        borderRadius: "4px", // Rounded corners like the Microsoft button
        '&:hover': {
          backgroundColor: "#005A9E", // Darker shade on hover
        },
      }}
    >
      Sign in with Microsoft
    </Button>
  </Box>
  );
};

export default LoginForm;
