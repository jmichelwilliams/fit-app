interface Workout {
  _id: string
  createdOn: string
  programName: string
  exercises: Array<{
    weight: number
    sets: Array<{
      reps: number
      setId: number
    }>
    completed: boolean
    exerciseName: string
    rest: string
  }>
}

export default Workout
