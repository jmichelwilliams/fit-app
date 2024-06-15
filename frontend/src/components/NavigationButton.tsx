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
      <Typography variant="button" overflow="hidden" textOverflow="ellipsis">
        {buttonText}
      </Typography>
    </Button>
  )
}

export default NavigationButton
