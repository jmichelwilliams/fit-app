import React from 'react'
import { Typography, Box, styled } from '@mui/material'
import { ProgramList } from './components'
import { NavigationButton } from '../../common'

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
export const Planner: React.FC = () => {
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
      <ProgramList />
    </StyledPlannerWrapper>
  )
}
