import React, { type ReactNode } from 'react'

import { Box } from '@mui/material'

interface FooterProps {
  children: ReactNode
}
const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#3c3744',
        padding: '8px',
        zIndex: '100'
      }}
    >
      {children}
    </Box>
  )
}

export default Footer
