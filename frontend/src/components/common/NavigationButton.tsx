import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, styled } from '@mui/material'

interface NavigationButtonProps {
  buttonText: string
  destination: string
  isBig?: boolean
  children?: React.ReactNode
}
interface StyledButtonProps {
  isBig?: boolean
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isBig'
})<StyledButtonProps>`
  background-color: var(--button-color);
  height: ${(props) => ((props.isBig ?? false) ? '150px' : '60px')};
  width: 150px;
  &:hover {
    background-color: var(--button-color);
  }
`
export const NavigationButton: React.FC<NavigationButtonProps> = ({
  buttonText,
  destination,
  isBig = false
}) => {
  const navigate = useNavigate()

  const handleNavigate = (): void => {
    navigate(`${destination}`)
  }

  return (
    <StyledButton variant="contained" onClick={handleNavigate} isBig={isBig}>
      <Typography variant="button" overflow="hidden" textOverflow="ellipsis">
        {buttonText}
      </Typography>
    </StyledButton>
  )
}
