import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// interface userData {
//   id: string
//   userName: string
//   email: string
// }
const Workouts: React.FC = () => {
  const { userId } = useParams()
  const [user, setUser] = useState([])
  console.log('userId: ', userId)

  useEffect(() => {
    const fetchUserId = async (): Promise<void> => {
      try {
        const res = await fetch(`/user/${userId}`)

        if (!res.ok) {
          throw new Error('Faield to fetch user')
        }
        const data = await res.json()
        console.log('data: ', data)
        setUser(data.data)
      } catch (error) {
        console.log('error: ', error)
      }
    }
    fetchUserId().catch((error) => {
      console.error('Error fetching user:', error)
    })
    return undefined
  }, [userId])

  console.log('user: ', user)

  return <div>Workout</div>
}

export default Workouts
