import React from 'react'
import {
  useTheme,
  useMediaQuery,
  Typography,
  Box,
  Grid,
  TextField,
  styled
} from '@mui/material'
import { Controller } from 'react-hook-form'

interface SetRepsFieldProps {
  setIndex: number
  exerciseIndex: number
  control: any
  exercise: {
    exerciseName: string
    sets: Array<{ setId: number; reps: number }>
    weight: number
    rest: string
    completed: boolean
  }
}

const StyledRepsWrapper = styled(Box)`
  display: flex;
  margin: 8px;
  flex-direction: column;
  max-width: 80px;
  align-items: space-evenly;
`

const StyledTextField = styled(TextField)`
  width: 70px;
  margin-bottom: 8px;

  .muiformhelpertext-root {
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 4px 0px;
  }
`
export const SetRepsField: React.FC<SetRepsFieldProps> = ({
  exercise,
  exerciseIndex,
  control,
  setIndex
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <StyledRepsWrapper>
      <Typography
        variant="body1"
        textAlign="center"
        sx={{ color: 'white !important' }}
      >
        Set: {setIndex + 1}
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ paddingLeft: '2px' }}
      >
        <Grid
          item
          xs={12}
          sx={{
            marginTop: '8px',
            height: '80px'
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
              <StyledTextField
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
                  onChange(isNaN(val) || val <= 0 ? '' : val)
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
                error={!(error == null)}
                helperText={error != null ? error.message : null}
              />
            )}
          />
        </Grid>
      </Grid>
    </StyledRepsWrapper>
  )
}
