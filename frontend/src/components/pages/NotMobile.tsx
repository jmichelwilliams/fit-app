import React from 'react'
import { Box, Typography } from '@mui/material'
import { IoPhonePortraitOutline } from 'react-icons/io5'

const NotMobile: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Please use a mobile device to access this website.
      </Typography>
      <IoPhonePortraitOutline
        style={{ height: '4em', width: '4em', marginTop: '32px' }}
      />
    </Box>
  )
}

export default NotMobile
