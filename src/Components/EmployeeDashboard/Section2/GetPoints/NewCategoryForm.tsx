import {
  Box,
  Button,
  TextField,
  Typography,
  DialogContent,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';


const RequestCategoryForm = () =>{
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Box
        sx={{
          backgroundColor: '#121212',
          color: '#fff',
          borderRadius: isSmallScreen ? 0 : '16px',
          padding: theme.spacing(2),
          paddingBottom: theme.spacing(12),
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold',paddingLeft:'40px'}}>
            Request new category
          </Typography>
        </Box>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              fullWidth
              variant="filled"
              label="Type your category"
              InputProps={{
                style: {
                  backgroundColor: '#1E1E1E',
                  borderRadius: '8px',
                  color: '#fff',
                },
              }}
              InputLabelProps={{
                style: { color: '#aaa' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Type your activity"
              InputProps={{
                style: {
                  backgroundColor: '#1E1E1E',
                  borderRadius: '8px',
                  color: '#fff',
                },
              }}
              InputLabelProps={{
                style: { color: '#aaa' },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Description"
              multiline
              rows={4}
              InputProps={{
                style: {
                  backgroundColor: '#1E1E1E',
                  borderRadius: '8px',
                  color: '#fff',
                },
              }}
              InputLabelProps={{
                style: { color: '#aaa' },
              }}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#3F51B5',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#3F51B5',
              },
            }}
          >
            Submit
          </Button>
        </DialogContent>
      </Box>
   
  );
};

export default RequestCategoryForm;
