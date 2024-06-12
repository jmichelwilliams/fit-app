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
      <Box sx={{ margin: '16px 0px' }}>
        <Typography variant="h3" textAlign="center">
          Workouts
        </Typography>
      </Box>
      <ProgramList />
    </Box>
  )
}

export default WorkoutList
