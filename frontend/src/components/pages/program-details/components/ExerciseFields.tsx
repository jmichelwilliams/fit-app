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
  InputAdornment,
  styled
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { SetRepsField } from '../../../common/SetRepsField'

interface ExerciseFieldProps {
  exercise: {
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    weight: number
    rest: string
    completed?: boolean
  }
  exerciseIndex: number
  control: any
}

const StyledExerciseFieldsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  padding: 8px;
  margin-bottom: 16px;
  height: auto;
  width: 90vw;
  border: 2px solid black;
`
const StyledExerciseNameContainer = styled(Box)`
  display: flex;
  justify-content: center;
  height: 90px;
`
const StyledExerciseNameTextField = styled(TextField)`
  width: 85vw;
  margin: 8px;
`

const StyledExerciseInputsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
const StyledWeightInputContainer = styled(Box)`
  display: flex;
  justify-content: center;
  height: 70px;
`
const StyledWeightInputTextField = styled(TextField)`
  width: 120px;
  margin-top: 8px;
`
const StyledSetsInputContainer = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  height: auto;
`
export const ExerciseFields: React.FC<ExerciseFieldProps> = ({
  exercise,
  exerciseIndex,
  control
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <StyledExerciseFieldsWrapper key={`exercise-${exerciseIndex}`}>
      <StyledExerciseNameContainer>
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
            <StyledExerciseNameTextField
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
              error={!(error == null)}
              helperText={error != null ? error.message : null}
            />
          )}
        />
      </StyledExerciseNameContainer>
      <StyledExerciseInputsContainer>
        <StyledWeightInputContainer>
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
              <StyledWeightInputTextField
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
                error={!(error == null)}
                helperText={error != null ? error.message : null}
              />
            )}
          />
        </StyledWeightInputContainer>
        <StyledSetsInputContainer>
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
        </StyledSetsInputContainer>
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
      </StyledExerciseInputsContainer>
    </StyledExerciseFieldsWrapper>
  )
}
