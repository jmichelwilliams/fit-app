import React from 'react'
import { TextField } from '@mui/material'
import Exercise from '../types/Exercise'

interface TextInputProps {
  index: number
  label: string
  id: string
  name: string
  setExercises: (callback: (prevState: Exercise[]) => Exercise[]) => void
  exercises: Exercise[]
  type: string
}
const ProgramInput: React.FC<TextInputProps> = ({
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
      id={`${id}-${index}`}
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
