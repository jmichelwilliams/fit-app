import React from 'react'
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Box, styled } from '@mui/material'
import { ProgramNameField } from 'components/common'
import { ExerciseInputFields } from '../../../components/common'
import { useSnackbar } from 'context/SnackbarContext'
import { type ProgramFormInputs } from 'types/ProgramFormInputs'

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px auto;
`
export const DemoAddProgram: React.FC = () => {
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

  const onSubmit: SubmitHandler<ProgramFormInputs> = async () => {
    showMessage(
      'Thank you for trying FitApp! Sign up to save your programs and continue your fitness journey.',
      'success'
    )
    navigate('/demo/planner')
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
