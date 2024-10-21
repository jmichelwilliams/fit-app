import React, {
  createContext,
  useContext,
  useState,
  type ReactNode
} from 'react'
import type { Program } from 'types/Program'
import type { Workout } from 'types/Workout'
import { demoPrograms } from 'demo/data/demo-programs'
import { demoWorkouts } from 'demo/data/demo-workouts'

interface DemoDataContextType {
  programs: Program[]
  workouts: Program[] | Workout[]
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(
  undefined
)

export const useDemoData = (): DemoDataContextType => {
  const context = useContext(DemoDataContext)

  if (context == null) {
    throw new Error('useDemoData must be used within a DemoDataProvider')
  }

  return context
}

export const DemoDataProvider = ({
  children
}: {
  children: ReactNode
}): JSX.Element => {
  const [programs] = useState<Program[]>(demoPrograms)
  const [workouts] = useState<Workout[]>(demoWorkouts)
  return (
    <DemoDataContext.Provider value={{ programs, workouts }}>
      {children}
    </DemoDataContext.Provider>
  )
}
