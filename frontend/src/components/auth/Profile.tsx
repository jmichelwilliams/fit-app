import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import SwipeableTemporaryDrawer from './SwipeableDrawer'

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!isAuthenticated || user == null) {
    return undefined
  }

  return (
    isAuthenticated && (
      <>
        <SwipeableTemporaryDrawer />
      </>
    )
  )
}

export default Profile
