import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { Program } from 'types/Program'
import type { Workout } from 'types/Workout'
import { useParams, useNavigate } from 'react-router-dom'
import { useDemoData } from 'context/DemoDataContext'
import { useMockLoading } from 'hooks/useMockLoading'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  styled
} from '@mui/material'
import { Footer, WorkoutDetailsForm } from '../../../components/common'
import { useSnackbar } from 'context/SnackbarContext'

interface ProgramFormInputs {
  exercises: Array<{
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    weight: number
    completed?: boolean
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
export const DemoWorkoutDetails: React.FC = () => {
  const { workouts } = useDemoData()
  const [isLoading] = useMockLoading(true, 500)
  const [completionOrder, setCompletionOrder] = useState<number[]>([])
  const { programId } = useParams<{
    programId: string
  }>()
  const { control, handleSubmit } = useForm<ProgramFormInputs>({
    mode: 'onBlur'
  })
  const navigate = useNavigate()
  const { showMessage } = useSnackbar()

  const program: Program | Workout | undefined = workouts.find(
    (workout) => workout._id === programId
  )

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
  const onSubmit: SubmitHandler<ProgramFormInputs> = async () => {
    showMessage(
      'Thank you for trying FitApp! Sign up to save your programs and continue your fitness journey.',
      'success'
    )
    navigate('/demo/workouts')
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
