import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useAuth0 } from '@auth0/auth0-react'
import type Program from '../types/Program'
import { fetchUserPrograms } from '../utils/fetchUserPrograms'
import NavigationButton from './NavigationButton'

const Workouts: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([])
  const { user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const accessToken = await getAccessTokenSilently()

        const fetchedPrograms = await fetchUserPrograms(user?.sub, accessToken)
        setPrograms(fetchedPrograms)
      } catch (error) {
        console.error('Error fetching programs:', error)
      }
    }
    fetchData().catch((error) => {
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
