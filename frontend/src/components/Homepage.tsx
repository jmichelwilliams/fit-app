import React from 'react'
import Box from '@mui/material/Box'
import NavigationButton from './NavigationButton'
import Typography from '@mui/material/Typography'
import { GiMuscleUp } from 'react-icons/gi'

const Homepage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '16px auto'
        }}
      >
        <Typography variant="h1">Fit-App</Typography>
        <GiMuscleUp style={{ height: '5em', width: '5em' }} />
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', margin: '16px auto' }}
      >
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          sx={{ marginTop: '32px' }}
        >
          Tired of losing track of your workouts? Fear no more, Fit-App is here
          to help you!
        </Typography>
      </Box>
      <Box sx={{ marginTop: '32px' }}>
        <NavigationButton buttonText="Go to Planner" destination={'/planner'} />
      </Box>
    </Box>
  )
}

export default Homepage
