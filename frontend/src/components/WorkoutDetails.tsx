import React, { useState } from 'react'
import useFetchProgram from '../hooks/useFetchProgram'
import type Program from '../types/Program'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchProgram } from '../utils/fetchProgram'
import { formatRestTime } from '../utils/formatRestTime'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import FormControlLabel from '@mui/material/FormControlLabel'

const WorkoutDetails: React.FC = () => {
  const [completed, setCompleted] = useState<boolean[]>(Array(2).fill(false))
  const [program, setProgram] = useState<Program>()
  const { programId } = useParams<{
    programId: string
  }>()
  const { getAccessTokenSilently } = useAuth0()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useFetchProgram(programId, getAccessTokenSilently, fetchProgram, setProgram)

  const handleToggle = (index: number): void => {
    const newCompleted = [...completed]

    newCompleted[index] = !completed[index]
    setCompleted(newCompleted)
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { name, value } = event.target
    const updatedProgram = { ...program }

    if (updatedProgram.exercises !== undefined) {
      updatedProgram.exercises[index] = {
        ...updatedProgram.exercises[index],
        [name]: name === 'exerciseName' ? value : parseInt(value, 10)
      }
    }
    setProgram(updatedProgram as Program)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '16px auto'
      }}
    >
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
              sx={{ marginBottom: '8px' }}
            >
              {exercise.exerciseName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}
            >
              <TextField
                id={`weightInput-${index}`}
                label="weight (lbs)"
                name="weight"
                type="number"
                size="small"
                defaultValue={exercise.weight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e, index)
                }}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
                }}
                InputLabelProps={{
                  sx: { fontSize: isSmallScreen ? '.95rem' : '1rem' } // Adjust font size based on screen size
                }}
                sx={{
                  width: '30%'
                }}
              />
              <Box sx={{ display: 'flex' }}>
                {Array.from({ length: exercise.sets }, (_, index) => {
                  return (
                    <Box
                      key={`set${index + 1}`}
                      sx={{
                        display: 'flex',
                        margin: '8px'
                      }}
                    >
                      <Typography variant="body1" textAlign="center">
                        Set: {index + 1}
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ paddingLeft: '8px' }}
                      >
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '8px'
                          }}
                        >
                          <TextField
                            id={`repsInput-${index}`}
                            label="reps"
                            name="reps"
                            type="number"
                            size="small"
                            defaultValue={exercise.reps}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleChange(e, index)
                            }}
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
                              width: '100%'
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )
                })}
              </Box>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ marginTop: '8px' }}
              >
                Rest: {formatRestTime(exercise.rest)}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={completed[index]}
                    onChange={() => {
                      handleToggle(index)
                    }}
                    style={{
                      color: completed[index] ? 'green' : 'initial'
                    }}
                  />
                }
                label="Completed?"
              />
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default WorkoutDetails
