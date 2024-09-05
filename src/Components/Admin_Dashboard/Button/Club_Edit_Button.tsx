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
import { useState, useRef, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useFetchClubs, useCreateClub, useUpdateClub, useDeleteClub, ClubDtoForAdmin } from '../../CustomHooks/CustomHooks';

const Club_Edit_Button = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [localClubs, setLocalClubs] = useState<ClubDtoForAdmin[]>([]); // Local state for clubs
  const refOne = useRef<HTMLDivElement>(null);

  const { clubs, loading, error } = useFetchClubs();
  const { createClub } = useCreateClub();
  const { updateClub } = useUpdateClub();
  const { deleteClub } = useDeleteClub();

  useEffect(() => {
    if (clubs.length > 0) {
      setLocalClubs(clubs);
    }
  }, [clubs]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRow = () => {
    setLocalClubs([...localClubs, { clubName: "", initialThreshold: 0, finalThreshold: 0, createdBy: 0, clubDescription: null }]); // Add new club with default values
    setEditIndex(localClubs.length); // Set the new row as editable
  };

  const handleEditRow = (index: number) => {
    setEditIndex(index);
  };

  const handleSaveRow = async (index: number) => {
    const clubToSave = localClubs[index];
    const createdBy = localStorage.getItem("employeeId");
    if (createdBy) {
      const newClub = { ...clubToSave, createdBy: parseInt(createdBy, 10) };
      if (clubToSave.clubId) {
        await updateClub(clubToSave.clubId, newClub);
      } else {
        await createClub(newClub);
      }
      // Optionally refresh the club list or handle state updates
      setEditIndex(null);
    }
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedClubs = [...localClubs];
    updatedClubs[index] = {
      ...updatedClubs[index],
      [field]: value,
    };
    setLocalClubs(updatedClubs);
  };

  const handleDeleteRow = async (clubId: number) => {
    await deleteClub(clubId);
    // Optionally refresh the club list or handle state updates
    setLocalClubs(localClubs.filter(club => club.clubId !== clubId));
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
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

                // Custom scrollbar styles
                "&::-webkit-scrollbar": {
                  width: "7px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#2c2c2c",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#6c6c6c",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#9c9c9c",
                },
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
                    <TableCell sx={{ color: "#fff" }}>Club Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Initial Threshold</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Final Threshold</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Save/Edit</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {localClubs.map((club, index) => (
                    <TableRow key={club.clubId || index}>
                      {editIndex === index ? (
                        <>
                          <TableCell>
                            <TextField
                              value={club.clubName}
                              onChange={(e) =>
                                handleInputChange(index, "clubName", e.target.value)
                              }
                              sx={{
                                input: { color: "#fff" },
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": { borderColor: "#fff" },
                                  "&:hover fieldset": { borderColor: "#fff" },
                                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                                },
                              }}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={club.initialThreshold}
                              onChange={(e) =>
                                handleInputChange(index, "initialThreshold", e.target.value)
                              }
                              sx={{
                                input: { color: "#fff" },
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": { borderColor: "#fff" },
                                  "&:hover fieldset": { borderColor: "#fff" },
                                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                                },
                              }}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={club.finalThreshold}
                              onChange={(e) =>
                                handleInputChange(index, "finalThreshold", e.target.value)
                              }
                              sx={{
                                input: { color: "#fff" },
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": { borderColor: "#fff" },
                                  "&:hover fieldset": { borderColor: "#fff" },
                                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                                },
                              }}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleSaveRow(index)}>
                              <SaveIcon sx={{ color: "#fff" }} />
                            </IconButton>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell sx={{ color: "#fff" }}>{club.clubName}</TableCell>
                          <TableCell sx={{ color: "#fff" }}>{club.initialThreshold}</TableCell>
                          <TableCell sx={{ color: "#fff" }}>{club.finalThreshold}</TableCell>
                          <TableCell sx={{ color: "#fff" }}>
                            <IconButton onClick={() => handleEditRow(index)}>
                              <EditIcon sx={{ color: "#fff" }} />
                            </IconButton>
                          </TableCell>
                        </>
                      )}
                      <TableCell sx={{ color: "#fff" }}>
                        <IconButton onClick={() => handleDeleteRow(club.clubId || index)}>
                          <DeleteIcon sx={{ color: "#fff" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {editIndex === null && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Button
                          variant="outlined"
                          onClick={handleAddRow}
                          sx={{
                            borderColor: "#fff",
                            color: "#fff",
                            "&:hover": {
                              borderColor: "#fff",
                              color: "#fff",
                            },
                          }}
                        >
                          <AddIcon sx={{ color: "#fff", marginRight: "0.5rem" }} />
                          Add New Club
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Club_Edit_Button;
