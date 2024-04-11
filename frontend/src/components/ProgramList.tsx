import React, { useEffect, useState } from 'react'
import type Program from '../types/Program'
import { Box } from '@mui/material'
import NavigationButton from './NavigationButton'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserPrograms } from '../utils/fetchUserPrograms'

const ProgramList: React.FC = () => {
  const [userPrograms, setUserPrograms] = useState<Program[]>([])
  const { user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const accessToken = await getAccessTokenSilently()

        const fetchedPrograms = await fetchUserPrograms(user?.sub, accessToken)
        setUserPrograms(fetchedPrograms)
      } catch (error) {
        console.error('Error fetching programs:', error)
      }
    }
    fetchData().catch((error) => {
      console.error('Error fetching programs:', error)
    })
  }, [user, getAccessTokenSilently])

  console.log('programs: ', userPrograms)
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {userPrograms.map((program) => {
        return (
          <Box key={program._id} sx={{ margin: '16px' }}>
            <NavigationButton
              destination={`/programs/${program._id}`}
              buttonText={program.programName}
              isBig
            />{' '}
          </Box>
        )
      })}
    </Box>
  )
}

export default ProgramList
