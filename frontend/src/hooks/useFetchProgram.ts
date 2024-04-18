import { useEffect } from 'react'
import type Program from '../types/Program'

const useFetchProgram = (
  programId: string | null | undefined,
  getAccessTokenSilently: () => Promise<string>,
  fetchProgram: (programId: string, accessToken: string) => Promise<Program>,
  setProgram: (program: Program) => void
): void => {
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (programId != null && programId.length > 0) {
          const accessToken = await getAccessTokenSilently()
          const fetchedProgram = await fetchProgram(programId, accessToken)
          setProgram(fetchedProgram)
        }
      } catch (error) {
        console.error('Error fetching program:', error)
      }
    }

    fetchData().catch((error) => {
      console.error('Error fetching programs:', error)
    })
  }, [programId, getAccessTokenSilently])
}
export default useFetchProgram
