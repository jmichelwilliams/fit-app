import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'

interface LocalExercise {
  exerciseName: string
  sets: LocalSet[]
  rest: string
  weight?: number
}

interface LocalSet {
  setId: number
  reps: number
}

interface RepsSelectProps {
  index: number
  setExercises: (
    callback: (prevState: LocalExercise[]) => LocalExercise[]
  ) => void
  exercises: LocalExercise[]
}

const RepsSelect: React.FC<RepsSelectProps> = ({
  index,
  setExercises,
  exercises
}) => {
  const handleSelectChange = (
    event: SelectChangeEvent<number | string>,
    index: number
  ): void => {
    const { value } = event.target
    const numberOfReps = typeof value === 'number' ? value : parseInt(value, 10)
    const updatedExercises = [...exercises]

    updatedExercises[index] = {
      ...updatedExercises[index],
      sets: updatedExercises[index].sets.map((set) => ({
        ...set,
        reps: numberOfReps
      }))
    }

    setExercises(() => updatedExercises)
  }

  return (
    <FormControl>
      <InputLabel id={`reps-label-${index}`} sx={{ margin: '8px' }}>
        Reps
      </InputLabel>
      <Select
        labelId={`reps-label-${index}`}
        id={`reps-${index}`}
        label="Sets"
        onChange={(e: SelectChangeEvent<number>) => {
          handleSelectChange(e, index)
        }}
        defaultValue={1}
        sx={{ margin: '8px', width: '80px' }}
      >
        {Array.from({ length: 15 }, (_, i) => i + 1).map((rep) => (
          <MenuItem key={rep} value={rep}>
            {rep}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default RepsSelect
