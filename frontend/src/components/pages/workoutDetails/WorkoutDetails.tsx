import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import useFetchProgram from '../../../hooks/useFetchProgram'
import type Program from '../../../types/Program'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchProgram } from '../../../utils/fetchProgram'
import Box from '@mui/material/Box'
import { Button, Typography, CircularProgress } from '@mui/material'
import { Footer } from '../../common'
import { WorkoutDetailsForm } from '.'

interface ProgramFormInputs {
  exercises: Array<{
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    weight: number
    completed: boolean
  }>
}

export const WorkoutDetails: React.FC = () => {
  const [program, setProgram] = useState<Program>()
  const { user, getAccessTokenSilently } = useAuth0()
  const { programId } = useParams<{
    programId: string
  }>()
  useFetchProgram(programId, getAccessTokenSilently, fetchProgram, setProgram)
  const { control, handleSubmit } = useForm<ProgramFormInputs>({
    mode: 'onBlur'
  })
  const navigate = useNavigate()

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
        const response = await fetch(`/workouts/${user.sub}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ workoutSession: completeData })
        })

        if (response.ok) {
          navigate('/workouts')
        } else {
          throw new Error('Network response was not ok.')
        }
      }
    } catch (error) {
      console.error('Error', error)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0px auto',
        overflowX: 'hidden',
        overflowY: 'scroll',
        paddingTop: '8px',
        maxHeight: '75dvh'
      }}
    >
      {program == null ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '100%'
          }}
        >
          <CircularProgress size={70} />
        </Box>
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
    </Box>
  )
}
