import React from 'react'
import { Box, styled, CircularProgress } from '@mui/material'
import { useDemoData } from 'context/DemoDataContext'
import { NavigationButton } from 'components/common'
import { useMockLoading } from 'hooks/useMockLoading'

const StyledProgramListWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const StyledLoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
const StyledProgramContainer = styled(Box)`
  margin: 16px;
`

export const DemoProgramList: React.FC = () => {
  const { programs, workouts } = useDemoData()
  const [isLoading] = useMockLoading(true, 1000)
  const workoutMode = location.pathname === '/demo/workouts'

  const itemsToDisplay = workoutMode ? workouts : programs

  return (
    <StyledProgramListWrapper>
      {isLoading ? (
        <StyledLoadingContainer>
          <CircularProgress size={70} />
        </StyledLoadingContainer>
      ) : (
        itemsToDisplay.map((item) => (
          <StyledProgramContainer key={item._id}>
            <NavigationButton
              destination={
                workoutMode
                  ? `/demo/workouts/${item._id}`
                  : `/demo/programs/${item._id}`
              }
              buttonText={item.programName}
              isBig
            />
          </StyledProgramContainer>
        ))
      )}
    </StyledProgramListWrapper>
  )
}
