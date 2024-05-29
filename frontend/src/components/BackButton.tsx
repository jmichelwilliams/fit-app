import React from 'react'
import { Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

const BackButton: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = (): void => {
    const id = location.pathname.split('/')[2]

    switch (location.pathname) {
      case `/programs/${id}`:
        navigate('/planner')
        break
      case '/planner':
        navigate('/')
        break
      case '/workouts':
        navigate('/')
        break
      case `/workouts/${id}`:
        navigate('/workouts')
        break
    }
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
