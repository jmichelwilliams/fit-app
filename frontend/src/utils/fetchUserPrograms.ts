import type Program from '../types/Program'

export const fetchUserPrograms = async (
  userId: string | undefined,
  accessToken: string
): Promise<Program[]> => {
  const res = await fetch(`/programs/user/${userId}`, {
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
