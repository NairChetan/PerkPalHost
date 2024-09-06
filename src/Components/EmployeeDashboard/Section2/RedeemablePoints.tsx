import '../../EmployeeDashboard/Section1/points.css';
import React from 'react';
import bonusimg from '../../../assets/Images/EmployeeDashboardAssets/bonus.png';
import CountUp from 'react-countup';
import Box from '@mui/material/Box';
import { PointData } from '../../CustomHooks/CustomHooks';

type PointProp = {
  points: PointData | null;
};

const Points: React.FC<PointProp> = ({ points }) => {
  console.log(points);
  if (!points) {
    return <p>No data available</p>; // Handle loading or error states if needed
  }

  const { totalPoints, redeemablePoints } = points;

  return (
   
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <p style={{ fontSize: '15px', fontWeight: '600', marginBottom: '10px' }}>Points Available For Redemption</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {redeemablePoints <= 90000 ? (
            <>
              <p style={{ fontSize: '50px', fontWeight: '700', marginRight: '10px' }}>
                <CountUp delay={0.2} end={redeemablePoints} />
              </p>
              <img className='reward-icon' src={bonusimg} alt='Reward Icon' style={{ width: '70px', height: '70px', position:'relative' }} />
            </>
          ) : (
            <div style={{ color: 'red', fontWeight: '700', fontSize: '18px' }}>
              You have exceeded 90k points!
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Points;
