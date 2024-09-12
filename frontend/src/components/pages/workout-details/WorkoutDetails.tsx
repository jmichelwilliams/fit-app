import React, { useState, useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useFetchProgram } from 'hooks/useFetchProgram'
import type { Program } from 'types/Program'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchProgram } from 'utils/fetchProgram'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  styled
} from '@mui/material'
import { Footer } from '../../common'
import { WorkoutDetailsForm } from './components'
import { useSnackbar } from 'context/SnackbarContext'
import BACKEND_URL from '../../../constants'

interface ProgramFormInputs {
  exercises: Array<{
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    weight: number
    completed: boolean
  }>
}

const StyledWorkoutDetailsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px auto;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: 8px;
  max-height: 75dvh;
`
const StyledLoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
export const WorkoutDetails: React.FC = () => {
  const [program, setProgram] = useState<Program>()
  const [isLoading, setIsLoading] = useState(true)
  const [completionOrder, setCompletionOrder] = useState<number[]>([])
  const { user, getAccessTokenSilently } = useAuth0()
  const { programId } = useParams<{
    programId: string
  }>()
  const { control, handleSubmit, setValue } = useForm<ProgramFormInputs>({
    mode: 'onBlur'
  })
  const navigate = useNavigate()
  const { showMessage } = useSnackbar()

  useFetchProgram(programId, getAccessTokenSilently, fetchProgram, setProgram)

  useEffect(() => {
    if (program?.programName == null) return

    const fetchLatestWorkout = async (): Promise<void> => {
      setIsLoading(true)
      try {
        if (user !== null && user !== undefined) {
          const accessToken = await getAccessTokenSilently()
          const res = await fetch(
            `${BACKEND_URL}/workouts/${user.sub}/latest/${program?.programName}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
              }
            }
          )
          const data = await res.json()

          if (data.data !== null) {
            const exercises = data.data.exercises

            exercises.forEach(
              (exercise: {
                exerciseName: string
                weight: number
                sets: Array<{ reps: number }>
              }) => {
                const exerciseIndex = program?.exercises.findIndex(
                  (e) => e.exerciseName === exercise.exerciseName
                )

                if (exerciseIndex !== undefined && exerciseIndex !== -1) {
                  setValue(`exercises.${exerciseIndex}.weight`, exercise.weight)
                  exercise.sets.forEach(
                    (set: { reps: number }, setIndex: number) => {
                      setValue(
                        `exercises.${exerciseIndex}.sets.${setIndex}.reps`,
                        set.reps
                      )
                    }
                  )
                }
              }
            )
          }
        }
      } catch (error) {
        console.error('No Workouts Found')
      } finally {
        setIsLoading(false)
      }
    }
    void fetchLatestWorkout()
  }, [program, setValue, getAccessTokenSilently, user])

  const handleCompletionOrder = (
    exerciseIndex: number,
    isChecked: boolean
  ): void => {
    if (isChecked) {
      setCompletionOrder((prevOrder) => [...prevOrder, exerciseIndex])
    } else {
      setCompletionOrder((prevOrder) =>
        prevOrder.filter((index) => index !== exerciseIndex)
      )
    }
  }
  const onSubmit: SubmitHandler<ProgramFormInputs> = async (
    data
  ): Promise<void> => {
    try {
      const accessToken = await getAccessTokenSilently()

      if (program?.exercises == null) {
        console.error('No exercises found in program')
        return
      }

      const completedExercises = completionOrder.map((index) => ({
        ...data.exercises[index],
        exerciseName: program.exercises[index].exerciseName,
        rest: program.exercises[index].rest,
        completed: true
      }))

      const nonCompletedExercises = program.exercises
        .map((exercise, index) => {
          if (!completionOrder.includes(index)) {
            return {
              exerciseName: exercise.exerciseName,
              rest: exercise.rest,
              weight: data.exercises[index]?.weight ?? 0,
              sets: data.exercises[index]?.sets ?? [],
              completed: false
            }
          }
          return null
        })
        .filter((exercise) => exercise !== null)

      const allExercises = [...completedExercises, ...nonCompletedExercises]

      const completeData = {
        ...data,
        programName: program?.programName,
        exercises: allExercises
      }

      if (user !== null && user !== undefined) {
        const response = await fetch(`${BACKEND_URL}/workouts/${user.sub}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ workoutSession: completeData })
        })

        if (response.ok) {
          showMessage('Workout completed successfully', 'success')
          navigate('/workouts')
        } else {
          showMessage('Failed to save workout, please try again', 'error')
          throw new Error('Network response was not ok.')
        }
      }
    } catch (error) {
      console.error('Error', error)
    }
  }

  return (
    <StyledWorkoutDetailsWrapper>
      {isLoading ? (
        <StyledLoadingContainer>
          <CircularProgress size={70} />
        </StyledLoadingContainer>
      ) : (
        <Box>
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ marginBottom: '8px' }}
          >
            {program?.programName}
          </Typography>
          <form id="program-form" onSubmit={handleSubmit(onSubmit)}>
            {program?.exercises.map((exercise, exerciseIndex) => {
              return (
                <WorkoutDetailsForm
                  key={`exercise-${exerciseIndex}`}
                  exerciseIndex={exerciseIndex}
                  exercise={exercise}
                  control={control}
                  completionOrder={completionOrder}
                  handleCompletionOrder={handleCompletionOrder}
                />
              )
            })}
            <Footer>
              <Button
                variant={'contained'}
                type="submit"
                form="program-form"
                color="success"
              >
                Complete Workout
              </Button>
            </Footer>
          </form>
        </Box>
      )}
    </StyledWorkoutDetailsWrapper>
  )
}
