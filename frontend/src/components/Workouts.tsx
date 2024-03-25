import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavigationButton from './NavigationButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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

const Workouts: React.FC = () => {
  const { userId } = useParams()
  const [programs, setPrograms] = useState<Program[]>([])

  useEffect(() => {
    const fetchUserId = async (): Promise<void> => {
      try {
        const res = await fetch(`/user/${userId}/programs`)

        if (!res.ok) {
          throw new Error('Failed to fetch user')
        }
        const data = await res.json()
        console.log(data)
        setPrograms(data.data)
      } catch (error) {
        console.log('error: ', error)
      }
    }
    fetchUserId().catch((error) => {
      console.error('Error fetching programs:', error)
    })
  }, [userId])

  console.log('programs: ', programs)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '8px',
        alignItems: 'center'
      }}
    >
      <Typography variant="h3" textAlign="center">
        Workouts
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {programs.map((program) => {
          return (
            <Box key={program._id} sx={{ margin: '16px' }}>
              <NavigationButton
                destination={`/user/${program.createdBy}/training`}
                buttonText={program.programName}
                isBig
              />{' '}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Workouts
