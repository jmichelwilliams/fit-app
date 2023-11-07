import React from 'react'
import { Grid } from '@mui/material'
import styled from 'styled-components'
import NavigationButton from './NavigationButton'

const Description = styled.h2`
  margin: 8px;
  text-align: center;
`
const Homepage: React.FC = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Grid item xs={12}>
        <h1>Fit-App</h1>
      </Grid>
      <Grid item xs={12}>
        <Description>
          Tired of losing track of your workouts? Fear no more, Fit-App is here
          to help you!
        </Description>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: '64px' }}>
        <NavigationButton
          buttonText="Click here to start!"
          destination={'/planner'}
        />
      </Grid>
    </Grid>
  )
}

export default Homepage
