import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const BackButton: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = (): void => {
    navigate(-1)
  }
  return (
    <>
      <Button variant="text" onClick={handleBack}>
        Back
      </Button>
    </>
  )
}

export default BackButton
