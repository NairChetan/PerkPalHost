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
import RemarksModal from "../Components/PendingApproval/RemarksModal"; // Adjust the path accordingly
import {
  useFetchParticipation,
  usePostApprovalStatus,
} from "../Components/CustomHooks/CustomHooks"; // Adjust the path accordingly

const PendingApproval = () => {
  const [currentPage, setCurrentPage] = useState(0); // Start with page 0
  const [pageSize] = useState(4); // Page size
  const[refreshPage,setRefreshPage] = useState<number>(0);
  const { participation, pagination, loading, error } = useFetchParticipation(
    `/api/v1/participation/pending-approval?pageNumber=${currentPage}&pageSize=${pageSize}&sortBy=participationDate&sortDir=desc`
  ,refreshPage);
  const { postApprovalStatus } = usePostApprovalStatus(); // Custom hook for posting

  const totalPages = pagination ? pagination.totalPages : 1;

  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedPanels, setSelectedPanels] = useState<number[]>([]); // Track selected panels by id
  const [selectAll, setSelectAll] = useState(false);
  const [remarksModalOpen, setRemarksModalOpen] = useState(false);
  const [selectedParticipation, setSelectedParticipation] = useState<
    number | null
  >(null);


  const handleChange = (panelId: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? `panel${panelId}` : false);
  };

  const handleApprove = async (id: number) => {
    try {
      await postApprovalStatus(id, "approved", null);
      // Optionally refetch participation data here if needed
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  const handleReject = (id: number) => {
    setSelectedParticipation(id);
    setRemarksModalOpen(true);
  };

  const handleSubmitRemarks = async (remarks: string) => {
    if (selectedParticipation !== null) {
      try {
        await postApprovalStatus(selectedParticipation, "rejected", remarks);
        // Optionally refetch participation data here if needed
        setRemarksModalOpen(false); // Close modal after submission
      } catch (error) {
        console.error("Rejection failed", error);
      }
    }
  };

  const handleIconClick = (
    event: React.MouseEvent,
    id: number,
    action: "approve" | "reject"
  ) => {
    event.stopPropagation(); // Prevents the accordion from expanding
    if (action === "approve") {
      handleApprove(id);
      setRefreshPage((prev)=>prev+1);
    } else if (action === "reject") {
      handleReject(id);
      setRefreshPage((prev)=>prev+1)
    }
  };

  const handleSelectAll = () => {
    const allPanelIds = (participation || []).map(item => item.id);
    if (selectAll) {
      setSelectedPanels([]); // Deselect all
    } else {
      setSelectedPanels(allPanelIds); // Select all panels
    }
    setSelectAll(!selectAll);
  };

  const handleSelectPanel = (panelId: number) => {
    if (selectedPanels.includes(panelId)) {
      setSelectedPanels(selectedPanels.filter((id) => id !== panelId));
    } else {
      setSelectedPanels([...selectedPanels, panelId]);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

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
            {participation?.map((item) => (
              <Accordion
                key={item.id}
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  boxShadow: "12%",
                  mb: 2,
                  backgroundColor: selectedPanels.includes(item.id)
                    ? "#e0f7fa"
                    : "white",
                }}
                expanded={expanded === `panel${item.id}`}
                onChange={handleChange(item.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${item.id}-content`}
                  id={`panel${item.id}-header`}
                  onClick={() => handleSelectPanel(item.id)}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Typography>
                        {item.employeeFirstName} {item.employeeLastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="center">
                      <Typography>EmpId:{item.employeeId}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="center">
                      <Typography>{item.activityName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="center">
                      <Typography>{item.duration} minutes</Typography>
                    </Grid>
                    <Grid item xs={12} sm={1} textAlign="right">
                      {expanded !== `panel${item.id}` && (
                        <>
                          <CheckCircleIcon
                            color="success"
                            sx={{ cursor: "pointer" }}
                            onClick={(event) =>
                              handleIconClick(event, item.id, "approve")
                            }
                          />
                          <CancelIcon
                            color="error"
                            sx={{ ml: 1, cursor: "pointer" }}
                            onClick={(event) =>
                              handleIconClick(event, item.id, "reject")
                            }
                          />
                        </>
                      )}
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {item.description || "No additional details"}
                  </Typography>
                  {expanded === `panel${item.id}` && (
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
                        onClick={() => handleApprove(item.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => handleReject(item.id)}
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
              <Button disabled={currentPage === 0} onClick={handlePrevPage}>
                Previous
              </Button>
              <Typography>
                Page {currentPage + 1} of {totalPages}
              </Typography>
              <Button onClick={handleNextPage}>Next</Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
      <RemarksModal
        open={remarksModalOpen}
        onClose={() => setRemarksModalOpen(false)}
        onSubmit={handleSubmitRemarks}
      />
    </>
  );
};

export default PendingApproval;
