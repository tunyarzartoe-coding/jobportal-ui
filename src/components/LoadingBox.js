import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import { useTheme } from '@emotion/react';


const LoadingBox = () => {
    const { palette } = useTheme();

    return (
        <>
            <Box
                sx={{
                    minHeight: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: palette.primary.main,
                    color: palette.primary.oth
                }}>
                <CircularProgress style={{color: palette.primary.oth}} />
            </Box>
        </>
    )
}

export default LoadingBox