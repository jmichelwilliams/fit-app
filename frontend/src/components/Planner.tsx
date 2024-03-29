import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface Exercise {
  exerciseName: string
  sets: number
  reps: number
  rest: string
  weight?: number
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

  const handleSelectChange = (
    event: SelectChangeEvent<number | string>,
    index: number,
    property: keyof Exercise
  ): void => {
    const { value } = event.target
    const updatedExercises = [...exercises]
    updatedExercises[index] = {
      ...updatedExercises[index],
      [property]: value
    }
    setExercises(updatedExercises)
  }
  const handleAddExercise = (): void => {
    const newExercise: Exercise = {
      exerciseName: '',
      sets: 1,
      reps: 1,
      rest: '0:30'
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                label="Name of Program"
                id="program-name"
                name="programName"
                value={programName}
                onChange={(e) => {
                  setProgramName(e.target.value)
                }}
                required
                sx={{
                  width: '95vw',
                  margin: '8px'
                }}
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
                    width: '90vw',
                    margin: '8px 8px',
                    alignItems: 'center'
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
                    sx={{
                      margin: '8px auto',
                      width: '270px',
                      maxWidth: '290px'
                    }}
                  />
                  <Box sx={{ width: '290px' }}>
                    <FormControl>
                      <InputLabel id="sets-label" sx={{ margin: '8px' }}>
                        Sets
                      </InputLabel>
                      <Select
                        labelId="sets-label"
                        id="sets"
                        label="Sets"
                        onChange={(e: SelectChangeEvent<number>) => {
                          handleSelectChange(e, index, 'sets')
                        }}
                        defaultValue={1}
                        sx={{ margin: '8px', width: '80px' }}
                      >
                        {Array.from({ length: 5 }, (_, i) => i + 1).map(
                          (set) => (
                            <MenuItem key={set} value={set}>
                              {set}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel id="reps-label" sx={{ margin: '8px' }}>
                        Reps
                      </InputLabel>
                      <Select
                        labelId="reps-label"
                        id="reps"
                        label="Reps"
                        onChange={(e: SelectChangeEvent<number>) => {
                          handleSelectChange(e, index, 'reps')
                        }}
                        defaultValue={1}
                        sx={{ margin: '8px', width: '80px' }}
                      >
                        {Array.from({ length: 15 }, (_, i) => i + 1).map(
                          (rep) => (
                            <MenuItem key={rep} value={rep}>
                              {rep}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel id="rest-label" sx={{ margin: '8px' }}>
                        Rest
                      </InputLabel>
                      <Select
                        labelId="rest-label"
                        id="rest"
                        label="Rest"
                        onChange={(e: SelectChangeEvent<string>) => {
                          handleSelectChange(e, index, 'rest')
                        }}
                        defaultValue={'0:30'}
                        sx={{ margin: '8px', width: '80px' }}
                      >
                        <MenuItem value={'0:30'}>0:30</MenuItem>
                        <MenuItem value={'1:00'}>1:00</MenuItem>
                        <MenuItem value={'1:30'}>1:30</MenuItem>
                        <MenuItem value={'2:00'}>2:00</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <TextField
                    id={'weight'}
                    label="Weight in lbs"
                    name="weight"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e, index)
                    }}
                    type="number"
                    sx={{
                      margin: '8px auto',
                      width: '270px',
                      maxWidth: '290px'
                    }}
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
