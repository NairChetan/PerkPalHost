import React from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import Leaderboard from '../Components/EmployeeDashboard/LeaderBoard';
 
const GridExample = () => {
  return (
<Box sx={{ flexGrow: 1, padding: 2 }}>
<Grid container spacing={2} justifyContent="center" alignItems="center">
<Grid item xs={12} lg={3}>
<Paper sx={{ padding: 2 }}>
    <Leaderboard/>
</Paper>
</Grid>
<Grid item xs={12} lg={3}>
<Paper sx={{ padding: 2 }}>
<Typography variant="h6" align="center">
              Grid Item 1
</Typography>
</Paper>
</Grid>
<Grid item xs={12} lg={3}>
<Paper sx={{ padding: 2 }}>
<Typography variant="h6" align="center">
              Grid Item 2
</Typography>
</Paper>
</Grid>
<Grid item xs={12} lg={3}>
<Paper sx={{ padding: 2 }}>
<Typography variant="h6" align="center">
              Grid Item 2
</Typography>
</Paper>
</Grid>
</Grid>
</Box>
  );
};
 
export default GridExample;