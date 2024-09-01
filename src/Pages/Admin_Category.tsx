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
    <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', marginTop: '16px' }}>
      Categories
    </Typography>
  </Box>

  {/* Right side image */}
  <img
    src="../../src/assets/images/united 1.png"
    alt="Celebration Icon"
    style={{ width: '100px', height: '100px' }}
  />
</Box>

      <CategoriesTable/>
    </Box>
    <Footer/>
    </>
  )
}

export default Admin_Category
