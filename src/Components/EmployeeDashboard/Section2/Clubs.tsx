import React from 'react'
import '../Section2/clubs.css'


import celebimg from '../../../assets/Images/EmployeeDashboardAssets/celebration.png'
import gold from '../../../assets/Images/EmployeeDashboardAssets/gold.png'


const Clubs = () => {
  return (
    <>
        <div className='clubs-section'>
          <div className='inner-club'  style={{position:'relative',bottom:'-5%'}} >
             <div style={{display:'flex',flexDirection:'column'}}>
                <p style={{display:'flex',position:'relative',left:'10%',fontWeight:'600'}}>Club</p>
             </div>
             <div style={{display:'flex',borderRadius:'12px',justifyContent:'space-evenly'}}>
                
                  <img style={{width:'30%'}} src={celebimg} alt="" />
                  <img style={{width:'30%'}} src={gold} alt="" />
                              
             </div>
          </div>
            
        </div>
    </>
  )
}

export default Clubs
