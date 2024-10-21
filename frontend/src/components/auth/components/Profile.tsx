import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Drawer } from '../../common'

interface ProfileProps {
  demoMode?: boolean
}
export const Profile: React.FC<ProfileProps> = ({ demoMode = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (demoMode) {
    return <Drawer demoMode />
  }
  if (!isAuthenticated || user == null) {
    return undefined
  }

  if (isAuthenticated) {
    return <Drawer />
  }
}
