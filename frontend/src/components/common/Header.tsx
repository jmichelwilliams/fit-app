import * as React from 'react'
import { AppBar, Box, styled, Toolbar } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { BackButton } from './'
import { useAuth0 } from '@auth0/auth0-react'
import { Profile } from '../auth/components'

const StyledWrapper = styled(Box)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`
const StyledPlaceholderBox = styled(Box)`
  height: 80px;
  width: 100%;
`
const StyledAppBar = styled(AppBar)`
  border-bottom: 4px solid rgb(252, 163, 17);
`
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0;
`
const StyledBackButtonContainer = styled(Box)`
  padding-left: 8px;
`
const StyledProfileContainer = styled(Box)`
  margin-left: auto;
`
export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth0()
  const location = useLocation()
  const onHomePage = location.pathname === '/'

  return (
    <StyledWrapper>
      {!isAuthenticated ? (
        <StyledPlaceholderBox />
      ) : (
        <StyledAppBar position="static" color="transparent">
          <StyledToolbar>
            {!onHomePage && (
              <StyledBackButtonContainer>
                <BackButton />
              </StyledBackButtonContainer>
            )}
            <StyledProfileContainer>
              <Profile />
            </StyledProfileContainer>
          </StyledToolbar>
        </StyledAppBar>
      )}
    </StyledWrapper>
  )
}
