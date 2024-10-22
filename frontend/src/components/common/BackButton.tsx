import React from 'react'
import { Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

export const BackButton: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = (): void => {
    const id = location.pathname.split('/')[2]

    switch (true) {
      case location.pathname.includes(`/programs/${id}`):
      case location.pathname.includes(`/workouts/${id}`):
        navigate('/planner')
        break
      case location.pathname.includes(`/workouts/history`):
      case location.pathname.includes(`/demo/workouts/history`):
      case location.pathname.includes(`/demo/planner`):
      case location.pathname.includes(`/demo/workouts`):
      case location.pathname.includes(`/planner`):
        navigate('/')
        break
      case location.pathname.includes(`/demo/programs/${id}`):
      case location.pathname.includes(`/demo/workouts/${id}`):
        navigate('/demo/planner')
        break
      default:
        navigate(-1)
    }
  }

  return (
    <Button
      variant="text"
      onClick={handleBack}
      sx={{ color: 'var(--font-color) !important' }}
    >
      Back
    </Button>
  )
}
