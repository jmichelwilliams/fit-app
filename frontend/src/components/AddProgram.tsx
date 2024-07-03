import React from 'react'
import {
  useForm,
  Controller,
  useFieldArray,
  type SubmitHandler
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment
} from '@mui/material'

interface ProgramFormInputs {
  programName: string
  exercises: Array<{
    exerciseName: string
    sets: number
    reps: number
    rest: string
    weight: string | number
  }>
}

const AddProgram: React.FC = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
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
        const res = await fetch(`/programs/${user.sub}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ program: data })
        })

        if (res.ok) {
          console.log('Program saved successfully')
          navigate('/planner')
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '16px auto'
      }}
    >
      <Box>
        <Typography variant="h3" textAlign="center">
          Enter your program
        </Typography>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '16px auto'
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
                name="programName"
                control={control}
                rules={{
                  required: 'A name is required',
                  minLength: { value: 3, message: 'Minimum length is 3' }
                }}
                render={({
                  field: { onChange, value, ref, onBlur },
                  fieldState: { error }
                }) => (
                  <TextField
                    label="Name of Program"
                    id="program-name"
                    value={value}
                    onBlur={onBlur}
                    inputRef={ref}
                    onChange={(e) => {
                      const val = e.target.value
                      onChange(val)
                    }}
                    required
                    sx={{
                      width: '95vw',
                      margin: '8px'
                    }}
                    error={!(error == null)}
                    helperText={error != null ? error.message : null}
                  />
                )}
              />
            </Box>
            {fields.map((exercise, exerciseIndex) => (
              <Box key={exercise.id}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{
                    border: '2px solid var(--font-color)',
                    borderRadius: '8px',
                    padding: '8px',
                    width: '90vw',
                    margin: '8px 8px',
                    alignItems: 'center'
                  }}
                >
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                      Exercise {exerciseIndex + 1}
                    </Typography>
                  </Box>
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
                          id={`exercises[${exerciseIndex}]`}
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
                      justifyContent: 'center',
                      height: '80px'
                    }}
                  >
                    <Box sx={{ width: '290px' }}>
                      <Controller
                        name={`exercises.${exerciseIndex}.sets`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <FormControl>
                            <InputLabel
                              id={`sets-label-${exerciseIndex}`}
                              sx={{ margin: '8px' }}
                            >
                              Sets
                            </InputLabel>
                            <Select
                              id={`exercises.${exerciseIndex}.sets`}
                              labelId={`sets-label-${exerciseIndex}`}
                              label="Sets"
                              value={value}
                              sx={{ margin: '8px', width: '80px' }}
                              onChange={(e) => {
                                const setsCount = e.target.value as number
                                onChange(setsCount)
                              }}
                            >
                              {Array.from({ length: 5 }, (_, i) => i + 1).map(
                                (set) => (
                                  <MenuItem
                                    key={set}
                                    value={set}
                                    sx={{ color: 'black' }}
                                  >
                                    {set}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        )}
                      />
                      <Controller
                        name={`exercises.${exerciseIndex}.reps`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <FormControl>
                            <InputLabel
                              id={`reps-label-${exerciseIndex}`}
                              sx={{ margin: '8px' }}
                            >
                              Reps
                            </InputLabel>
                            <Select
                              id={`exercises.${exerciseIndex}.reps`}
                              labelId={`reps-label-${exerciseIndex}`}
                              label="Reps"
                              value={value}
                              sx={{ margin: '8px', width: '80px' }}
                              onChange={(e) => {
                                const repsCount = e.target.value as number
                                onChange(repsCount)
                              }}
                            >
                              {Array.from({ length: 15 }, (_, i) => i + 1).map(
                                (rep) => (
                                  <MenuItem
                                    key={rep}
                                    value={rep}
                                    sx={{ color: 'black' }}
                                  >
                                    {rep}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        )}
                      />
                      <Controller
                        name={`exercises.${exerciseIndex}.rest`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <FormControl>
                            <InputLabel
                              id={`rest-label-${exerciseIndex}`}
                              sx={{ margin: '8px' }}
                            >
                              Rest
                            </InputLabel>
                            <Select
                              id={`exercises.${exerciseIndex}.rest`}
                              labelId={`rest-label-${exerciseIndex}`}
                              label="Rest"
                              value={value}
                              sx={{
                                margin: '8px',
                                width: '80px'
                              }}
                              onChange={(e) => {
                                const restTime = e.target.value
                                onChange(restTime)
                              }}
                            >
                              <MenuItem value={'0:30'} sx={{ color: 'black' }}>
                                0:30
                              </MenuItem>
                              <MenuItem value={'1:00'} sx={{ color: 'black' }}>
                                1:00
                              </MenuItem>
                              <MenuItem value={'1:30'} sx={{ color: 'black' }}>
                                1:30
                              </MenuItem>
                              <MenuItem value={'2:00'} sx={{ color: 'black' }}>
                                2:00
                              </MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      height: '90px'
                    }}
                  >
                    <Controller
                      name={`exercises.${exerciseIndex}.weight`}
                      control={control}
                      rules={{
                        required: 'Weight is required',
                        min: { value: 1, message: 'Minimum value is 1' }
                      }}
                      render={({
                        field: { onChange, value, ref, onBlur },
                        fieldState: { error }
                      }) => (
                        <TextField
                          id={`exercises.${exerciseIndex}.weight`}
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
                          sx={{
                            width: '120px',
                            height: '65px',
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
                      justifyContent: 'flex-end',
                      width: '100%'
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="warning"
                      disabled={fields.length <= 1}
                      onClick={() => {
                        handleRemoveExercise(exerciseIndex)
                      }}
                      sx={{ margin: '8px' }}
                    >
                      Remove Exercise
                    </Button>
                  </Box>
                </Box>
              </Box>
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
                {' '}
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
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AddProgram
