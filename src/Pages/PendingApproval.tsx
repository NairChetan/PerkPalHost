import React, { useState, useRef, useCallback, useEffect } from "react";
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
  Tab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import search icon
import TextField from "@mui/material/TextField"; // Input fields
import RemarksModal from "../Components/PendingApproval/RemarksModal";
import {
  participationDataForPendingApproval,
  useFetchParticipation,
  usePostApprovalStatus,
} from "../Components/CustomHooks/CustomHooks";
import { FaSync } from "react-icons/fa";

const PendingApproval = () => {
  // const [participation, setParticipation] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Start with page 0
  const [pageSize, setPageSize] = useState(16); // Default page size is 4
  const [approvalStatus, setApprovalStatus] = useState<string | null>(
    "pending"
  );
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string | null>("");
  const [refreshPage, setRefreshPage] = useState<number>(0);
  const [activityName, setActivityName] = useState<string | null>("");
  const [firstName, setFirstName] = useState<string | null>("");
  const [lastName, setLastName] = useState<string | null>("");
  const [employeeId, setEmployeeId] = useState<string | null>("");
  const { participation, pagination, loading, error } = useFetchParticipation(
    `/api/v1/participation/search?approvalStatus=${approvalStatus}&activityName=${activityName}&employeeId=${employeeId}&firstName=${firstName}&lastName=${lastName}&pageNumber=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=desc`,
    refreshPage,
    isLoadingMore, // Pass isLoadingMore state
    setIsLoadingMore
  );
  console.log(participation);
  const [allParticipation, setAllParticipation] = useState<any[] | []>([]);
  useEffect(() => {
    if (participation && participation.length > 0) {
      setAllParticipation((prevParticipation) => {
        // Create a Set to track unique IDs (or other unique properties)
        const existingIds = new Set(prevParticipation.map(item => item.id)); // Assuming 'id' is the unique identifier
        
        // Filter out duplicates from the new participation data
        const newUniqueParticipation = participation.filter(item => !existingIds.has(item.id));
  
        // Return the updated state with only unique items
        return [...prevParticipation, ...newUniqueParticipation];
      });
    }
  }, [participation]);
  const { postApprovalStatus } = usePostApprovalStatus(); // Custom hook for posting

  const totalPages = pagination ? pagination.totalPages : 1;

  // const [expanded, setExpanded] = useState<string | false>(false);
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
  const bottomBoundaryRef = useRef(null);
  // Function to clear all text fields
  const clearFields = () => {
    setCurrentPage(0);
    setAllParticipation([]);
    setActivityName("");
    setFirstName("");
    setLastName("");
    setEmployeeId("");
    setSelectedPanels([]);
  };
  console.log(selectedPanels);
  // Handle opening and closing the search dialog
  const handleSearchIconClick = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };
  const handleActivityChange = (e) => {
    setSelectedPanels([]);
    setAllParticipation([]);
    setCurrentPage(0);
    setActivityName(e.target.value);
  }
  
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

  // const handleChange =
  //   (panelId: number) =>
  //   (_event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? `panel${panelId}` : false);
  //   };

  const handleApprove = async (id: number) => {
    setActionLoading(true); // Start loading animation
    setSelectedPanels([]);
    try {
      const currentDate = new Date().toISOString(); // Generate the current date and time
      await postApprovalStatus(id, "approved", null, currentDate); // Pass current date
      setRefreshPage((prev) => prev + 1); // Refresh page after action
    } catch (error) {
      console.error("Approval failed", error);
    } finally {
      setActionLoading(false); // Stop loading animation
      setAllParticipation([]);
      setCurrentPage(0);
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
      setSelectedPanels([]);
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

  const loadMoreItems = useCallback(() => {
    if (currentPage < totalPages - 1 && !loading) {
      handleNextPage();
      setIsLoadingMore(true);
    }
  }, [currentPage, totalPages, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Only trigger if the bottomBoundaryRef is intersecting
      // and we have existing participation data loaded
      if (entries[0].isIntersecting && !loading && participation.length > 0) {
        const timeoutId = setTimeout(() => {
          loadMoreItems();
        }, 500); // 1000 ms delay

        // Cleanup the timeout if the component unmounts or the observer conditions change
        return () => clearTimeout(timeoutId); // Trigger the fetch only if not already loading and we have data
      }
    });
  
    const currentElement = bottomBoundaryRef.current;
  
    if (currentElement) {
      observer.observe(currentElement); // Start observing the bottom element
    }
  
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement); // Stop observing to prevent memory leaks
      }
    };
  }, [loading, participation, loadMoreItems]); 

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
        setSelectedPanels([]);
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
    if (allParticipation) {
      const allPanelIds = allParticipation.map((item) => item.id);
      setSelectedPanels(allPanelIds);
    }
  };

  const handleDeselectAll = () => {
    setSelectedPanels([]);
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "pending") {
      setAllParticipation([]);
      setCurrentPage(0);
      setApprovalStatus("pending");
      setSortBy("participationDate");
    } else if (newValue === "approved") {
      setAllParticipation([]);
      setApprovalStatus("approved");
      setSortBy("approvalDate");
    } else if (newValue === "rejected") {
      setAllParticipation([]);
      setApprovalStatus("rejected");
      setSortBy("approvalDate");
    }
    setCurrentPage(0); // Reset to first page on tab change
  };

  if (loading) {
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
                justifyContent: { xs: "center", sm: "space-between" }, // Center on small screens, space-between on larger screens
                alignItems: "center",
                width: "100%",
                mb: 2,
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                }, // Stack items vertically on small screens
              }}
            >
              <Tabs
                value={approvalStatus}
                onChange={handleTabChange}
                sx={{ mb: { xs: 2, sm: 0 } }}
              >
                <Tab value="pending" label="Pending" />
                <Tab value="approved" label="Approved" />
                <Tab value="rejected" label="Rejected" />
              </Tabs>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 2 }, // Adjust gap for different screen sizes
                  flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                  mb: { xs: 2, sm: 0 }, // Adjust margin-bottom for different screen sizes
                  justifyContent: { xs: "center", sm: "flex-start" }, // Center on small screens, left-align on larger screens
                }}
              >
                {approvalStatus === "pending" && (
                  <>
                    <Button
                      variant="contained"
                      onClick={handleApproveSelected}
                      disabled={selectedPanels.length === 0 || actionLoading}
                      sx={{
                        backgroundColor: "green",
                        "&:hover": { backgroundColor: "darkgreen" },
                        fontSize: { xs: "0.75rem", sm: "1rem" }, // Adjust font size for different screen sizes
                        px: { xs: 1, sm: 2 }, // Adjust padding for different screen sizes
                        mb: { xs: 1, sm: 0 }, // Adjust margin-bottom for different screen sizes
                      }}
                    >
                      Approve Selected
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleRejectSelected}
                      disabled={selectedPanels.length === 0 || actionLoading}
                      sx={{
                        backgroundColor: "red",
                        "&:hover": { backgroundColor: "darkred" },
                        fontSize: { xs: "0.75rem", sm: "1rem" }, // Adjust font size for different screen sizes
                        px: { xs: 1, sm: 2 }, // Adjust padding for different screen sizes
                        mb: { xs: 1, sm: 0 }, // Adjust margin-bottom for different screen sizes
                      }}
                    >
                      Reject Selected
                    </Button>
                    <Checkbox
                      checked={
                        selectedPanels.length ===
                        (allParticipation ? allParticipation.length : 0)
                      }
                      onChange={(e) =>
                        e.target.checked
                          ? handleSelectAll()
                          : handleDeselectAll()
                      }
                      sx={{ mb: { xs: 2, sm: 0 } }} // Adjust margin-bottom for different screen sizes
                    />
                  </>
                )}
                <SearchIcon
                  sx={{
                    cursor: "pointer",
                    fontSize: { xs: "1.5rem", sm: "2rem" }, // Adjust icon size for different screen sizes
                    ml: { xs: 0, sm: 2 }, // Adjust margin-left for different screen sizes
                  }}
                  onClick={handleSearchIconClick}
                />
              </Box>
            </Box>
            {/* Add headers here */}
            <Grid container alignItems="center" sx={{ mb: 1 }}>
              <Grid
                item
                xs={12}
                sm={2}
                md={1.5}
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                }}
              >
                <Typography variant="h6" textAlign="left">
                  Name/Emp Id
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                md={3.3}
                lg={3.3}
                textAlign={"center"}
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                }}
              >
                <Typography variant="h6">Activity Name</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                md={2.3}
                lg={2.3}
                textAlign={"center"}
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                }}
              >
                <Typography variant="h6">Duration</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                lg={3}
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                }}
              >
                <Typography variant="h6" textAlign={"center"}>
                  {approvalStatus === "pending"
                    ? "Participation Date"
                    : approvalStatus === "approved"
                    ? "Approval Date"
                    : "Rejected Date"}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                md={1.5}
                lg={1.5}
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                }}
              >
                <Typography variant="h6" textAlign="left">
                  Actions
                </Typography>
              </Grid>
            </Grid>
            {/* </Box> */}
            {allParticipation?.map((item) => (
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
                    <Grid item xs={12} sm={3} md={2}>
                      <Typography textAlign="left">
                        {item.employeeFirstName} {item.employeeLastName} /{" "}
                        {item.employeeId}
                      </Typography>
                      {/* <Typography>EmpId: {item.employeeId}</Typography>{" "} */}
                      {/* Moved under the name */}
                    </Grid>
                    <Grid item xs={12} sm={3} textAlign="left">
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
                    <Grid item xs={12} sm={3} textAlign="center">
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
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      md={2}
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row", md: "row" }, // Stack vertically on extra-small screens, row on small and larger screens
                        alignItems: { xs: "flex-start", sm: "flex-end" }, // Align items to the start on extra-small screens, end on larger screens
                        gap: { xs: 1, sm: 1 }, // Add gap between items
                        mb: { xs: 2, sm: 0 }, // Margin-bottom for extra-small screens
                      }}
                    >
                      <>
                        <Box
                          sx={{
                            display: { xs: "flex", sm: "block" },
                            flexDirection: "column",
                            alignContent: "flex-end",
                            gap: 1,
                          }}
                        >
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
                            <InfoIcon sx={{ cursor: "pointer", mr: 1 }} />
                          </Tooltip>
                        </Box>
                        {approvalStatus === "pending" && (
                          <Box
                            sx={{
                              display: { xs: "flex", sm: "block" },
                              flexDirection: "column",
                              alignItems: "flex-end",
                              gap: 1,
                            }}
                          >
                            <CheckCircleIcon
                              color="success"
                              sx={{ cursor: "pointer" }}
                              onClick={(event) =>
                                handleIconClick(event, item.id, "approve")
                              }
                            />
                            <CancelIcon
                              color="error"
                              sx={{ cursor: "pointer", ml: 0 }}
                              onClick={(event) =>
                                handleIconClick(event, item.id, "reject")
                              }
                            />
                          </Box>
                        )}
                      </>
                    </Grid>
                  </Grid>
                </AccordionSummary>
              </Accordion>
            ))}
            {/* Loading Spinner (Displayed below the fetched items) */}
            {isLoadingMore && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
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
                    onChange={(e) => handleActivityChange(e)}
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
                    type="number" // Added this line to restrict input to numbers
                    fullWidth
                  />
                </Box>
              </DialogContent>
            </Dialog>
            {/* <Box
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
            </Box> */}
          </Box>
        </Box>
      </Box>
      <Footer />
      <div
        ref={bottomBoundaryRef}
        style={{ height: "20px", maxWidth: "100%", background: "transparent" }}
      />
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
