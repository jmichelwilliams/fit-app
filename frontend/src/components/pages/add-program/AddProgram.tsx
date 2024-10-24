import React from 'react'
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Typography, Box, styled } from '@mui/material'
import { ProgramNameField } from 'components/common'
import { ExerciseInputFields } from '../../common'
import { useSnackbar } from 'context/SnackbarContext'
import { type ProgramFormInputs } from 'types/ProgramFormInputs'
import BACKEND_URL from '../../../constants'

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px auto;
`
export const AddProgram: React.FC = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const { showMessage } = useSnackbar()
  const { control, handleSubmit } = useForm<ProgramFormInputs>({
    mode: 'onBlur',
    defaultValues: {
      programName: '',
      exercises: [
        {
          exerciseName: '',
          sets: 1,
          reps: 1,
          rest: '0:30',
          weight: ''
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises'
  })

  const handleAddExercise = (): void => {
    append({
      exerciseName: '',
      sets: 1,
      reps: 1,
      rest: '0:30',
      weight: ''
    })
  }

  const handleRemoveExercise = (index: number): void => {
    remove(index)
  }

  const onSubmit: SubmitHandler<ProgramFormInputs> = async (data) => {
    try {
      const accessToken = await getAccessTokenSilently()

      if (user !== null && user !== undefined) {
        const res = await fetch(`${BACKEND_URL}/programs/${user.sub}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ program: data })
        })

        if (res.ok) {
          showMessage('Program saved successfully', 'success')
          navigate('/planner')
        }
      }
    } catch (error) {
      showMessage('Failed to save program, please try again', 'error')
      console.error('Error:', error)
    }
  }

  return (
    <StyledContainer>
      <Box>
        <Typography variant="h3" textAlign="center">
          Enter your program
        </Typography>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledContainer>
            <ProgramNameField control={control} />
            {fields.map((exercise, exerciseIndex) => (
              <ExerciseInputFields
                key={exercise.id}
                exerciseIndex={exerciseIndex}
                control={control}
                fields={fields}
                handleRemoveExercise={handleRemoveExercise}
              />
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
                <Typography
                  variant="button"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Add Exercise
                </Typography>
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: 'var(--button-color)',
                  '&:hover': {
                    backgroundColor: 'var(--button-color)'
                  }
                }}
              >
                <Typography
                  variant="button"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Save Program
                </Typography>
              </Button>
            </Box>
          </StyledContainer>
        </form>
      </Box>
    </StyledContainer>
  )
}
