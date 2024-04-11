import React, { useEffect, useState } from 'react'
import { Typography, Box, TextField, Grid } from '@mui/material'
import type Program from '../types/Program'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchProgram } from '../utils/fetchProgram'
import { formatRestTime } from '../utils/formatRestTime'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'

const ProgramView: React.FC = () => {
  const [program, setProgram] = useState<Program | undefined>()
  const { programId } = useParams<{
    programId: string
  }>()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (programId != null && programId.length > 0) {
          const accessToken = await getAccessTokenSilently()
          const fetchedProgram = await fetchProgram(programId, accessToken)
          setProgram(fetchedProgram)
        }
      } catch (error) {
        console.error('Error fetching program:', error)
      }
    }

    fetchData().catch((error) => {
      console.error('Error fetching programs:', error)
    })
  }, [programId, getAccessTokenSilently])

  console.log('program: ', program)
  return (
    <div>
      <Typography variant="h3" textAlign="center">
        {program?.programName.toUpperCase()}
      </Typography>

      {program?.exercises.map((exercise, index) => {
        return (
          <Box
            key={`exercise-${index}`}
            sx={{
              border: '4px solid black',
              width: '90vw',
              height: 'auto',
              margin: '16px',
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
              {Array.from({ length: exercise.sets }, (_, index) => {
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
                          defaultValue={exercise.reps}
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
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
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
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

export default ProgramView
