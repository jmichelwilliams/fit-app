import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { IoPhonePortraitOutline } from 'react-icons/io5'

const StyledNotMobileMessageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 80vh;
`
export const NotMobile: React.FC = () => {
  return (
    <StyledNotMobileMessageWrapper>
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Please use a mobile device to access this website.
      </Typography>
      <IoPhonePortraitOutline
        style={{ height: '4em', width: '4em', marginTop: '32px' }}
      />
    </StyledNotMobileMessageWrapper>
  )
}
