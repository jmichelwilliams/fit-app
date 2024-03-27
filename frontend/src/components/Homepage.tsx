import React from 'react'
import Box from '@mui/material/Box'
import NavigationButton from './NavigationButton'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
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
          margin: '8px auto'
        }}
      >
        <Typography variant="h1">Fit-App</Typography>
        <GiMuscleUp style={{ height: '4em', width: '4em' }} />
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', margin: '8px auto' }}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '160px',
          marginTop: '32px',
          justifyContent: 'space-between'
        }}
      >
        <LoginButton buttonText={'Login'} isSmall={false} />
        <LogoutButton />
        <NavigationButton buttonText="Go to Planner" destination={'/planner'} />
        <NavigationButton buttonText="Workout" destination={'/training'} />
      </Box>
    </Box>
  )
}

export default Homepage
