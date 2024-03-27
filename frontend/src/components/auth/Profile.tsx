import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'
import { Box } from '@mui/material'
const StyledImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 16px;
  margin-right: 8px;
`

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!isAuthenticated || user == null) {
    return undefined
  }

  console.log('user: ', user)
  return (
    isAuthenticated && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}
      >
        <StyledImg src={user.picture} alt={user.name} />
        <p>{user.nickname}</p>
      </Box>
    )
  )
}

export default Profile
