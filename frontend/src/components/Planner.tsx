import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

interface FormData {
  programName: string
}

interface Exercises {
  exerciseName: string
  sets: string
  reps: string
  rest: string
  tempo: string
}
const Planner: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ programName: '' })
  const [exercises, setExercises] = useState<Exercises[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log(formData)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleAddExercise = (): void => {
    const newExercise = {
      exerciseName: '',
      sets: '',
      reps: '',
      rest: '',
      tempo: ''
    }

    setExercises([...exercises, newExercise])
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
      <Box>
        <Typography variant="h3" textAlign="center">
          Enter your program
        </Typography>
      </Box>
      <Box>
        <form
          onSubmit={(event) => {
            handleSubmit(event)
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '16px auto'
            }}
          >
            <Box>
              <TextField
                label="Name of Program"
                id="program-name"
                name="programName"
                onChange={handleChange}
                required
              />
            </Box>
            {Object.keys(exercises).map((exercise, index) => {
              return (
                <Box key={`${exercise}-${index}`}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{
                      border: '2px solid var(--font-color)',
                      borderRadius: '8px',
                      padding: '8px',
                      margin: '16px'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: 'center' }}
                    >
                      Exercise {index + 1}{' '}
                    </Typography>
                    <TextField
                      id={`exercise-name-${index}`}
                      label="Exercise Name"
                      name={`exerciseName-${index}`}
                      onChange={handleChange}
                      sx={{ margin: '8px auto' }}
                    />
                    <TextField
                      id={`number-of-sets-${index}`}
                      label="Number of Sets"
                      name={`sets-${index}`}
                      onChange={handleChange}
                      sx={{ margin: '8px auto' }}
                    />
                    <TextField
                      id="number-of-reps"
                      label="Number of Reps"
                      name="reps"
                      onChange={handleChange}
                      sx={{ margin: '8px auto' }}
                    />
                    <TextField
                      id="rest-time"
                      label="Rest Time"
                      name="rest"
                      onChange={handleChange}
                      sx={{ margin: '8px auto' }}
                    />
                    <TextField
                      id="tempo"
                      label="Tempo"
                      name="tempo"
                      onChange={handleChange}
                      sx={{ margin: '8px auto' }}
                    />
                  </Box>
                </Box>
              )
            })}
            <Box display="flex" flexDirection="column">
              <Button
                variant="contained"
                sx={{
                  margin: '8px 0px',
                  backgroundColor: 'var(--button-color)'
                }}
                onClick={handleAddExercise}
              >
                Add Exercise
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: 'var(--button-color)' }}
              >
                Add Program
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Planner
