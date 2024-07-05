import React from 'react'
import Box from '@mui/material/Box'
import { NavigationButton } from '../../common'
import { LoginButton } from '../../auth/components'
import Typography from '@mui/material/Typography'
import { GiMuscleUp } from 'react-icons/gi'
import { useAuth0 } from '@auth0/auth0-react'

export const Homepage: React.FC = () => {
  const { isAuthenticated } = useAuth0()

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
      {isAuthenticated ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '160px',
            marginTop: '32px',
            justifyContent: 'space-between'
          }}
        >
          <NavigationButton
            buttonText="Go to Planner"
            destination={'/planner'}
          />
          <NavigationButton
            buttonText="Start Workout"
            destination={'/workouts'}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '160px',
            marginTop: '32px',
            justifyContent: 'space-between'
          }}
        >
          <LoginButton buttonText="Login / Register" isSmall={false} />
        </Box>
      )}
    </Box>
  )
}
