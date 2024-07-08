import * as React from 'react'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useSnackbar } from 'context/SnackbarContext'

export const SnackbarNotification: React.FC = () => {
  const { open, message, severity, closeSnackbar } = useSnackbar()

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={5000}
        open={open}
        onClose={closeSnackbar}
      >
        <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
