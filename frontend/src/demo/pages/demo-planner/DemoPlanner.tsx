import React from 'react'
import { Typography, Box, styled } from '@mui/material'
// import { ProgramList } from '../../../components'
import { NavigationButton } from '../../../components/common/'

const StyledPlannerWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTitleContainer = styled(Box)`
  margin: 16px 0px;
`
const StyledButtonContainer = styled(Box)`
  margin-bottom: 16px;
`
export const DemoPlanner: React.FC = () => {
  return (
    <StyledPlannerWrapper>
      <StyledTitleContainer>
        <Typography variant="h3" align={'center'}>
          My Programs
        </Typography>
      </StyledTitleContainer>
      <StyledButtonContainer>
        <NavigationButton
          destination="/planner/addprogram"
          buttonText="Add Program"
        />
      </StyledButtonContainer>
      {/* <ProgramList /> */}
    </StyledPlannerWrapper>
  )
}
