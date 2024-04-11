import React from 'react'
import type Program from '../types/Program'
import { Box } from '@mui/material'
import NavigationButton from './NavigationButton'

interface ProgramListProps {
  programs: Program[]
}

const ProgramList: React.FC<ProgramListProps> = ({ programs }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {programs.map((program) => {
        return (
          <Box key={program._id} sx={{ margin: '16px' }}>
            <NavigationButton
              destination={`/user/${program.createdBy}/training`}
              buttonText={program.programName}
              isBig
            />{' '}
          </Box>
        )
      })}
    </Box>
  )
}

export default ProgramList
