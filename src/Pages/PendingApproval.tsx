import React, { useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/NavBar/Navbar";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Typography,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const PendingApproval = () => {

  const [expanded, setExpanded] = useState<string | false>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of accordion items per page
  const [selectedPanels, setSelectedPanels] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleApprove = (name: string) => {
    console.log(`${name} approved`);
  };

  const handleReject = (name: string) => {
    console.log(`${name} rejected`);
  };

  const handleIconClick = (
    event: React.MouseEvent,
    name: string,
    action: "approve" | "reject"
  ) => {
    event.stopPropagation(); // Prevents the accordion from expanding
    if (action === "approve") {
      handleApprove(name);
    } else if (action === "reject") {
      handleReject(name);
    }
  };

  const handleSelectAll = () => {
    const allPanels = names.map((_, index) => `panel${index + 1}`);
    if (selectAll) {
      setSelectedPanels([]);
    } else {
      setSelectedPanels(allPanels);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectPanel = (panel: string) => {
    if (selectedPanels.includes(panel)) {
      setSelectedPanels(selectedPanels.filter((item) => item !== panel));
    } else {
      setSelectedPanels([...selectedPanels, panel]);
    }
  };

  const names = [
    "Alby Kennady",
    "Rithik Ramachandran",
    "Sarath Sasi",
    "Sanjay Nair",
    "John Doe",
    "Jane Smith",
    "Ajin KJ",
    "Sahir Nisar",
    "Sreeson N",
    "Vibijith Kongat",
    "Abhiram S Anand",
  ];
  const totalPages = Math.ceil(names.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = names.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "78vh",
          backgroundColor: "#f3f3f3",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            //p: { xs: 2, sm: 4 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "90%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              p: 2,
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mb: 2,
              }}
            >
              <Typography variant="h5">Pending Approvals</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAll}
                    color="primary"
                  />
                }
                label="Select All"
              />
            </Box>
            {currentItems.map((name, index) => (
              <Accordion
                key={index}
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  boxShadow: "12%",
                  mb: 2,
                  backgroundColor: selectedPanels.includes(`panel${index + 1}`)
                    ? "#e0f7fa"
                    : "white",
                }}
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}bh-content`}
                  id={`panel${index + 1}bh-header`}
                  onClick={() => handleSelectPanel(`panel${index + 1}`)}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Typography>{name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="center">
                      <Typography>emp{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="center">
                      <Typography>ILP Mentorship</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="center">
                      <Typography>10 hours</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="center">
                      <Typography>10-08-2024</Typography>
                    </Grid>
                    <Grid item xs={12} sm={1} textAlign="right">
                      {expanded !== `panel${index + 1}` && (
                        <>
                          <CheckCircleIcon
                            color="success"
                            sx={{ cursor: "pointer" }}
                            onClick={(event) =>
                              handleIconClick(event, name, "approve")
                            }
                          />
                          <CancelIcon
                            color="error"
                            sx={{ ml: 1, cursor: "pointer" }}
                            onClick={(event) =>
                              handleIconClick(event, name, "reject")
                            }
                          />
                        </>
                      )}
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Details about {name}'s ILP Mentorship program.
                  </Typography>
                  {expanded === `panel${index + 1}` && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ ml: 1 }}
                        onClick={() => handleApprove(name)}
                      >
                        Agree
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => handleReject(name)}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mt: 2,
              }}
            >
              <Button disabled={currentPage === 1} onClick={handlePrevPage}>
                Previous
              </Button>
              <Typography>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default PendingApproval;
