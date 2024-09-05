
import React, { useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/NavBar/Navbar";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info"; // Add description icon
import Tooltip from "@mui/material/Tooltip"; // Add Tooltip component
import VisibilityIcon from "@mui/icons-material/Visibility"; // Eye icon for proof
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; //Eye off icon for no proof
import {
  Typography,
  Button,
  Grid,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Checkbox,
  Tabs,
  Tab
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import search icon
import TextField from "@mui/material/TextField"; // Input fields
import RemarksModal from "../Components/PendingApproval/RemarksModal";
import {
  useFetchParticipation,
  usePostApprovalStatus,
} from "../Components/CustomHooks/CustomHooks";
import { FaSync } from "react-icons/fa";

const PendingApproval = () => {
  const [currentPage, setCurrentPage] = useState(0); // Start with page 0
  const [pageSize, setPageSize] = useState(8); // Default page size is 4
  const [approvalStatus, setApprovalStatus] = useState<string | null>(
    "pending"
  );
  const [sortBy, setSortBy] = useState<string | null>("");
  const [refreshPage, setRefreshPage] = useState<number>(0);
  const [activityName, setActivityName] = useState<string | null>("");
  const [firstName, setFirstName] = useState<string | null>("");
  const [lastName, setLastName] = useState<string | null>("");
  const [employeeId, setEmployeeId] = useState<string | null>("");
  const { participation, pagination, loading, error } = useFetchParticipation(
    `/api/v1/participation/search?approvalStatus=${approvalStatus}&activityName=${activityName}&employeeId=${employeeId}&firstName=${firstName}&lastName=${lastName}&pageNumber=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=desc`,
    refreshPage
  );
  console.log(participation);
  const { postApprovalStatus } = usePostApprovalStatus(); // Custom hook for posting

  const totalPages = pagination ? pagination.totalPages : 1;

  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedPanels, setSelectedPanels] = useState<number[]>([]); // Track selected panels by id
  const [remarksModalOpen, setRemarksModalOpen] = useState(false);
  const [selectedParticipation, setSelectedParticipation] = useState<
    number | null
  >(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false); // State for action loading
  const [proofDialogOpen, setProofDialogOpen] = useState(false);
  const [selectedProofUrl, setSelectedProofUrl] = useState<string | null>(null);
  const [searchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  // Function to clear all text fields
  const clearFields = () => {
    setActivityName("");
    setFirstName("");
    setLastName("");
    setEmployeeId("");
  };
  console.log(selectedPanels);
  // Handle opening and closing the search dialog
  const handleSearchIconClick = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };

  // Handle search submission
  // const handleSearch = () => {
  //   // setActivityName(tempActivityName);
  //   setRefreshPage((prev) => prev + 1); // Trigger API call
  //   setSearchDialogOpen(false); // Close the dialog
  // };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameParts = e.target.value.split(" ");
    if (nameParts.length >= 1) {
      setFirstName(nameParts[0]);
      setLastName(nameParts.slice(1)?.join(" ")); // Join remaining parts in case of middle names
    } else {
      setFirstName(nameParts[0]);
      setLastName(null);
    }
    setFullName(e.target.value);
  };

  const handleProofClick = (proofUrl: string | null) => {
    setSelectedProofUrl(proofUrl);
    setProofDialogOpen(true);
  };

  const handleChange =
    (panelId: number) =>
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? `panel${panelId}` : false);
    };

  const handleApprove = async (id: number) => {
    setActionLoading(true); // Start loading animation
    try {
      const currentDate = new Date().toISOString(); // Generate the current date and time
      await postApprovalStatus(id, "approved", null, currentDate); // Pass current date
      setRefreshPage((prev) => prev + 1); // Refresh page after action
    } catch (error) {
      console.error("Approval failed", error);
    } finally {
      setActionLoading(false); // Stop loading animation
    }
  };

  const handleReject = (id: number) => {
    setSelectedParticipation(id);
    setRemarksModalOpen(true);
  };

  const handleSubmitRemarks = async (remarks: string) => {
    setActionLoading(true); // Start loading animation
    try {
      const currentDate = new Date().toISOString();
      if (selectedParticipation !== null) {
        // Handle single rejection case
        await postApprovalStatus(
          selectedParticipation,
          "rejected",
          remarks,
          currentDate
        );
      } else {
        // Handle multiple rejections for selected panels
        for (const panelId of selectedPanels) {
          await postApprovalStatus(panelId, "rejected", remarks, currentDate);
        }
      }
      setRefreshPage((prev) => prev + 1); // Refresh page after action
      setRemarksModalOpen(false); // Close modal after submission
    } catch (error) {
      console.error("Rejection failed", error);
    } finally {
      setActionLoading(false); // Stop loading animation
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
    } else if (action === "reject") {
      handleReject(id);
    }
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
  const handleApproveSelected = async () => {
    setActionLoading(true);
    for (const panelId of selectedPanels) {
      try {
        await postApprovalStatus(
          panelId,
          "approved",
          null,
          new Date().toISOString()
        );
      } catch (error) {
        console.error("Approval failed for panel", panelId, error);
      } finally {
        setActionLoading(false);
      }
    }
    setRefreshPage((refresh) => refresh + 1);
  };

  const handleRejectSelected = () => {
    setSelectedParticipation(null); // Ensure single selection is reset
    // Open the remarks modal for entering remarks
    setRemarksModalOpen(true);
  };
  const handleSelectAll = () => {
    if (participation) {
      const allPanelIds = participation.map((item) => item.id);
      setSelectedPanels(allPanelIds);
    }
  };

  const handleDeselectAll = () => {
    setSelectedPanels([]);
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "pending") {
      setApprovalStatus("pending");
      setSortBy("participationDate");
    } else if (newValue === "approved") {
      setApprovalStatus("approved");
      setSortBy("approvalDate");
    } else if (newValue === "rejected") {
      setApprovalStatus("rejected");
      setSortBy("approvalDate");
    }
    setCurrentPage(0); // Reset to first page on tab change
  };

  if (loading || actionLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
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
              <Tabs value={approvalStatus} onChange={handleTabChange}>
                <Tab value="pending" label="Pending" />
                <Tab value="approved" label="Approved" />
                <Tab value="rejected" label="Rejected" />
              </Tabs>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {approvalStatus === "pending" && (
                  <>
                    <Button
                      variant="contained"
                      onClick={handleApproveSelected}
                      disabled={selectedPanels.length === 0 || actionLoading}
                    >
                      Approve Selected
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleRejectSelected}
                      disabled={selectedPanels.length === 0 || actionLoading}
                    >
                      Reject Selected
                    </Button>
                    <Checkbox
                      checked={
                        selectedPanels.length ===
                        (participation ? participation.length : 0)
                      }
                      onChange={(e) =>
                        e.target.checked
                          ? handleSelectAll()
                          : handleDeselectAll()
                      }
                    />
                  </>
                )}
                <SearchIcon
                  sx={{ cursor: "pointer" }}
                  onClick={handleSearchIconClick}
                />
              </Box>
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
                expanded={false} // Prevent expansion
              >
                <AccordionSummary
                  aria-controls={`panel${item.id}-content`}
                  id={`panel${item.id}-header`}
                  onClick={() => handleSelectPanel(item.id)} // Only handle panel selection
                  sx={{ cursor: "default" }} // Prevent pointer cursor, indicating no expansion
                >
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Typography>
                        {item.employeeFirstName} {item.employeeLastName}
                      </Typography>
                      <Typography>EmpId: {item.employeeId}</Typography>{" "}
                      {/* Moved under the name */}
                    </Grid>
                    <Grid item xs={12} sm={3} textAlign="center">
                      <Typography>{item.activityName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="center">
                      {/* <Typography>{item.duration} minutes</Typography> */}
                      <Typography>
                        {Math.floor(item.duration / 60) > 0 &&
                          `${Math.floor(item.duration / 60)} hour `}
                        {item.duration % 60 > 0 && `${item.duration % 60} min`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="center">
                      <Typography>
                        {approvalStatus === "pending"
                          ? new Date(item.participationDate).toLocaleDateString(
                              "en-GB"
                            )
                          : new Date(item.approvalDate).toLocaleDateString(
                              "en-GB"
                            )}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="right">
                      <>
                        {item.proofUrl ? (
                          <VisibilityIcon
                            sx={{ cursor: "pointer", mr: 1 }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleProofClick(item.proofUrl);
                            }}
                          />
                        ) : (
                          <VisibilityOffIcon
                            sx={{ cursor: "pointer", mr: 1 }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleProofClick(null);
                            }}
                          />
                        )}
                        <Tooltip
                          title={
                            item.description?.length > 0
                              ? item.description
                              : "Description is not provided"
                          }
                          arrow
                        >
                          <InfoIcon sx={{ cursor: "pointer", mr: 5 }} />
                        </Tooltip>
                        {approvalStatus === "pending" && (
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
                      </>
                    </Grid>
                  </Grid>
                </AccordionSummary>
              </Accordion>
            ))}
            <Dialog
              open={searchDialogOpen}
              onClose={handleSearchDialogClose}
              sx={{ position: "absolute", left: "80%", top: "-25%" }}
            >
              <DialogTitle>
                Search
                <FaSync
                  style={{
                    cursor: "pointer",
                    float: "right",
                    marginTop: "8px",
                    marginRight: "8px",
                  }}
                  onClick={clearFields}
                />
              </DialogTitle>
              <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Activity Name"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Full Name (First Last)"
                    value={fullName}
                    onChange={handleFullNameChange}
                    fullWidth
                  />
                  <TextField
                    label="Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    fullWidth
                  />
                </Box>
              </DialogContent>
            </Dialog>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                Previous Page
              </Button>
              <Typography>
                Page {currentPage + 1} of {totalPages}
              </Typography>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Next Page
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />

      {/* Remarks Modal */}
      <RemarksModal
        open={remarksModalOpen}
        onClose={() => setRemarksModalOpen(false)}
        onSubmit={handleSubmitRemarks}
      />

      {/* Proof Dialog */}
      <Dialog
        open={proofDialogOpen}
        onClose={() => setProofDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Attachments</DialogTitle>
        <DialogContent>
          {selectedProofUrl ? (
            <img src={selectedProofUrl} alt="Proof" style={{ width: "100%" }} />
          ) : (
            <Typography>No attachment available.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PendingApproval;
