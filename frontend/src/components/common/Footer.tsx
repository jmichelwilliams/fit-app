import React, { type ReactNode } from 'react'
import { styled, Box } from '@mui/material'

interface FooterProps {
  children: ReactNode
}

const StyledFooter = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 90vw;
  background-color: var(--background-color);
  height: 56px;
  z-index: 100;
  border: 3px solid gray;
  border-radius: 16px;
  padding: 8px;
`
export const Footer: React.FC<FooterProps> = ({ children }) => {
  return <StyledFooter>{children}</StyledFooter>
}
