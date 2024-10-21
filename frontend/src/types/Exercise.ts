import type { Set } from './Set'

export interface Exercise {
  exerciseName: string
  sets: Set[]
  rest: string
  weight: number
  completed?: boolean
}
