import React, { useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import useFetchProgram from '../hooks/useFetchProgram'
import type Program from '../types/Program'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchProgram } from '../utils/fetchProgram'
import { formatRestTime } from '../utils/formatRestTime'
import Box from '@mui/material/Box'
import {
  Button,
  Typography,
  Checkbox,
  TextField,
  Grid,
  useMediaQuery,
  FormControlLabel,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import useTheme from '@mui/material/styles/useTheme'
import Footer from './Footer'

interface ProgramFormInputs {
  exercises: Array<{
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    weight: number
    completed: boolean
  }>
}
const WorkoutDetails: React.FC = () => {
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
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const onSubmit: SubmitHandler<ProgramFormInputs> = async (
    data
  ): Promise<void> => {
    try {
      const accessToken = await getAccessTokenSilently()

      const completeData = {
        ...data,
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
                <Box
                  key={`exercise-${exerciseIndex}`}
                  sx={{
                    border: '4px solid black',
                    width: '90vw',
                    height: 'auto',
                    margin: '16px',
                    padding: '8px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ marginBottom: '16px' }}
                  >
                    {exercise.exerciseName}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center'
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
                          name="weight"
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
                          InputProps={{
                            inputMode: 'decimal',
                            endAdornment: (
                              <InputAdornment position="end">
                                lbs
                              </InputAdornment>
                            )
                          }}
                          InputLabelProps={{
                            sx: { fontSize: isSmallScreen ? '.95rem' : '1rem' }
                          }}
                          sx={{
                            width: '30%',
                            marginBottom: '8px'
                          }}
                          error={!(error == null)}
                          helperText={error != null ? error.message : null}
                        />
                      )}
                    />
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
                              <Typography variant="body1" textAlign="center">
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
                                        type="number"
                                        size="small"
                                        value={isNaN(value) ? '' : value}
                                        inputRef={ref}
                                        onBlur={onBlur}
                                        onChange={(e) => {
                                          const val = parseInt(e.target.value)

                                          onChange(val)
                                        }}
                                        onKeyDown={(e) => {
                                          if (['e', '-', '+'].includes(e.key)) {
                                            e.preventDefault()
                                          }
                                        }}
                                        inputProps={{
                                          inputMode: 'numeric',
                                          pattern: '[0-9]*'
                                        }}
                                        InputLabelProps={{
                                          sx: {
                                            fontSize: isSmallScreen
                                              ? '.95rem'
                                              : '1rem',
                                            textAlign: 'center'
                                          }
                                        }}
                                        sx={{
                                          width: '100%',
                                          marginBottom: '8px'
                                        }}
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
                    <Typography
                      variant="body1"
                      textAlign="center"
                      sx={{ marginTop: '8px' }}
                    >
                      Rest: {formatRestTime(exercise.rest)}
                    </Typography>
                    <Controller
                      name={`exercises.${exerciseIndex}.completed`}
                      control={control}
                      defaultValue={false}
                      render={({ field: { onChange, value, ref } }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              id={`completed-checkbox-${exerciseIndex}`}
                              checked={value || false}
                              onChange={() => {
                                if (!value) {
                                  onChange(true)
                                } else {
                                  onChange(false)
                                }
                              }}
                              style={{
                                color: value ? 'green' : 'initial'
                              }}
                            />
                          }
                          label="Completed?"
                        />
                      )}
                    />
                  </Box>
                </Box>
              )
            })}

            <Footer>
              <Button variant={'contained'} type="submit" form="program-form">
                Complete Workout
              </Button>
            </Footer>
          </form>
        </Box>
      )}
    </Box>
  )
}

export default WorkoutDetails
