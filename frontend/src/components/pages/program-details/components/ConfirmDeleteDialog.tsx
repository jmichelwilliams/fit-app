import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material'

interface ConfirmDeleteDialogProps {
  open: boolean
  handleClose: () => void
  handleDeleteConfirm: () => void
}
export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  handleClose,
  handleDeleteConfirm
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { backgroundColor: 'var(--background-color)' } }}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'white !important' }}>
          Are you sure you want to delete this program?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: 'rgb(252,163,17)' }}>
          Cancel
        </Button>
        <Button onClick={handleDeleteConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
