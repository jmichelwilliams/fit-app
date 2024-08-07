import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useLocation } from 'react-router-dom'
import { BackButton } from './'
import { useAuth0 } from '@auth0/auth0-react'
import { Profile } from '../auth/components'

export const Header: React.FC = () => {
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
      {!isAuthenticated ? (
        <Box sx={{ height: '80px', width: '100%' }}> </Box>
      ) : (
        <AppBar
          position="static"
          color="transparent"
          sx={{ borderBottom: '4px solid rgb(252,163,17)' }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0px'
            }}
          >
            {!onHomePage && (
              <Box sx={{ paddingLeft: '8px' }}>
                <BackButton />
              </Box>
            )}
            <Box sx={{ marginLeft: 'auto' }}>
              <Profile />
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  )
}
