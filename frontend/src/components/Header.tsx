import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './auth/LoginButton'
import LogoutButton from './auth/LogoutButton'
import Profile from './auth/Profile'

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth0()
  return (
    <div>
      {!isAuthenticated && (
        <LoginButton buttonText="Login / Register" isSmall={false} />
      )}
      <Profile />
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  )
}

export default Header
