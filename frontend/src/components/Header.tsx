import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from './auth/Profile'
import { Box } from '@mui/material'
import BackButton from './BackButton'
import { useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth0()
  const location = useLocation()
  const onHomePage = location.pathname === '/'

  return (
    <div>
      {isAuthenticated && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {!onHomePage && <BackButton />}
          <Box sx={{ marginLeft: 'auto' }}>
            <Profile />
          </Box>
        </Box>
      )}
    </div>
  )
}

export default Header
