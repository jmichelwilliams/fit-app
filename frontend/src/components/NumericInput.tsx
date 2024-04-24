// import React from 'react'

// interface NumericInputProps {
//     index:number;
//     label:string;
//     id:string;
//     name:string;

// }
// const NumericInput: React.FC = () => {
//   const handleChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ): void => {
//     const { name, value } = event.target
//     const updatedProgram = { ...program }

//     if (updatedProgram.exercises !== undefined) {
//       updatedProgram.exercises[index] = {
//         ...updatedProgram.exercises[index],
//         [name]: name === 'exerciseName' ? value : parseInt(value, 10)
//       }
//     }
//     setProgram(updatedProgram as Program)
//   }

//   return (
//     <TextField
//       id={`weightInput-${index}`}
//       label="weight (lbs)"
//       name="weight"
//       type="number"
//       size="small"
//       defaultValue={exercise.weight}
//       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//         handleChange(e, index)
//       }}
//       inputProps={{
//         inputMode: 'numeric',
//         pattern: '[0-9]*'
//       }}
//       InputLabelProps={{
//         sx: { fontSize: isSmallScreen ? '.95rem' : '1rem' } // Adjust font size based on screen size
//       }}
//       sx={{
//         width: '30%'
//       }}
//     />
//   )
// }

// export default NumericInput
