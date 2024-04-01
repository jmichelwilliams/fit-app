import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from './auth/Profile'
import { Box } from '@mui/material'

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth0()
  return (
    <div>
      {isAuthenticated && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}
        >
          <Profile />
        </Box>
      )}
    </div>
  )
}

export default Header
