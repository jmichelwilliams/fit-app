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
  const { programs } = useDemoData()
  const [isLoading] = useMockLoading(true, 1000)
  const workoutMode = location.pathname === '/workouts'
  console.log('programs: ', programs)
  return (
    <StyledProgramListWrapper>
      {isLoading ? (
        <StyledLoadingContainer>
          <CircularProgress size={70} />
        </StyledLoadingContainer>
      ) : (
        programs.map((program) => (
          <StyledProgramContainer key={program._id} sx={{ margin: '16px' }}>
            {workoutMode ? (
              <NavigationButton
                destination={`/demo/workouts/${program._id}`}
                buttonText={program.programName}
                isBig
              />
            ) : (
              <NavigationButton
                destination={`/demo/programs/${program._id}`}
                buttonText={program.programName}
                isBig
              />
            )}
          </StyledProgramContainer>
        ))
      )}
    </StyledProgramListWrapper>
  )
}
