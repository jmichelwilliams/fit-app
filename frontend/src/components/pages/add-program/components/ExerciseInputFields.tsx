import React from 'react'
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
import { Controller } from 'react-hook-form'

interface ExerciseInputFieldsProps {
  exerciseIndex: number
  control: any
  handleRemoveExercise: (exerciseIndex: number) => void
  fields: any
}

export const ExerciseInputFields: React.FC<ExerciseInputFieldsProps> = ({
  exerciseIndex,
  handleRemoveExercise,
  control,
  fields
}) => {
  return (
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
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((set) => (
                    <MenuItem key={set} value={set} sx={{ color: 'black' }}>
                      {set}
                    </MenuItem>
                  ))}
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
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((rep) => (
                    <MenuItem key={rep} value={rep} sx={{ color: 'black' }}>
                      {rep}
                    </MenuItem>
                  ))}
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
                  <InputAdornment position="end">lbs</InputAdornment>
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
  )
}
