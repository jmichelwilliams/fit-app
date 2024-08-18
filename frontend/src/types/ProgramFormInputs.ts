export interface ProgramFormInputs {
  programName: string
  exercises: Array<{
    exerciseName: string
    sets: number
    reps: number
    rest: string
    weight: string | number
  }>
}
