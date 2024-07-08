import React, {
  createContext,
  useState,
  useContext,
  type ReactNode
} from 'react'

interface SnackbarContextProps {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
  showMessage: (
    msg: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void
  closeSnackbar: () => void
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
)

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('success')

  const showMessage = (
    msg: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ): void => {
    setMessage(msg)
    setSeverity(severity)
    setOpen(true)
  }

  const closeSnackbar = (): void => {
    setOpen(false)
  }
  return (
    <SnackbarContext.Provider
      value={{ open, message, severity, showMessage, closeSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext)
  if (context == null) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}
