import React, { useEffect, useState } from 'react'
import type Program from '../types/Program'
import { Box } from '@mui/material'
import NavigationButton from './NavigationButton'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserPrograms } from '../utils/fetchUserPrograms'
import CircularProgress from '@mui/material/CircularProgress'

const ProgramList: React.FC = () => {
  const [userPrograms, setUserPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const { user, getAccessTokenSilently } = useAuth0()
  const workoutMode = location.pathname === '/workouts'

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const accessToken = await getAccessTokenSilently()
        const fetchedPrograms = await fetchUserPrograms(user?.sub, accessToken)
        setUserPrograms(fetchedPrograms)
      } catch (error) {
        console.error('Error fetching programs:', error)
      } finally {
        setLoading(false)
      }
    }
    void fetchData()
  }, [user, getAccessTokenSilently])

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '100%'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        userPrograms.map((program) => (
          <Box key={program._id} sx={{ margin: '16px' }}>
            {workoutMode ? (
              <NavigationButton
                destination={`/workouts/${program._id}`}
                buttonText={program.programName}
                isBig
              />
            ) : (
              <NavigationButton
                destination={`/programs/${program._id}`}
                buttonText={program.programName}
                isBig
              />
            )}
          </Box>
        ))
      )}
    </Box>
  )
}

export default ProgramList
