import React from 'react'
import { formatRestTime } from '../../../utils/formatRestTime'
import { Controller } from 'react-hook-form'
import {
  Box,
  Typography,
  Checkbox,
  TextField,
  Grid,
  useMediaQuery,
  FormControlLabel,
  InputAdornment
} from '@mui/material'
import useTheme from '@mui/material/styles/useTheme'

interface WorkoutDetailsFormProps {
  exercise: {
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    weight: number
    rest: string
    completed: boolean
  }
  exerciseIndex: number
  control: any
}

export const WorkoutDetailsForm: React.FC<WorkoutDetailsFormProps> = ({
  exerciseIndex,
  exercise,
  control
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        border: '2px solid black',
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
      {/* Weight */}
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
            height: '60px'
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
                inputProps={{
                  inputMode: 'decimal',
                  pattern: '[0-9]*'
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">lbs</InputAdornment>
                  )
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: isSmallScreen ? '.95rem' : '1rem'
                  }
                }}
                sx={{
                  width: '120px'
                }}
                error={!(error == null)}
                helperText={error != null ? error.message : null}
              />
            )}
          />
        </Box>
        {/* Sets */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap'
          }}
        >
          {Array.from({ length: exercise.sets.length }, (_, setIndex) => {
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
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '60px'
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
                            id={`repsInput-${exerciseIndex}-${setIndex + 1}`}
                            label="reps"
                            name="reps"
                            type="number"
                            size="small"
                            value={isNaN(value) ? '' : value}
                            inputRef={ref}
                            onBlur={onBlur}
                            onChange={(e) => {
                              const val = parseInt(e.target.value)

                              if (!isNaN(val) && val !== 0) {
                                onChange(val)
                              } else {
                                onChange('')
                              }
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
                                fontSize: isSmallScreen ? '.95rem' : '1rem',
                                textAlign: 'center'
                              }
                            }}
                            sx={{
                              width: '70px',
                              marginBottom: '8px'
                            }}
                            error={!(error == null)}
                            helperText={error != null ? error.message : null}
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )
          })}
        </Box>
        {/* Rest */}
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ marginTop: '8px' }}
        >
          Rest: {formatRestTime(exercise.rest)}
        </Typography>
        {/* Completed */}
        <Controller
          name={`exercises.${exerciseIndex}.completed`}
          control={control}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  id={`completed-checkbox-${exerciseIndex}`}
                  checked={value}
                  onChange={() => {
                    if (value == null) {
                      onChange(true)
                    } else {
                      onChange(false)
                    }
                  }}
                  style={{
                    color: value != null ? 'green' : 'initial'
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
}
