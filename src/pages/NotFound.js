import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const NotFound = () => {
    return (
        <>
            <Navbar/>
            <Box sx={{ height: '81vh', display: "flex", alignItems: "center", justifyContent: "center" }}>

                <h1 className='text-white'>Page not found!</h1>
            </Box>
            <Footer />
        </>
    )
}

export default NotFound