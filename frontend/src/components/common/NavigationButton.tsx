import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, styled } from '@mui/material'

interface NavigationButtonProps {
  buttonText: string
  destination: string
  isBig?: boolean
  children?: React.ReactNode
  color?: string
}
interface StyledButtonProps {
  isBig?: boolean
  color?: string
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isBig' && prop !== 'color'
})<StyledButtonProps>`
  background-color: ${(props) => props.color ?? 'var(--button-color)'};
  height: ${(props) => ((props.isBig ?? false) ? '150px' : '60px')};
  width: 150px;
  &:hover {
    background-color: ${(props) => props.color ?? 'var(--button-color)'};
  }
`
export const NavigationButton: React.FC<NavigationButtonProps> = ({
  buttonText,
  destination,
  isBig = false,
  color
}) => {
  const navigate = useNavigate()

  const handleNavigate = (): void => {
    navigate(`${destination}`)
  }

  return (
    <StyledButton
      variant="contained"
      onClick={handleNavigate}
      isBig={isBig}
      sx={{
        backgroundColor: color ?? 'var(--button-color)',
        '&:hover': {
          backgroundColor: color ?? 'var(--button-color)'
        }
      }}
    >
      <Typography variant="button" overflow="hidden" textOverflow="ellipsis">
        {buttonText}
      </Typography>
    </StyledButton>
  )
}
