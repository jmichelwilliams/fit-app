import React from 'react'
import { NavigationButton } from '../../common'
import { Box, Typography } from '@mui/material'
import { FiXCircle } from 'react-icons/fi'

export const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '80vh'
      }}
    >
      <Typography variant="h2">The page does not exist!</Typography>
      <FiXCircle style={{ fontSize: '64px' }} />
      <Box sx={{ margin: '32px' }}>
        <NavigationButton destination="/" buttonText="Homepage" />
      </Box>
    </Box>
  )
}
