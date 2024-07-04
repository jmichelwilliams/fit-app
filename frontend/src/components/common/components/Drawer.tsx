import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'
import {
  Box,
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import DashboardIcon from '@mui/icons-material/Dashboard'

type Anchor = 'right'

interface NavigationElement {
  text: string
  icon: JSX.Element
  action?: () => void
}

const StyledImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 16px;
  padding: 8px;
`
export const Drawer: React.FC = () => {
  const [state, setState] = useState({
    right: false
  })
  const { user, logout } = useAuth0()
  const navigate = useNavigate()

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event !== undefined &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const handleNavigation = (route: string): void => {
    navigate(route)
  }

  const handleLogout = (): void => {
    void logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const list = (anchor: Anchor): JSX.Element => (
    <Box
      sx={{ width: '200px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          {
            text: 'Planner',
            icon: <DashboardIcon style={{ color: 'var( --font-color)' }} />,
            action: () => {
              handleNavigation('/planner')
            }
          },
          {
            text: 'Workout',
            icon: <FitnessCenterIcon style={{ color: 'var( --font-color)' }} />,
            action: () => {
              handleNavigation('/workouts')
            }
          },
          {
            text: 'Workout History',
            icon: <AccountBoxIcon style={{ color: 'var( --font-color)' }} />,
            action: () => {
              handleNavigation('/Workouts/History')
            }
          },
          {
            text: 'Logout',
            icon: <LogoutIcon style={{ color: 'var( --font-color)' }} />,
            action: handleLogout
          }
        ].map((element: NavigationElement, index: number) => {
          if (element.action == null) {
            return null
          }
          return (
            <ListItem key={index} disablePadding onClick={element.action}>
              <ListItemButton>
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText primary={element.text} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  if (user == null) {
    return undefined
  }
  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer('right', true)}>
          {<StyledImg src={user.picture} alt={user.name} />}
        </Button>
        <SwipeableDrawer
          anchor={'right'}
          open={state.right}
          onClose={toggleDrawer('right', false)}
          onOpen={toggleDrawer('right', true)}
          PaperProps={{
            sx: { backgroundColor: 'var( --background-color)' }
          }}
        >
          {list('right')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}
