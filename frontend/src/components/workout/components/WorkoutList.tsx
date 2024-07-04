import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ProgramList } from '../../program/components'

export const WorkoutList: React.FC = () => {
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
