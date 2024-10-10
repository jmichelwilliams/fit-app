import React from 'react'
import { formatRestTime } from '../../../../utils/formatRestTime'
import { Controller } from 'react-hook-form'
import {
  Box,
  Typography,
  Checkbox,
  TextField,
  useMediaQuery,
  FormControlLabel,
  InputAdornment,
  styled
} from '@mui/material'
import { SetRepsField } from 'components/common/SetRepsField'
import useTheme from '@mui/material/styles/useTheme'

interface WorkoutDetailsFormProps {
  exercise: {
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    weight: number
    rest: string
    completed?: boolean
  }
  exerciseIndex: number
  control: any
  completionOrder: number[]
  handleCompletionOrder: (exerciseIndex: number, isChecked: boolean) => void
}

const StyledWorkoutDetailsFormWrapper = styled(Box)`
  border: 2px solid black;
  width: 90vw;
  height: auto;
  margin: 16px;
  padding: 8px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInputsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const StyledWeightInputsContainer = styled(Box)`
  display: flex;
  justify-content: center;
  height: 60px;
`
const StyledSetsInputsContainer = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  height: auto;
`
export const WorkoutDetailsForm: React.FC<WorkoutDetailsFormProps> = ({
  exerciseIndex,
  exercise,
  control,
  completionOrder,
  handleCompletionOrder
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <StyledWorkoutDetailsFormWrapper>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{ marginBottom: '16px' }}
      >
        {exercise.exerciseName}
      </Typography>
      <StyledInputsContainer>
        <StyledWeightInputsContainer>
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
        </StyledWeightInputsContainer>
        <StyledSetsInputsContainer>
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
        </StyledSetsInputsContainer>
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
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  id={`completed-checkbox-${exerciseIndex}`}
                  onChange={(e) => {
                    const isChecked = e.target.checked
                    handleCompletionOrder(exerciseIndex, e.target.checked)
                    onChange(isChecked)
                  }}
                  checked={completionOrder.includes(exerciseIndex)}
                  style={{
                    color: value != null ? 'green' : 'initial'
                  }}
                />
              }
              label="Completed?"
            />
          )}
        />
      </StyledInputsContainer>
    </StyledWorkoutDetailsFormWrapper>
  )
}
