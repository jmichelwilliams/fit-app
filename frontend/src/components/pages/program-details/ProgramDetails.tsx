import React, { useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { useFetchProgram } from 'hooks/useFetchProgram'
import { fetchProgram } from '../../../utils/fetchProgram'
import { Box, TextField, Button, CircularProgress } from '@mui/material'
import type { Program } from 'types/Program'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Footer } from '../../common'
import { ConfirmDeleteDialog } from './components/ConfirmDeleteDialog'
import { ExerciseFields } from './components/ExerciseFields'
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

export const ProgramDetails: React.FC = () => {
  const [program, setProgram] = useState<Program | undefined>()
  const [open, setOpen] = useState(false)
  const { getAccessTokenSilently } = useAuth0()
  const { programId } = useParams<{
    programId: string
  }>()
  useFetchProgram(programId, getAccessTokenSilently, fetchProgram, setProgram)
  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<ProgramFormInputs>({
    mode: 'onBlur'
  })
  const { showMessage } = useSnackbar()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ProgramFormInputs> = async (
    data
  ): Promise<void> => {
    const updatedProgram = {
      programName: data.programName,
      exercises: data.exercises.map((exercise: any) => ({
        ...exercise,
        sets: exercise.sets.map((set: any, index: number) => ({
          ...set,
          setId: index + 1
        }))
      }))
    }

    try {
      const accessToken = await getAccessTokenSilently()

      if (program !== null && program !== undefined) {
        const response = await fetch(`/programs/${program._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ updatedProgram })
        })

        const result = await response.json()
        if (result.status === 200) {
          if (result.message === 'No changes detected') {
            showMessage('No changes were made to the program', 'info')
            navigate('/planner')
          } else {
            showMessage('Program updated successfully', 'success')
            navigate('/planner')
          }
        } else {
          showMessage('Program not updated, please try again', 'error')
          throw new Error('Network response was not ok.')
        }
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleDeleteConfirm = async (): Promise<void> => {
    try {
      const accessToken = await getAccessTokenSilently()

      if (program !== null && program !== undefined) {
        const response = await fetch(`/programs/${program._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })

        if (response.ok) {
          showMessage('Program deleted successfully', 'success')
          navigate('/planner')
        } else {
          showMessage('Failed to delete program, please try again', 'error')
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
        position: 'relative',
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
          <form id="program-form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '90px'
                }}
              >
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
              </Box>
            </Box>
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
                sx={{ marginRight: '16px' }}
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
    </Box>
  )
}
