import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Typography, Button } from '@mui/material'

interface LoginButtonProps {
  buttonText: string
  isSmall: boolean
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  buttonText,
  isSmall
}) => {
  const { loginWithRedirect, isLoading } = useAuth0()

  const handleLogin = (): void => {
    if (isLoading) {
      return
    }
    loginWithRedirect().catch((error) => {
      console.error('Error with login:', error)
    })
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogin}
      sx={{
        height: isSmall ? '36px' : '60px',
        width: '150px',
        marginRight: '8px',
        backgroundColor: 'var(--button-color)',
        '&:hover': {
          backgroundColor: 'var(--button-color)'
        }
      }}
    >
      <Typography variant="button" overflow="hidden" textOverflow="ellipsis">
        {buttonText}
      </Typography>
    </Button>
  )
}
