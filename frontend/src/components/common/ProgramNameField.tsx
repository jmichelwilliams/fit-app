import React from 'react'
import { Controller } from 'react-hook-form'
import { Box, TextField } from '@mui/material'

interface programNameFieldProps {
  control: any
}
export const ProgramNameField: React.FC<programNameFieldProps> = ({
  control
}) => {
  return (
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
  )
}
