import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent
} from '@mui/material'
import Exercise from '../types/Exercise'

interface RestSelectProps {
  index: number
  setExercises: (callback: (prevState: Exercise[]) => Exercise[]) => void
  exercises: Exercise[]
}
const RestTimeSelect: React.FC<RestSelectProps> = ({
  index,
  setExercises,
  exercises
}) => {
  const handleSelectChange = (
    event: SelectChangeEvent<number | string>,
    index: number,
    property: keyof Exercise
  ): void => {
    const { value } = event.target
    const updatedExercises = [...exercises]

    updatedExercises[index] = {
      ...updatedExercises[index],
      [property]: value
    }

    setExercises(() => updatedExercises)
  }

  return (
    <FormControl>
      <InputLabel id="rest-label" sx={{ margin: '8px' }}>
        Rest
      </InputLabel>
      <Select
        labelId="rest-label"
        id={`rest-${index}`}
        label="Rest"
        onChange={(e: SelectChangeEvent<string>) => {
          handleSelectChange(e, index, 'rest')
        }}
        defaultValue={'0:30'}
        sx={{ margin: '8px', width: '80px' }}
      >
        <MenuItem value={'0:30'}>0:30</MenuItem>
        <MenuItem value={'1:00'}>1:00</MenuItem>
        <MenuItem value={'1:30'}>1:30</MenuItem>
        <MenuItem value={'2:00'}>2:00</MenuItem>
      </Select>
    </FormControl>
  )
}

export default RestTimeSelect
