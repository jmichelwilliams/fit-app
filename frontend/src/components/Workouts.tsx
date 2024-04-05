import React, { useState, useEffect } from 'react'
import NavigationButton from './NavigationButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAuth0 } from '@auth0/auth0-react'

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
  const [programs, setPrograms] = useState<Program[]>([])
  const { user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (user === null || user === undefined) {
      return
    }

    const fetchUserId = async (): Promise<void> => {
      const accessToken = await getAccessTokenSilently()

      try {
        const res = await fetch(`/programs/${user.sub}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })

        if (!res.ok) {
          throw new Error('Failed to fetch user')
        }

        const data = await res.json()
        setPrograms(data.data)
      } catch (error) {
        console.log('error: ', error)
      }
    }

    fetchUserId().catch((error) => {
      console.error('Error fetching programs:', error)
    })
  }, [user, getAccessTokenSilently])

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
