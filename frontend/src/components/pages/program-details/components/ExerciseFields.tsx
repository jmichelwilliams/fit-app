import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { SetRepsField } from '../../../common/SetRepsField'

interface ExerciseFieldProps {
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

export const ExerciseFields: React.FC<ExerciseFieldProps> = ({
  exercise,
  exerciseIndex,
  control
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
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
                    <InputAdornment position="end">lbs</InputAdornment>
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
            flexWrap: 'wrap',
            height: 'auto'
          }}
        >
          {Array.from({ length: exercise.sets.length }, (_, setIndex) => {
            return (
              <SetRepsField
                key={`set-${exerciseIndex}-${setIndex + 1}`}
                control={control}
                exercise={exercise}
                exerciseIndex={exerciseIndex}
                setIndex={setIndex}
              />
            )
          })}
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
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'black'
                    }
                  }
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
}
