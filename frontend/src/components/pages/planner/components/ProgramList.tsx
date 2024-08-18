import React, { useEffect, useState } from 'react'
import type { Program } from 'types/Program'
import { Box, styled, CircularProgress } from '@mui/material'
import { NavigationButton } from '../../../common'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserPrograms } from '../../../../utils/fetchUserPrograms'

const StyledProgramListWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const StyledLoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
const StyledProgramContainer = styled(Box)`
  margin: 16px;
`
export const ProgramList: React.FC = () => {
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
    <StyledProgramListWrapper>
      {loading ? (
        <StyledLoadingContainer>
          <CircularProgress size={70} />
        </StyledLoadingContainer>
      ) : (
        userPrograms.map((program) => (
          <StyledProgramContainer key={program._id} sx={{ margin: '16px' }}>
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
          </StyledProgramContainer>
        ))
      )}
    </StyledProgramListWrapper>
  )
}
