import React from 'react'
import Grid from '@mui/material/Grid'
import NavigationButton from './NavigationButton'
import Typography from '@mui/material/Typography'

const Homepage: React.FC = () => {
  return (
    <Grid
      container
      spacing={8}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sm={4}>
        <Typography variant="h1">Fit-App</Typography>
        <h1></h1>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Tired of losing track of your workouts? Fear no more, Fit-App is here
          to help you!
        </Typography>
      </Grid>
      <Grid item sm={12} sx={{ marginTop: '64px' }}>
        <NavigationButton buttonText="Go to Planner" destination={'/planner'} />
      </Grid>
    </Grid>
  )
}

export default Homepage
