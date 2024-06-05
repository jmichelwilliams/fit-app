import React from 'react'
import {
  useForm,
  Controller,
  useFieldArray,
  type SubmitHandler
} from 'react-hook-form'
import { useAuth0 } from '@auth0/auth0-react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'

interface ProgramFormInputs {
  programName: string
  exercises: Array<{
    exerciseName: string
    sets: number
    reps: number
    rest: string
    weight: number
  }>
}

const AddProgram: React.FC = () => {
  const { user, getAccessTokenSilently } = useAuth0()
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
          weight: 0
        }
      ]
    }
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'exercises'
  })

  const handleAddExercise = (): void => {
    append({
      exerciseName: '',
      sets: 1,
      reps: 1,
      rest: '0:30',
      weight: 0
    })
  }

  const onSubmit: SubmitHandler<ProgramFormInputs> = async (data) => {
    console.log('Form data: ', data)
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                  <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                    Exercise {exerciseIndex + 1}
                  </Typography>
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
                                <MenuItem key={set} value={set}>
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
                                <MenuItem key={rep} value={rep}>
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
                            sx={{ margin: '8px', width: '80px' }}
                            onChange={(e) => {
                              const restTime = e.target.value
                              onChange(restTime)
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
                  <Controller
                    name={`exercises.${exerciseIndex}.weight`}
                    control={control}
                    defaultValue={exercise.weight}
                    rules={{
                      required: 'Weight is required',
                      min: { value: 1, message: 'Minimum value is 1' }
                    }}
                    render={({
                      field: { onChange, value, ref },
                      fieldState: { error }
                    }) => (
                      <TextField
                        id={`exercises.${exerciseIndex}.weight`}
                        label="weight (lbs)"
                        name={`exercises.${exerciseIndex}.weight`}
                        type="number"
                        size="small"
                        value={isNaN(value) ? '' : value}
                        onChange={(e) => {
                          const val = parseInt(e.target.value)
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
                Add Exercise
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: 'var(--button-color)' }}
              >
                Save Program
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AddProgram
