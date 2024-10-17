import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { NavigationButton } from '../../common'
import { LoginButton } from '../../auth/components'
import { GiMuscleUp } from 'react-icons/gi'
import { useAuth0 } from '@auth0/auth0-react'

const StyledHomepageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
`
const StyledTitleContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px auto;
`

const StyledSubtitleContainer = styled(StyledTitleContainer)`
  justify-content: center;
`
const StyledButtonsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: space-between;
  margin-top: 8px;
`
const StyledLoginButtonContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 160px;
  margin-top: 32px;
  justify-content: space-between;
`
export const Homepage: React.FC = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <StyledHomepageWrapper>
      <StyledTitleContainer>
        <Typography variant="h1">Fit-App</Typography>
        <GiMuscleUp style={{ height: '4em', width: '4em' }} />
      </StyledTitleContainer>
      <StyledSubtitleContainer>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          sx={{ marginTop: '8px' }}
        >
          Tired of losing track of your workouts? Fear no more, Fit-App is here
          to help you!
        </Typography>
      </StyledSubtitleContainer>
      {isAuthenticated ? (
        <StyledButtonsContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '240px',
            justifyContent: 'space-between',
            marginTop: '8px'
          }}
        >
          <NavigationButton
            buttonText="Go to Planner"
            destination={'/planner'}
          />
          <NavigationButton
            buttonText="Start Workout"
            destination={'/workouts'}
          />
          <NavigationButton
            buttonText="Workout History"
            destination={'/workouts/history'}
          />
        </StyledButtonsContainer>
      ) : (
        <StyledLoginButtonContainer>
          <LoginButton buttonText="Login / Register" isSmall={false} />
          <NavigationButton
            buttonText="Try it out"
            destination={'/demo'}
            color="lightblue"
          />
        </StyledLoginButtonContainer>
      )}
    </StyledHomepageWrapper>
  )
}
