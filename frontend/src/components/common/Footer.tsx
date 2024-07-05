import React, { type ReactNode } from 'react'

import { Box } from '@mui/material'

interface FooterProps {
  children: ReactNode
}
export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0px',
        left: '0',
        right: '0',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        width: '90vw',
        backgroundColor: 'var(--background-color)',
        height: '56px',
        zIndex: '100',
        border: '3px gray solid',
        borderRadius: '16px',
        padding: '8px'
      }}
    >
      {children}
    </Box>
  )
}
