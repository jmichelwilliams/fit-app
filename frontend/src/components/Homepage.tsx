import React from 'react'
import Grid from '@mui/material/Grid'
import styled from 'styled-components'
import NavigationButton from './NavigationButton'

const Description = styled.h2`
  margin: 8px;
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
  padding: 8px;
`

const Homepage: React.FC = () => {
  return (
    <Grid
      container
      spacing={8}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item sm={4}>
        <h1>Fit-App</h1>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Description>
          Tired of losing track of your workouts? Fear no more, Fit-App is here
          to help you!
        </Description>
      </Grid>
      <Grid item sm={12} sx={{ marginTop: '64px' }}>
        <NavigationButton buttonText="Go to Planner" destination={'/planner'} />
      </Grid>
    </Grid>
  )
}

export default Homepage
