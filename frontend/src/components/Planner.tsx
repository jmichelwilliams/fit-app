import React from 'react'
import { Typography } from '@mui/material'
import ProgramList from './ProgramList'

const Planner: React.FC = () => {
  return (
    <div>
      <Typography variant="h3" align={'center'}>
        My Programs
      </Typography>
      <ProgramList />
    </div>
  )
}

export default Planner
