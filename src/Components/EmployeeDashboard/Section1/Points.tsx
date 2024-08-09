import '../../EmployeeDashboard/Section1/points.css'
import React from 'react'
import rewardsimg from '../../../assets/Images/EmployeeDashboardAssets/reward.png'
import Leaderboard from './LeaderBoard'
import CountUp from 'react-countup';




const Points = () => {
  return (
    <>
        <div className='points-card'>
          <div style={{padding:'15px',paddingLeft:'10px',paddingRight:'10px'}}>
                <div>
                  <p style={{paddingLeft:'40px',fontSize:'15px',fontWeight:'600'}}>Points</p>
                </div>
                <div className='points-img' >
                    <p style={{fontSize:'50px',fontWeight:'700'}}><CountUp delay={0.2} end={851} ></CountUp></p>
                    <img className='reward-icon' src={rewardsimg} alt="" />
                </div>
          </div>
            
        </div>
        
    </>
  )
}

export default Points
