import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

interface RemarksModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (remarks: string) => void;
}

const RemarksModal: React.FC<RemarksModalProps> = ({ open, onClose, onSubmit }) => {
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    onSubmit(remarks);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: "8px",
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Enter Remarks
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default RemarksModal;
