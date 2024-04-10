interface Program {
  _id: string
  programName: string
  exercises: [
    {
      exerciseName: string
      sets: number
      reps: number
      rest: string
      weight?: number
    }
  ]
  createdBy: string
}

export default Program
