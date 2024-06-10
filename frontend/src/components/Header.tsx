/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useLocation } from 'react-router-dom'
import BackButton from './BackButton'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from './auth/Profile'

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth0()
  const location = useLocation()
  const onHomePage = location.pathname === '/'

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '8px'
      }}
    >
      {isAuthenticated && (
        <AppBar position="static" color="transparent">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {!onHomePage && <BackButton />}
            <Box sx={{ marginLeft: 'auto' }}>
              <Profile />
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  )
}

export default Header
