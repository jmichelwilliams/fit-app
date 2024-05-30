/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useFetchProgram from '../hooks/useFetchProgram'
import { fetchProgram } from '../utils/fetchProgram'
import {
  Typography,
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button
} from '@mui/material'
import type Program from '../types/Program'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import Footer from './Footer'

const ProgramDetails: React.FC = () => {
  const [program, setProgram] = useState<Program | undefined>()
  const { programId } = useParams<{
    programId: string
  }>()
  const {
    control,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
    handleSubmit,
    getValues,
    setValue
  } = useForm({
    mode: 'onChange'
  })
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { getAccessTokenSilently } = useAuth0()

  const navigate = useNavigate()

  useFetchProgram(programId, getAccessTokenSilently, fetchProgram, setProgram)

  const onSubmit = async (data: any): Promise<void> => {
    const formData = getValues()
    const updatedProgram = {
      exercises: formData.exercises.map((exercise: any) => ({
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
  console.log('program: ', program)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '16px auto',
        paddingBottom: '32px'
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" textAlign="center">
          {program?.programName.toUpperCase()}
        </Typography>
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
                variant="subtitle1"
                fontWeight="bold"
                textAlign="center"
                sx={{ marginBottom: '8px' }}
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
                  name={`exercises[${exerciseIndex}].weight`}
                  control={control}
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
                  defaultValue={exercise.weight || ''}
                  rules={{
                    required: 'Weight is required',
                    min: { value: 1, message: 'Minimum value is 1' }
                  }}
                  render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { error }
                  }) => (
                    <TextField
                      id={`weightInput-${exerciseIndex}`}
                      label="weight (lbs)"
                      name={`exercises[${exerciseIndex}].weight`}
                      type="number"
                      size="small"
                      value={isNaN(value) ? '' : value}
                      onChange={(e) => {
                        const val = e.target.value
                        setValue(`exercises[${exerciseIndex}].weight`, val)
                        onChange(val)
                      }}
                      inputRef={ref}
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
                        sx: { fontSize: isSmallScreen ? '.95rem' : '1rem' }
                      }}
                      sx={{
                        width: '30%'
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
                                name={`exercises[${exerciseIndex}].sets[${setIndex}].reps`}
                                control={control}
                                defaultValue={exercise.sets[setIndex].reps}
                                render={({ field: { onChange, value } }) => (
                                  <TextField
                                    id={`repsInput-${exerciseIndex}-${
                                      setIndex + 1
                                    }`}
                                    label="reps"
                                    name="reps"
                                    value={value}
                                    type="number"
                                    size="small"
                                    inputProps={{
                                      inputMode: 'numeric',
                                      pattern: '[0-9]*'
                                    }}
                                    onChange={(e) => {
                                      onChange(parseInt(e.target.value))
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
                  name={`exercises[${exerciseIndex}].rest`}
                  control={control}
                  defaultValue={exercise.rest}
                  render={({ field: { onChange, value } }) => (
                    <FormControl>
                      <InputLabel id="rest-label" sx={{ margin: '8px' }}>
                        Rest
                      </InputLabel>
                      <Select
                        id={`rest[${exerciseIndex}]`}
                        label="Rest"
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
        <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100 }}>
          <Footer>
            <Button type="submit">Save Changes</Button>
          </Footer>
        </Box>
      </form>
    </Box>
  )
}

export default ProgramDetails
