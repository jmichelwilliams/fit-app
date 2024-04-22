import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import Exercise from '../types/Exercise'

interface SetsSelectProps {
  index: number
  setExercises: (callback: (prevState: Exercise[]) => Exercise[]) => void
  exercises: Exercise[]
}

const SetsSelect: React.FC<SetsSelectProps> = ({
  index,
  setExercises,
  exercises
}) => {
  const handleSelectChange = (
    event: SelectChangeEvent<number | string>,
    index: number
  ): void => {
    const { value } = event.target
    const updatedExercises = [...exercises]
    const numberOfSets = parseInt(value.toString(), 10)

    const newSets = Array.from({ length: numberOfSets }, (_, i) => ({
      setId: i + 1,
      reps:
        updatedExercises[index].sets.length > 0
          ? updatedExercises[index].sets[0].reps
          : 1
    }))

    updatedExercises[index] = {
      ...updatedExercises[index],
      sets: newSets
    }

    setExercises(() => updatedExercises)
  }
  return (
    <FormControl>
      <InputLabel id="sets-label" sx={{ margin: '8px' }}>
        Sets
      </InputLabel>
      <Select
        labelId="sets-label"
        id="sets"
        label="Sets"
        onChange={(e: SelectChangeEvent<number>) => {
          handleSelectChange(e, index)
        }}
        defaultValue={1}
        sx={{ margin: '8px', width: '80px' }}
      >
        {Array.from({ length: 5 }, (_, i) => i + 1).map((set) => (
          <MenuItem key={set} value={set}>
            {set}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SetsSelect
