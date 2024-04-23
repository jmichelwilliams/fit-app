import type Exercise from './Exercise'

interface Program {
  _id: string
  programName: string
  exercises: Exercise[]
  createdBy: string
}

export default Program
