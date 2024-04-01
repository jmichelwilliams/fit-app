import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const StyledImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 16px;
`
const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { logout } = useAuth0()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleLogout = (): void => {
    setAnchorEl(null)
    void logout({ logoutParams: { returnTo: window.location.origin } })
  }
  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!isAuthenticated || user == null) {
    return undefined
  }

  return (
    isAuthenticated && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          id="basic-button"
          variant="text"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Button id="usernickname" sx={{ margin: '0px' }}>
            {' '}
            <StyledImg src={user.picture} alt={user.name} />
          </Button>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          sx={{ left: '16px' }}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    )
  )
}

export default Profile
