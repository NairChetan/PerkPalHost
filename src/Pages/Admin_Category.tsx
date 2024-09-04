import React from 'react'
import  { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button,IconButton } from '@mui/material';


import Category_Request_Button from '../Components/Admin_Category/Button/CategoryRequest/popUp/Category_Request_Button';
import CategoriesTable from '../Components/Admin_Category/CategoriesTable';
import Navbar from '../Components/NavBar/Navbar';
import Footer from '../Components/Footer/Footer';

const Admin_Category = () => {
  return (
    <>
       <Navbar/>
       <Box style={{ backgroundColor: '#f7f8fc', height: '78vh', width: '100%' }}>
       <Box display="flex" justifyContent="space-between" alignItems="center" style={{ width: '80%', margin: 'auto' }}>
  {/* Left side content with column flex */}
  <Box display="flex" flexDirection="column" alignItems="flex-start">
  <Typography
    variant="h5"
    component="h1"
    sx={{
      fontWeight: 'bold',
      marginTop: {
        xs: '20px', // Smaller margin-top for extra-small screens
        sm: '30px', // Medium margin-top for small screens
        md: '40px', // Larger margin-top for medium screens
        lg: '54px', // Default margin-top for large screens
      },
      marginLeft: {
        xs: '0px',  // No margin-left for extra-small screens
        sm: '-20px', // Smaller margin-left for small screens
        md: '-50px', // Medium margin-left for medium screens
        lg: '-81px', // Default margin-left for large screens
      },
      width: {
        xs: 'auto', // Auto width for extra-small screens
        sm: '80px', // Smaller width for small screens
        md: '90px', // Medium width for medium screens
        lg: '100px', // Default width for large screens
      },
    }}
  >
    Categories
  </Typography>
</Box>

  {/* Right side image */}
  <img
  src="../../src/assets/images/united 1.png"
  alt="Celebration Icon"
  style={{
    width: '100px', // Default width
    height: '100px', // Default height
    marginTop: '10px',

  }}
/>

</Box>

      <CategoriesTable/>
    </Box>
    <Footer/>
    </>
  )
}

export default Admin_Category
