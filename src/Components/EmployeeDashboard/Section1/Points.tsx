import '../../EmployeeDashboard/Section1/points.css';
import React from 'react';
import rewardsimg from '../../../assets/Images/EmployeeDashboardAssets/reward.png';
import CountUp from 'react-countup';

const formatValue = (value: number) => {
  return value >= 1000 ? `${Math.floor(value / 1000)}k` : value.toString();
};

const Points: React.FC = () => {
  const points = 761; // Example value, can be dynamically set

  return (
    <>
      <div className='points-card'>
        <div style={{ padding: '15px', paddingLeft: '10px', paddingRight: '10px' }}>
          <div>
            <p style={{ paddingLeft: '40px', fontSize: '15px', fontWeight: '600' }}>Points</p>
          </div>
          <div className='points-img'>
            {points <= 90000 ? (
              <>
                <p style={{ fontSize: '50px', fontWeight: '700' }}>
                  <CountUp delay={0.2} end={points} formattingFn={formatValue} />
                </p>
                <img className='reward-icon' src={rewardsimg} alt='Reward Icon' />
              </>
            ) : (
              <div style={{ color: 'red', fontWeight: '700', fontSize: '18px' }}>
                Wow.So talented.You broke the meter.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Points;
