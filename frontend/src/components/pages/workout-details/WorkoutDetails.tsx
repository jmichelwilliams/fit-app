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
            data.data.exercises.forEach(
              (exercise: { weight: any; sets: any }, exerciseIndex: any) => {
                setValue(`exercises.${exerciseIndex}.weight`, exercise.weight)

                exercise.sets.forEach((_: any, setIndex: number) => {
                  setValue(
                    `exercises.${exerciseIndex}.sets.${setIndex}.reps`,
                    exercise.sets[setIndex].reps
                  )
                })
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

  const onSubmit: SubmitHandler<ProgramFormInputs> = async (
    data
  ): Promise<void> => {
    try {
      const accessToken = await getAccessTokenSilently()

      const completeData = {
        ...data,
        programName: program?.programName,
        exercises: data.exercises.map((exercise, index) => ({
          ...exercise,
          exerciseName: program?.exercises[index].exerciseName,
          rest: program?.exercises[index].rest
        }))
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
