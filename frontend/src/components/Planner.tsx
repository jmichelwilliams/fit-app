import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

interface Exercise {
  exerciseName: string
  sets: number
  reps: number
  weight: number
  rest: string
  tempo: number
}

interface Program {
  id: string
  programName: string
  exercises: Exercise[]
}
const Planner: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [programName, setProgramName] = useState<string>('')
  const [exercises, setExercises] = useState<Exercise[]>([])

  useEffect(() => {
    console.log('Programs:', programs)
  }, [programs])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (programName.trim() !== '' && exercises.length > 0) {
      const newProgram: Program = {
        id: '123abc', // TODO: Generate id from backend
        programName,
        exercises
      }
      setPrograms((prevPrograms) => [...prevPrograms, newProgram])
      setProgramName('')
      setExercises([])
    }
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { name, value } = event.target
    const updatedExercises = [...exercises]
    updatedExercises[index] = {
      ...updatedExercises[index],
      [name]: name === 'exerciseName' ? value : parseInt(value, 10)
    }
    setExercises(updatedExercises)
  }

  const handleAddExercise = (): void => {
    const newExercise: Exercise = {
      exerciseName: '',
      sets: 0,
      reps: 0,
      weight: 0,
      rest: '',
      tempo: 0
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
        <form onSubmit={handleSubmit}>
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
                value={programName}
                onChange={(e) => {
                  setProgramName(e.target.value)
                }}
                required
              />
            </Box>
            {exercises.map((_, index) => (
              <Box key={`exercise-${index}`}>
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
                  <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                    Exercise {index + 1}{' '}
                  </Typography>
                  <TextField
                    id={'exerciseName'}
                    label="Exercise Name"
                    name="exerciseName"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e, index)
                    }}
                    sx={{ margin: '8px auto' }}
                  />
                  <TextField
                    id="sets"
                    label="Number of Sets"
                    name="sets"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e, index)
                    }}
                    sx={{ margin: '8px auto' }}
                  />
                  <TextField
                    id="number-of-reps"
                    label="Number of Reps"
                    name="reps"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e, index)
                    }}
                    sx={{ margin: '8px auto' }}
                  />
                  <TextField
                    id="rest-time"
                    label="Rest Time"
                    name="rest"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e, index)
                    }}
                    sx={{ margin: '8px auto' }}
                  />
                  <TextField
                    id="tempo"
                    label="Tempo"
                    name="tempo"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e, index)
                    }}
                    sx={{ margin: '8px auto' }}
                  />
                  <TextField
                    id="weight"
                    label="Weight"
                    name="weight"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e, index)
                    }}
                    sx={{ margin: '8px auto' }}
                  />
                </Box>
              </Box>
            ))}
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
                Save Program
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Planner
