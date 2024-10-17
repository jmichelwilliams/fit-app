import React, { useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { Box, TextField, Button, CircularProgress, styled } from '@mui/material'
import type { Program } from 'types/Program'
import { useParams, useNavigate } from 'react-router-dom'
import { useDemoData } from 'context/DemoDataContext'
import {
  Footer,
  ConfirmDeleteDialog,
  ExerciseFields
} from '../../../components/common'
import { useSnackbar } from 'context/SnackbarContext'

interface ProgramFormInputs {
  programName: string
  exercises: Array<{
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    rest: string
    weight: number
  }>
}

const StyledProgramDetailsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px auto;
  position: relative;
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
  width: 100%;
`
const StyledCenteredContainer = styled(Box)`
  display: flex;
  justify-content: center;
`
const StyledProgramNameContainer = styled(StyledCenteredContainer)`
  height: 90px;
`
export const DemoProgramDetails: React.FC = () => {
  const { programs } = useDemoData()
  const [open, setOpen] = useState(false)
  const { programId } = useParams<{
    programId: string
  }>()
  const program: Program | undefined = programs.find(
    (program) => program._id === programId
  )
  console.log('program ', program)
  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<ProgramFormInputs>({
    mode: 'onBlur'
  })
  const { showMessage } = useSnackbar()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ProgramFormInputs> = async () => {
    showMessage(
      'Thank you for trying FitApp! Sign up to save your programs and continue your fitness journey.',
      'success'
    )
    navigate('/demo/planner')
  }

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleDeleteConfirm = async (): Promise<void> => {
    showMessage(
      'Thank you for trying FitApp! Sign up to save your programs and continue your fitness journey.',
      'success'
    )
    navigate('/demo/planner')
  }
  return (
    <StyledProgramDetailsWrapper>
      {program == null ? (
        <StyledLoadingContainer>
          <CircularProgress size={70} />
        </StyledLoadingContainer>
      ) : (
        <Box>
          <form id="program-form" onSubmit={handleSubmit(onSubmit)}>
            <StyledCenteredContainer>
              <StyledProgramNameContainer>
                <Controller
                  name="programName"
                  control={control}
                  defaultValue={program.programName}
                  rules={{
                    required: 'A name is required',
                    minLength: { value: 3, message: 'Minimum length is 3' }
                  }}
                  render={({
                    field: { onChange, ref, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label="Name of Program"
                      id={`program.programName`}
                      onBlur={onBlur}
                      value={value}
                      inputRef={ref}
                      onChange={(e) => {
                        const val = e.target.value
                        onChange(val)
                      }}
                      required
                      sx={{
                        width: '95vw'
                      }}
                      error={!(error == null)}
                      helperText={error != null ? error.message : null}
                    />
                  )}
                />
              </StyledProgramNameContainer>
            </StyledCenteredContainer>
            {program.exercises.map((exercise, exerciseIndex) => {
              return (
                <ExerciseFields
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
                sx={{
                  marginRight: '16px'
                }}
                disabled={!isDirty}
              >
                Save Changes
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleClickOpen}
              >
                Delete Program
              </Button>
            </Footer>
          </form>
        </Box>
      )}
      <ConfirmDeleteDialog
        open={open}
        handleClose={handleClose}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </StyledProgramDetailsWrapper>
  )
}
