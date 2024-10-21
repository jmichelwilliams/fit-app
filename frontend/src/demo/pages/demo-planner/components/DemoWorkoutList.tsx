import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { DemoProgramList } from '.'

const StyledWorkoutListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 8px;
  align-items: center;
`
const StyledTitleContainer = styled(Box)`
  margin: 16px 0px;
`
export const DemoWorkoutList: React.FC = () => {
  return (
    <StyledWorkoutListWrapper>
      <StyledTitleContainer>
        <Typography variant="h3" textAlign="center">
          Workouts
        </Typography>
      </StyledTitleContainer>
      <DemoProgramList />
    </StyledWorkoutListWrapper>
  )
}
