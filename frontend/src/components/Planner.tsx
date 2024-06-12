import React from 'react'
import { Typography, Box } from '@mui/material'
import ProgramList from './ProgramList'
import NavigationButton from './NavigationButton'

const Planner: React.FC = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ margin: '16px 0px' }}>
        <Typography variant="h3" align={'center'}>
          My Programs
        </Typography>
      </Box>
      <Box sx={{ marginBottom: '16px' }}>
        <NavigationButton
          destination="/planner/addprogram"
          buttonText="Add Program"
        />
      </Box>
      <ProgramList />
    </Box>
  )
}

export default Planner
