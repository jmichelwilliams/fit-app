import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'

interface NavigationButtonProps {
  buttonText: string
  destination: string
  isBig?: boolean
}
const NavigationButton: React.FC<NavigationButtonProps> = ({
  buttonText,
  destination,
  isBig = false
}) => {
  const navigate = useNavigate()

  const handleNavigate = (): void => {
    navigate(`${destination}`)
  }

  // const truncateButtonText = (text: string): string => {
  //   if (text.length > 15) {
  //     return text.substring(0, 12) + '...'
  //   } else {
  //     return text
  //   }
  // }

  return (
    <Button
      variant="contained"
      onClick={handleNavigate}
      sx={{
        height: isBig ? '150px' : '60px',
        width: '150px',
        backgroundColor: 'var(--button-color)'
      }}
    >
      <Typography variant="body1" overflow="hidden" textOverflow="ellipsis">
        {buttonText}
      </Typography>
    </Button>
  )
}

export default NavigationButton
