import type { Exercise } from './Exercise'

export interface Program {
  _id: string
  programName: string
  exercises: Exercise[]
  createdBy: string
}
