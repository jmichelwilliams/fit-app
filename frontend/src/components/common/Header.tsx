import * as React from 'react'
import { AppBar, Box, styled, Toolbar } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { BackButton } from './'
import { useAuth0 } from '@auth0/auth0-react'
import { Profile } from '../auth/components'

interface HeaderProps {
  demoMode?: boolean
}

const StyledWrapper = styled(Box)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`
const StyledDemoUserContainer = styled(Box)`
  padding-right: 16px;
  padding-top: 16px;
`
const StyledAppBar = styled(AppBar)`
  border-bottom: 4px solid rgb(252, 163, 17);
`
const StyledDemoAppBar = styled(AppBar)`
  border-bottom: 4px solid rgb(252, 163, 17);
  height: 78px;
`
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0;
`
const StyledPlaceholderBox = styled(Box)`
  height: 80px;
  width: 100%;
`
const StyledBackButtonContainer = styled(Box)`
  padding-left: 8px;
  padding-top: 16px;
`
const StyledProfileContainer = styled(Box)`
  margin-left: auto;
`

export const Header: React.FC<HeaderProps> = ({ demoMode = false }) => {
  const { isAuthenticated } = useAuth0()
  const location = useLocation()
  const onHomePage = location.pathname === '/'

  if (!isAuthenticated && !demoMode) {
    return <StyledPlaceholderBox />
  }

  return (
    <StyledWrapper>
      {demoMode ? (
        <StyledDemoAppBar position="static" color="transparent">
          <StyledToolbar>
            {!onHomePage && (
              <StyledBackButtonContainer>
                <BackButton />
              </StyledBackButtonContainer>
            )}
            <StyledDemoUserContainer>
              <Profile demoMode />
            </StyledDemoUserContainer>
          </StyledToolbar>
        </StyledDemoAppBar>
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
