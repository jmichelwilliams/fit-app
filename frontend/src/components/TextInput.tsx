import React from 'react'
import { TextField } from '@mui/material'

interface LocalSet {
  setId: number
  reps: number
}

interface LocalExercise {
  exerciseName: string
  sets: LocalSet[]
  rest: string
  weight?: number
}

interface ProgramInputProps {
  index: number
  label: string
  id: string
  name: string
  setExercises: (
    callback: (prevState: LocalExercise[]) => LocalExercise[]
  ) => void
  exercises: LocalExercise[]
  type: string
}
const ProgramInput: React.FC<ProgramInputProps> = ({
  index,
  setExercises,
  exercises,
  label,
  id,
  name,
  type
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { name, value } = event.target
    const updatedExercises = [...exercises]
    updatedExercises[index] = {
      ...updatedExercises[index],
      [name]: name === 'exerciseName' ? value : parseInt(value, 10)
    }
    setExercises(() => updatedExercises)
  }
  return (
    <TextField
      id={id}
      label={label}
      name={name}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e, index)
      }}
      type={type}
      sx={{
        margin: '8px auto',
        width: '270px',
        maxWidth: '290px'
      }}
    />
  )
}

export default ProgramInput
