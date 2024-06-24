/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material'

interface Workout {
  _id: string
  createdOn: string
}
const WorkoutHistory: React.FC = () => {
  const [workoutHistory, setWorkoutHistory] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true)
        if (user !== null && user !== undefined) {
          const accessToken = await getAccessTokenSilently()
          const res = await fetch(`/workouts/${user.sub}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`
            }
          })
          const data = await res.json()
          setWorkoutHistory(data.data)
        }
      } catch (error) {
        console.error('Error fetching programs:', error)
      } finally {
        setIsLoading(false)
      }
    }
    void fetchData()
  }, [user, getAccessTokenSilently])

  console.log('workoutHistory: ', workoutHistory)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px'
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '100%'
          }}
        >
          <CircularProgress size={70} />
        </Box>
      ) : (
        <Box>
          <Box sx={{ margin: '16px 0px' }}>
            <Typography variant="h3" align={'center'}>
              Workout History
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Program</TableCell>
                  <TableCell>Date Completed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  )
}

export default WorkoutHistory
