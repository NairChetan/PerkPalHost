import React from 'react';
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
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Category {
  activity: string;
  category: string;
  description: string;
  pointsPerHour: number;
}

const categories: Category[] = [
  { activity: 'Facilitating Trainings Programs', category: 'ILP', description: 'training program for employees', pointsPerHour: 5 },
  { activity: 'Business Orientation Buddies', category: 'Training Programs', description: 'Mentor trainees during ILP', pointsPerHour: 10 },
  { activity: 'E-Learning', category: 'E-Learning Hours', description: 'Studying external course', pointsPerHour: 1 },
  { activity: 'Skill Matrix', category: 'External Certification updates', description: 'training program for employees', pointsPerHour: 5 },
  { activity: 'ILP', category: 'Participation in Weekly trainer connects/ Guidance to trainers', description: 'Mentor trainees during ILP', pointsPerHour: 2 },
  { activity: 'Training Programs', category: 'Participation in Trainings Programs', description: 'training program for employees', pointsPerHour: 0.5 },
];

const CategoriesTable: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 4;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        height: '70vh',
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
        sx={{ 
          width: '100%', 
          maxWidth: '1200px', 
          height: 'calc(100vh - 292px)',
          overflowX: 'auto',
          overflowY: 'auto',
          borderRadius: '10px',
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
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  height: '40px',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5'
                }}
              >
                <TableCell sx={{ padding: '8px' }}>{row.activity}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{row.category}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{row.description}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{row.pointsPerHour}</TableCell>
                <TableCell align="center" sx={{ padding: '8px' }}>
                  <IconButton size="small" sx={{ color: "#616161" }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center" sx={{ padding: '8px' }}>
                  <IconButton size="small" sx={{ color: "#616161" }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ height: '10px', backgroundColor: '#ffffff' }}>
              <TableCell colSpan={6}   align="center" sx={{ padding: '3px' }} >
                <IconButton color="primary" size="small">
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        sx={{ backgroundColor: '#fffff', width: '100%',overflow:'hidden' }}
      />
    </Box>
  );
};

export default CategoriesTable;
