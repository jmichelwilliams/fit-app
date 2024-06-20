/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import useFetchProgram from '../hooks/useFetchProgram'
import { fetchProgram } from '../utils/fetchProgram'
import {
  Typography,
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import type Program from '../types/Program'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import Footer from './Footer'

interface ProgramFormInputs {
  programName: string
  exercises: Array<{
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    rest: string
    weight: number
  }>
}

const ProgramDetails: React.FC = () => {
  const [program, setProgram] = useState<Program | undefined>()
  const [open, setOpen] = useState(false)
  const { getAccessTokenSilently } = useAuth0()
  const { programId } = useParams<{
    programId: string
  }>()
  useFetchProgram(programId, getAccessTokenSilently, fetchProgram, setProgram)
  const { control, handleSubmit } = useForm<ProgramFormInputs>({
    mode: 'onBlur'
  })
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

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

        if (response.ok) {
          navigate('/planner')
        } else {
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
          navigate('/planner')
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
                <Box
                  key={`exercise-${exerciseIndex}`}
                  sx={{
                    border: '2px solid black',
                    width: '90vw',
                    height: 'auto',
                    marginBottom: '16px',
                    padding: '8px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      height: '90px'
                    }}
                  >
                    <Controller
                      name={`exercises.${exerciseIndex}.exerciseName`}
                      control={control}
                      defaultValue={exercise.exerciseName}
                      rules={{
                        required: 'A name is required',
                        minLength: { value: 3, message: 'Minimum length is 3' }
                      }}
                      render={({
                        field: { onChange, value, ref, onBlur },
                        fieldState: { error }
                      }) => (
                        <TextField
                          label="Name of Exercise"
                          id={`exercises.${exerciseIndex}.exerciseName`}
                          value={value}
                          onBlur={onBlur}
                          inputRef={ref}
                          onChange={(e) => {
                            const val = e.target.value
                            onChange(val)
                          }}
                          required
                          sx={{
                            width: '85vw',
                            margin: '8px'
                          }}
                          error={!(error == null)}
                          helperText={error != null ? error.message : null}
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '70px'
                      }}
                    >
                      <Controller
                        name={`exercises.${exerciseIndex}.weight`}
                        control={control}
                        defaultValue={exercise.weight}
                        rules={{
                          required: 'Weight is required',
                          min: { value: 1, message: 'Minimum value is 1' }
                        }}
                        render={({
                          field: { onChange, value, ref, onBlur },
                          fieldState: { error }
                        }) => (
                          <TextField
                            id={`weightInput-${exerciseIndex}`}
                            label="weight"
                            name={`exercises.${exerciseIndex}.weight`}
                            type="number"
                            size="small"
                            value={value}
                            onBlur={onBlur}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value)
                              if (!isNaN(val) && val !== 0) {
                                onChange(val)
                              } else {
                                onChange('')
                              }
                            }}
                            inputRef={ref}
                            onKeyDown={(e) => {
                              if (['e', '-', '+'].includes(e.key)) {
                                e.preventDefault()
                              }
                            }}
                            inputProps={{
                              inputMode: 'decimal',
                              pattern: '[0-9]*'
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  lbs
                                </InputAdornment>
                              )
                            }}
                            InputLabelProps={{
                              sx: {
                                fontSize: isSmallScreen ? '.95rem' : '1rem'
                              }
                            }}
                            sx={{
                              width: '120px',
                              marginTop: '8px'
                            }}
                            error={!(error == null)}
                            helperText={error != null ? error.message : null}
                          />
                        )}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap'
                      }}
                    >
                      {Array.from(
                        { length: exercise.sets.length },
                        (_, setIndex) => {
                          return (
                            <Box
                              key={`set-${exerciseIndex}-${setIndex + 1}`}
                              sx={{
                                display: 'flex',
                                margin: '8px',
                                flexDirection: 'column',
                                maxWidth: '80px',
                                alignItems: 'space-evenly'
                              }}
                            >
                              <Typography
                                variant="body1"
                                textAlign="center"
                                sx={{ color: 'white !important' }}
                              >
                                Set: {setIndex + 1}
                              </Typography>
                              <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                                alignItems="center"
                                sx={{ paddingLeft: '8px' }}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '8px'
                                  }}
                                >
                                  <Controller
                                    name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
                                    control={control}
                                    defaultValue={exercise.sets[setIndex].reps}
                                    rules={{
                                      required: 'Rep is required',
                                      min: {
                                        value: 1,
                                        message: 'Minimum value is 1'
                                      }
                                    }}
                                    render={({
                                      field: { onChange, value, ref, onBlur },
                                      fieldState: { error }
                                    }) => (
                                      <TextField
                                        id={`repsInput-${exerciseIndex}-${
                                          setIndex + 1
                                        }`}
                                        label="reps"
                                        name="reps"
                                        value={isNaN(value) ? '' : value}
                                        inputRef={ref}
                                        onBlur={onBlur}
                                        type="number"
                                        size="small"
                                        inputProps={{
                                          inputMode: 'numeric',
                                          pattern: '[0-9]*'
                                        }}
                                        onChange={(e) => {
                                          const val = parseInt(e.target.value)
                                          onChange(val)
                                        }}
                                        onKeyDown={(e) => {
                                          if (['e', '-', '+'].includes(e.key)) {
                                            e.preventDefault()
                                          }
                                        }}
                                        InputLabelProps={{
                                          sx: {
                                            fontSize: isSmallScreen
                                              ? '.95rem'
                                              : '1rem',
                                            textAlign: 'center'
                                          }
                                        }}
                                        sx={{ width: '100%' }}
                                        error={!(error == null)}
                                        helperText={
                                          error != null ? error.message : null
                                        }
                                      />
                                    )}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          )
                        }
                      )}
                    </Box>
                    <Controller
                      name={`exercises.${exerciseIndex}.rest`}
                      control={control}
                      defaultValue={exercise.rest}
                      render={({ field: { onChange, value } }) => (
                        <FormControl>
                          <InputLabel
                            id={`rest-label-${exerciseIndex}`}
                            sx={{ margin: '8px' }}
                          >
                            Rest
                          </InputLabel>
                          <Select
                            id={`rest-${exerciseIndex}`}
                            labelId={`rest-label-${exerciseIndex}`}
                            label="Rest"
                            name={`restTime[${exerciseIndex}]`}
                            defaultValue={exercise.rest}
                            value={value}
                            sx={{ margin: '8px', width: '80px' }}
                            onChange={(e) => {
                              onChange(e.target.value)
                            }}
                          >
                            <MenuItem value={'0:30'}>0:30</MenuItem>
                            <MenuItem value={'1:00'}>1:00</MenuItem>
                            <MenuItem value={'1:30'}>1:30</MenuItem>
                            <MenuItem value={'2:00'}>2:00</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Box>
                </Box>
              )
            })}
            <Footer>
              <Button
                variant={'contained'}
                type="submit"
                form="program-form"
                color="success"
                sx={{ marginRight: '16px' }}
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

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: 'var(--background-color)' } }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'white !important' }}>
            Are you sure you want to delete this program?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'rgb(252,163,17)' }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProgramDetails
