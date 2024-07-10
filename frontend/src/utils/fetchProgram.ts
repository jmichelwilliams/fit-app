import BACKEND_URL from '../constants'
import type { Program } from 'types/Program'

export const fetchProgram = async (
  programId: string,
  accessToken: string
): Promise<Program> => {
  const res = await fetch(`${BACKEND_URL}/programs/${programId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch user programs`)
  }

  const data = await res.json()
  return data.data
}
