import React from 'react'
import { NavigationButton } from '../../common'
import { Box, Typography, styled } from '@mui/material'
import { FiXCircle } from 'react-icons/fi'

const StyledNotFoundMessageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 80vh;
`
export const NotFound: React.FC = () => {
  return (
    <StyledNotFoundMessageWrapper>
      <Typography variant="h2">The page does not exist!</Typography>
      <FiXCircle style={{ fontSize: '64px' }} />
      <Box sx={{ margin: '32px' }}>
        <NavigationButton destination="/" buttonText="Homepage" />
      </Box>
    </StyledNotFoundMessageWrapper>
  )
}
