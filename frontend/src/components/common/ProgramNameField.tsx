import React from 'react'
import { Controller, type Control } from 'react-hook-form'
import { Box, TextField, styled } from '@mui/material'
import { type ProgramFormInputs } from 'types/ProgramFormInputs'

interface ProgramNameFieldProps {
  control: Control<ProgramFormInputs>
}

const StyledWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  height: 90px;
`

const StyledTextField = styled(TextField)`
  width: 95vw;
  margin: 8px;
`
export const ProgramNameField: React.FC<ProgramNameFieldProps> = ({
  control
}) => {
  return (
    <StyledWrapper>
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
          <StyledTextField
            label="Name of Program"
            id="program-name"
            value={value}
            onBlur={onBlur}
            inputRef={ref}
            onChange={onChange}
            required
            error={!(error == null)}
            helperText={error != null ? error.message : null}
          />
        )}
      />
    </StyledWrapper>
  )
}
