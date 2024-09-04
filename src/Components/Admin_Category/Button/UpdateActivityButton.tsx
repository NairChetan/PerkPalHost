import React, { useState, useRef } from 'react';
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import UpdateActivity from "./UpdateActivity"; // Adjust the import path

interface UpdateActivityButtonProps {
  activityId: number;
}

const UpdateActivityButton: React.FC<UpdateActivityButtonProps> = ({ activityId }) => {
  const [open, setOpen] = useState<boolean>(false);
  const refOne = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button 
        variant="contained"
        onClick={() => setOpen(!open)} 
        sx={{
          px: "5%",
          marginLeft: '-19px',
          width: '100%',
          height: '45%',
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1976D2",
          boxShadow: 0,
          fontWeight: 700,
          fontSize: {
            xs: "4.7vw",
            sm: "2.8vw",
            md: "2.5vw",
            lg: "1vw",
            xl: "1vw",
          },
        }}
      >
        <EditIcon fontSize="small" />
      </Button>

      {open && (
        <Box sx={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backdropFilter: "blur(10px)", zIndex: 99 }} />
      )}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -53%)",
            zIndex: 100,
            border: "1px solid gray",
            width: '399px',
            height: "80vh",
            borderRadius: "15px",
            background: "#1D1E22",
            padding: "0%",
            color: "#FFFFFF",
            '@media (max-width: 320px)': { width: '300px' },
          }}
          ref={refOne}
        >
          <IconButton onClick={handleClose} sx={{ position: "absolute", top: "1rem", right: "1rem", color: "#fff" }}>
            <CloseIcon />
          </IconButton>
          <UpdateActivity activityId={activityId} />
        </Box>
      )}
    </>
  );
};

export default UpdateActivityButton;
