import * as React from 'react'
import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material'
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
`
const StyledDemoUserContainer = styled(Box)`
  padding-right: 16px;
`
const StyledAppBar = styled(AppBar)`
  border-bottom: 4px solid rgb(252, 163, 17);
`
const StyledDemoAppBar = styled(AppBar)`
  border-bottom: 4px solid rgb(252, 163, 17);
  height: 88px;
`
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0;
`
const StyledPlaceholderBox = styled(Box)`
  height: 88px;
  width: 100%;
`
const StyledBackButtonContainer = styled(Box)`
  padding-left: 8px;
`
const StyledProfileContainer = styled(Box)`
  margin-left: auto;
`
const StyledTitleContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
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
            <StyledTitleContainer>
              <Typography variant="h6">DEMO MODE</Typography>
            </StyledTitleContainer>
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
