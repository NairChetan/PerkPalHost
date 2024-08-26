import { Box, Grid } from '@mui/material';
import Navbar from '../Components/NavBar/Navbar';
import Footer from '../Components/Footer/Footer';
import Points from '../Components/EmployeeDashboard/Section1/Points';
import RedeemablePoints from '../Components/EmployeeDashboard/Section2/RedeemablePoints';
import Leaderboard from '../Components/EmployeeDashboard/Section1/LeaderBoard';
import Clubs from '../Components/EmployeeDashboard/Section2/Clubs';
import EdTabs from '../Components/EmployeeDashboard/Section4/Tabs/EdTabs';

import { useFetchPoints } from '../Components/CustomHooks/CustomHooks';
import KnowYourCategory from '../Components/EmployeeDashboard/Button/KnowYourCategory';
import LogsAndGetPoints from '../Components/EmployeeDashboard/Button/LogsAndGetPoints';

const EmployeeDashboard = () => {
  const { points, loading, error } = useFetchPoints('/api/v1/employee/3/get-points');
  console.log(points);

  return (
    <>
      <Navbar />

      <Grid
        container
        sx={{
          width: '100%',
          height: {
            xs: 'auto',
            sm: 'auto',
            md: 'auto',
            lg: '78vh',
            xl: '78vh',
          },
          backgroundColor: '#f3f3f3',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: {
            xs: '4%',
            sm: '3%',
            md: '3%',
            lg: '2%',
            xl: '2%',
          },
          m: 0,
        }}
      >
        <Grid
          item
          sx={{
            width: {
              xs: '100%',
              sm: '48.5%',
              md: '48.5%',
              lg: '23%',
              xl: '23%',
            },
            height: {
              xs: '88vh',
              sm: '88vh',
              md: '88vh',
              lg: '90%',
              xl: '90%',
            },
            mt: {
              xs: '3%',
              sm: '3%',
              md: '3%',
              lg: 0,
              xl: 0,
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '30%',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'row',
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            {loading ? (
              <p>Loading points...</p>
            ) : error ? (
              <p>Error fetching points: {error.message}</p>
            ) : (
              <Points points={points} />
            )}
          </Box>

          {/* Leaderboard Section */}
          <Box
            sx={{
              width: '100%',
              height: '65%',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            <Leaderboard />
          </Box>
        </Grid>

        {/* Section 2 starts here */}
        <Grid
          item
          sx={{
            width: {
              xs: '100%',
              sm: '48.5%',
              md: '48.5%',
              lg: '20%',
              xl: '20%',
            },
            height: {
              xs: '88vh',
              sm: '88vh',
              md: '88vh',
              lg: '90%',
              xl: '90%',
            },
            mt: {
              xs: '3%',
              sm: '3%',
              md: '3%',
              lg: 0,
              xl: 0,
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '35%',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            <RedeemablePoints points = {points} />
          </Box>

          {/* Clubs Section */}
          <Box
            sx={{
              width: '100%',
              height: '35%',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 1,
              borderRadius: 7,
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "90%",
                display: "flex",
                position: "relative",
                left: "5%",
                top: "5%",
                flexDirection: "column",
                borderRadius: 7,
              }}
            >
              <Clubs points = {points}/>
            </Box>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',height:"25%",justifyContent:'space-between'}}>
              <KnowYourCategory/>
              <LogsAndGetPoints/>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: '100%',
              lg: '52%',
              xl: '52%',
            },
            height: {
              xs: 'auto',
              sm: '88vh',
              md: '88vh',
              lg: '90%',
              xl: '90%',
            },
            mt: {
              xs: '3%',
              sm: '3%',
              md: '3%',
              lg: 0,
              xl: 0,
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
            
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 1,
              borderRadius: 7,
              pb: '4%',
            }}
          >
            <EdTabs />
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default EmployeeDashboard;
