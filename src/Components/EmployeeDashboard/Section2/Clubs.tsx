import React from 'react';
import '../Section2/clubs.css';
import CountUp from 'react-countup';
import coin from '../../../assets/Images/EmployeeDashboardAssets/coin.png';
import Box from '@mui/material/Box';
import { PointData } from '../../CustomHooks/CustomHooks';

type PointProp = {
  points: PointData | null;
};

const Clubs: React.FC<PointProp> = ({ points }) => {
  if (!points) {
    return <p>No data available</p>; // Handle loading or error states if needed
  }

  const { totalPoints, redeemablePoints } = points;

  const formatValue = (value: number) => {
    return value.toLocaleString(); // Formats the number with commas as thousands separators
  };

  return (
    <Box
      sx={{
        width: '90%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        boxSizing: 'border-box',
        position: 'relative',
        borderRadius: 7,
        backgroundColor: '#fff', // Ensuring background color matches your box style
      }}
    >
      <div className='inner-club' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '15px', fontWeight: '600' }}>Points Used</p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: '10px', // Added gap for spacing between number and icon
          }}
        >
          {(totalPoints-redeemablePoints) <= 90000 ? (
            <>
              <p style={{ fontSize: '50px', fontWeight: '700' }}>
                <CountUp delay={0.2} end={totalPoints-redeemablePoints} formattingFn={formatValue} />
              </p>
              <img className='icon-for-used-points' src={coin} alt='Coin Icon' style={{ width: '60px', height: '60px' }} />
            </>
          ) : (
            <div style={{ color: 'red', fontWeight: '700', fontSize: '18px' }}>
              You broke the meter.
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Clubs;
