import React from 'react'
import { Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

export const BackButton: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = (): void => {
    const id = location.pathname.split('/')[2]

    switch (location.pathname) {
      case `/programs/${id}`:
        navigate('/planner')
        break
      case `/workouts/${id}`:
        navigate('/workouts')
        break
      case `/demo/programs/${id}`:
        navigate('/demo/planner')
        break
      case `/demo/workouts/${id}`:
        navigate('/demo/workouts')
        break
      case '/planner':
        navigate('/')
        break
      case '/workouts':
        navigate('/')
        break
      case '/workouts/history':
        navigate('/')
        break
      case '/demo':
        navigate('/')
        break
      case '/demo/planner':
        navigate('/demo')
        break
      case '/demo/workouts':
        navigate('/demo')
        break
      case '/demo/workouts/history':
        navigate('/demo')
        break
      default:
        navigate(-1)
    }
  }
  return (
    <>
      <Button
        variant="text"
        onClick={handleBack}
        sx={{ color: 'var( --font-color) !important' }}
      >
        Back
      </Button>
    </>
  )
}
