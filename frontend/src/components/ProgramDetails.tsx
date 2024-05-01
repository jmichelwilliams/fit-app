import React, { useState } from 'react'
import useFetchProgram from '../hooks/useFetchProgram'
import { fetchProgram } from '../utils/fetchProgram'
import { Typography, Box, TextField, Grid } from '@mui/material'
import type Program from '../types/Program'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { formatRestTime } from '../utils/formatRestTime'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'

const ProgramDetails: React.FC = () => {
  const [program, setProgram] = useState<Program | undefined>()
  const { programId } = useParams<{
    programId: string
  }>()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { getAccessTokenSilently } = useAuth0()

  useFetchProgram(programId, getAccessTokenSilently, fetchProgram, setProgram)

  return (
    <div>
      <Typography variant="h3" textAlign="center">
        {program?.programName.toUpperCase()}
      </Typography>

      {program?.exercises.map((exercise, index) => {
        console.log('exercise: ', exercise)
        return (
          <Box
            key={`exercise-${index}`}
            sx={{
              border: '4px solid black',
              width: '90vw',
              height: 'auto',
              margin: '8px auto',
              padding: '8px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              component="label"
              htmlFor={`exercise-${index}`}
            >
              Exercise {index + 1} - {exercise.exerciseName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}
            >
              {Array.from({ length: exercise.sets.length }, (_, index) => {
                return (
                  <Box key={`set${index + 1}`} sx={{ margin: '8px' }}>
                    <Typography variant="body1" textAlign="center">
                      Set: {index + 1}
                    </Typography>
                    <Grid container spacing={2} sx={{ paddingLeft: '8px' }}>
                      <Grid item xs={6}>
                        <TextField
                          id={`repsInput-${index}`}
                          label="reps"
                          type="number"
                          size="small"
                          defaultValue={exercise.sets[index].reps}
                          InputProps={{
                            readOnly: true
                          }}
                          InputLabelProps={{
                            sx: {
                              fontSize: isSmallScreen ? '.95rem' : '1rem',
                              textAlign: 'center'
                            }
                          }}
                          sx={{
                            width: '90%'
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id={`weightInput-${index}`}
                          label="weight (lbs)"
                          type="number"
                          size="small"
                          defaultValue={exercise.weight}
                          InputProps={{
                            readOnly: true
                          }}
                          InputLabelProps={{
                            sx: {
                              fontSize: isSmallScreen ? '.95rem' : '1rem'
                            }
                          }}
                          sx={{
                            width: '90%'
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="body1"
                      textAlign="center"
                      sx={{ marginTop: '8px' }}
                    >
                      Rest: {formatRestTime(exercise.rest)}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>
        )
      })}
    </div>
  )
}

export default ProgramDetails
