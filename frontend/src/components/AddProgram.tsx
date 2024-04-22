import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import RepsSelect from './RepsSelect'
import SetsSelect from './SetsSelect'
import RestTimeSelect from './RestTimeSelect'

interface LocalSet {
  setId: number
  reps: number
}

interface LocalExercise {
  exerciseName: string
  sets: LocalSet[]
  rest: string
  weight?: number
}

interface LocalProgram {
  programName: string
  exercises: LocalExercise[]
}

const Planner: React.FC = () => {
  const [programs, setPrograms] = useState<LocalProgram>()
  const [programName, setProgramName] = useState<string>('')
  const [exercises, setExercises] = useState<LocalExercise[]>([])
  const { user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    console.log('Programs:', programs)
  }, [programs])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    event.persist()
    try {
      const accessToken = await getAccessTokenSilently()

      const newProgram: LocalProgram = {
        programName,
        exercises
      }

      setPrograms(newProgram)
      setProgramName('')
      setExercises([])

      if (user !== null && user !== undefined) {
        const res = await fetch(`/programs/${user.sub}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ newProgram })
        })
        if (res.ok) {
          console.log('Program saved successfully')
          setPrograms(undefined)
        }
      }
    } catch (error) {
      console.error('Error:', error)
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
    const newExercise: LocalExercise = {
      exerciseName: '',
      sets: [{ setId: 1, reps: 1 }],
      rest: '0:30'
    }
    setExercises([...exercises, newExercise])
  }
  console.log('exercises: ', exercises)
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
            void handleSubmit(event)
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
                    <SetsSelect
                      index={index}
                      setExercises={setExercises}
                      exercises={exercises}
                    />
                    <RepsSelect
                      index={index}
                      setExercises={setExercises}
                      exercises={exercises}
                    />
                    <RestTimeSelect
                      index={index}
                      setExercises={setExercises}
                      exercises={exercises}
                    />
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
