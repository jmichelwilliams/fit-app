import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import RepsSelect from './RepsSelect'
import SetsSelect from './SetsSelect'
import RestTimeSelect from './RestTimeSelect'
import ProgramInput from './ProgramInput'

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
                  <ProgramInput
                    index={index}
                    setExercises={setExercises}
                    exercises={exercises}
                    id="exerciseName"
                    name="exerciseName"
                    label="Exercise Name"
                    type="text"
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
                  <ProgramInput
                    index={index}
                    setExercises={setExercises}
                    exercises={exercises}
                    id="weight"
                    name="weight"
                    label="Weight in lbs"
                    type="number"
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
