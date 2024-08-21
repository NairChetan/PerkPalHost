import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import { useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

const Club_Edit_Button = () => {
  const [open, setOpen] = useState<boolean>(false);
  const refOne = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState([
    { club: "Bronze", initial: 0, final: 200, isEditing: false },
    { club: "Silver", initial: 201, final: 400, isEditing: false },
    { club: "Gold", initial: 401, final: 1000, isEditing: false },
  ]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRow = () => {
    setRows([...rows, { club: "", initial: 0, final: 0, isEditing: true }]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleEditRow = (index: number) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, isEditing: true } : row
    );
    setRows(updatedRows);
  };

  const handleSaveRow = (index: number, editedRow: any) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...editedRow, isEditing: false } : row
    );
    setRows(updatedRows);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen((open) => !open)}
        sx={{
          px: "5%",
          width: "100%",
          height: "20%",
          backgroundColor: "#ffe1e1",
          color: "#831919",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          borderRadius: 7,
          boxShadow: 1,
          fontWeight: 700,
          fontSize: {
            xs: "5.5vw",
            sm: "2.5vw",
            md: "2.5vw",
            lg: "1.15vw",
            xl: "1.15vw",
          },
          "&:hover": {
            backgroundColor: "#dba2a2",
            color: "#5a1a1a",
          },
        }}
      >
        <Box
          sx={{
            width: "25%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: {
              xs: "20vw",
              sm: "7vw",
              md: "7vw",
              lg: "4vw",
              xl: "4vw",
            },
          }}
        >
          <EditIcon fontSize="inherit" />
        </Box>
        Club Edit
      </Button>
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "100",
            width: {
              xs: "90vw",
              sm: "90vw",
              md: "70vw",
              lg: "50vw",
              xl: "50vw",
            },
            height: "auto",
            maxHeight: "90vh",
            background: "#1D1E22",
            borderRadius: "50px",
            padding: "2rem",
            overflowY: "auto",
          }}
          ref={refOne}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Heading */}
          <Typography
            variant="h3"
            sx={{ color: "#fff", textAlign: "left", mb: 2 }}
          >
            Clubs
          </Typography>

          {/* Table */}
          <Table sx={{ padding: "1rem", color: "#fff" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Clubs</TableCell>
                <TableCell sx={{ color: "#fff" }}>Initial Threshold</TableCell>
                <TableCell sx={{ color: "#fff" }}>Final Threshold</TableCell>
                <TableCell sx={{ color: "#fff" }}>Save/Edit</TableCell>
                <TableCell sx={{ color: "#fff" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {row.isEditing ? (
                    <>
                      <TableCell>
                        <TextField
                          value={row.club}
                          onChange={(e) =>
                            handleInputChange(index, "club", e.target.value)
                          }
                          sx={{ 
                            input: { color: "#fff" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#fff" },
                              "&:hover fieldset": { borderColor: "#fff" },
                              "&.Mui-focused fieldset": { borderColor: "#fff" },
                            }
                          }}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={row.initial}
                          onChange={(e) =>
                            handleInputChange(index, "initial", e.target.value)
                          }
                          sx={{ 
                            input: { color: "#fff" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#fff" },
                              "&:hover fieldset": { borderColor: "#fff" },
                              "&.Mui-focused fieldset": { borderColor: "#fff" },
                            }
                          }}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={row.final}
                          onChange={(e) =>
                            handleInputChange(index, "final", e.target.value)
                          }
                          sx={{ 
                            input: { color: "#fff" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#fff" },
                              "&:hover fieldset": { borderColor: "#fff" },
                              "&.Mui-focused fieldset": { borderColor: "#fff" },
                            }
                          }}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleSaveRow(index, row)}
                        >
                          <SaveIcon sx={{ color: "#fff" }} />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell sx={{ color: "#fff" }}>{row.club}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {row.initial}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>{row.final}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        <IconButton onClick={() => handleEditRow(index)}>
                          <EditIcon sx={{ color: "#fff" }} />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
                  <TableCell sx={{ color: "#fff" }}>
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <DeleteIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add Row Button */}
          <IconButton
            onClick={handleAddRow}
            sx={{
              color: "#fff",
              display: "flex",
              marginTop: "1rem", // Add some space between the table and the button
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default Club_Edit_Button;
