import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
  CircularProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFetchActivitiesForAdmin } from '../CustomHooks/CustomHooks'; // Adjust the import path
import { useDeleteActivity } from '../CustomHooks/CustomHooks'; // Adjust the import path
import AddNewActivity from '../Admin_Category/Button/AddNewActivity';
import UpdateActivityButton from './Button/UpdateActivityButton';
const CategoriesTable: React.FC = () => {
  const { activities, loading, error } = useFetchActivitiesForAdmin();
  const { deleteActivity, loading: deleteLoading, error: deleteError } = useDeleteActivity();
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const rowsPerPage = 4;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setDialogOpen(true);
    
  };

  const handleConfirmDelete = async () => {
    if (selectedId !== null) {
      const success = await deleteActivity(selectedId);
      setDialogOpen(false);
      if (success) {
        setSnackbarOpen(true); // Show success message
      }
    }
    window.location.reload();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return (
    <Box
      sx={{
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box
      sx={{
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Typography color="error">{error}</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      <TableContainer 
        component={Paper} 
        component={Paper} 
  sx={{ 
    width: '100%', 
    maxWidth: '1200px', 
    height: 'calc(100vh - 292px)',
    overflowX: 'auto',
    overflowY: 'auto',
    borderRadius: '10px',
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
    >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
              <TableCell sx={{ padding: '8px' }}><strong>Activity</strong></TableCell>
              <TableCell sx={{ padding: '8px' }}><strong>Category</strong></TableCell>
              <TableCell sx={{ padding: '8px' }}><strong>Description</strong></TableCell>
              <TableCell sx={{ padding: '8px' }}><strong>Points Per Hour</strong></TableCell>
              <TableCell align="center" sx={{ padding: '8px' }}><strong>Save/Edit</strong></TableCell>
              <TableCell align="center" sx={{ padding: '8px' }}><strong>Delete</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{
                  height: '40px',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5'
                }}
              >
                <TableCell sx={{ padding: '8px' }}>{row.activityName}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{row.categoryName}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{row.description}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{row.weightagePerHour}</TableCell>
                <TableCell align="center" sx={{ padding: '8px' }}>
                  <IconButton size="small" sx={{ color: "#616161" }}>
                  <UpdateActivityButton activityId={row.id} />
                  </IconButton>
                </TableCell>
                <TableCell align="center" sx={{ padding: '8px' }}>
                  <IconButton size="small" sx={{ color: "#E60124" }} onClick={() => handleDeleteClick(row.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ height: '10px', backgroundColor: '#ffffff' }}>
              <TableCell colSpan={6} align="right" sx={{ paddingTop: '3px',paddingRight:'50px' }}>
                <IconButton color="primary" size="small">
                  <AddNewActivity/>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={activities ? activities.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        sx={{ backgroundColor: '#fffff', width: '100%', overflow: 'hidden' }}
      />
      
      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this activity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" disabled={deleteLoading}>
            {deleteLoading ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Activity deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoriesTable;
