import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProgramList from './ProgramList'

const WorkoutList: React.FC = () => {
  console.log('location.pathname: ', location.pathname)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '8px',
        alignItems: 'center'
      }}
    >
      <Typography variant="h3" textAlign="center">
        Workouts
      </Typography>
      <ProgramList />
    </Box>
  )
}

export default WorkoutList
