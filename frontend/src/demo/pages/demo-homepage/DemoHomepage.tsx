import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { NavigationButton } from '../../../components/common'
import { GiMuscleUp } from 'react-icons/gi'

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

export const DemoHomepage: React.FC = () => {
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
      <StyledButtonsContainer
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '240px',
          justifyContent: 'space-between',
          marginTop: '8px'
        }}
      >
        <NavigationButton buttonText="Go to Planner" destination={'/planner'} />
        <NavigationButton
          buttonText="Start Workout"
          destination={'/demo/workouts'}
        />
        <NavigationButton
          buttonText="Workout History"
          destination={'/demo/workouts/history'}
        />
      </StyledButtonsContainer>
    </StyledHomepageWrapper>
  )
}
