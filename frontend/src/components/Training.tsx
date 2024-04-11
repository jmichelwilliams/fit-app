import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import FormControlLabel from '@mui/material/FormControlLabel'
import { formatRestTime } from '../utils/formatRestTime'

const Training: React.FC = () => {
  const [completed, setCompleted] = useState<boolean[]>(Array(2).fill(false))

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const mockData = [
    {
      exerciseName: 'Bench',
      reps: 3,
      sets: 4,
      rest: '1:00',
      weight: 100
    },
    {
      exerciseName: 'Military Press',
      reps: 2,
      sets: 1,
      rest: '0:30',
      weight: 50
    }
  ]

  const handleToggle = (index: number): void => {
    const newCompleted = [...completed]
    newCompleted[index] = !completed[index]
    setCompleted(newCompleted)
  }

  const handleInputChange = (event: { target: { value: any } }): void => {
    console.log(event.target.value)
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
      {mockData.map((exercise, index) => {
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
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                          }}
                          InputLabelProps={{
                            sx: { fontSize: isSmallScreen ? '.95rem' : '1rem' } // Adjust font size based on screen size
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

export default Training
