import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

interface NavigationButtonProps {
  buttonText: string
  destination: string
}
const NavigationButton: React.FC<NavigationButtonProps> = ({
  buttonText,
  destination
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
        height: '60px',
        width: '150px',
        backgroundColor: 'var(--button-color)'
      }}
    >
      {buttonText}
    </Button>
  )
}

export default NavigationButton
