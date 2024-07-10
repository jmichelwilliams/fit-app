import React, { useState, useEffect } from 'react'
import { type Workout } from 'types/Workout'
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
  CircularProgress,
  TableSortLabel
} from '@mui/material'
import { WorkoutHistoryTableRow } from './components'
type Order = 'asc' | 'desc'

export const WorkoutHistory: React.FC = () => {
  const [workoutHistory, setWorkoutHistory] = useState<Workout[] | null>([])
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof Workout>('createdOn')
  const [open, setOpen] = useState<Record<string, boolean>>({})
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

  const handleRequestSort = (property: keyof Workout): void => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedWorkouts =
    workoutHistory != null
      ? workoutHistory.slice().sort((a, b) => {
          if (orderBy === 'createdOn') {
            const dateA = new Date(a[orderBy]).getTime()
            const dateB = new Date(b[orderBy]).getTime()
            return order === 'asc' ? dateA - dateB : dateB - dateA
          } else {
            return order === 'asc'
              ? a[orderBy] < b[orderBy]
                ? -1
                : 1
              : a[orderBy] > b[orderBy]
                ? -1
                : 1
          }
        })
      : []

  const handleToggle = (id: string): void => {
    setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }))
  }

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
            <Table
              sx={{
                maxWidth: '90dvw',
                minWidth: '90dvw'
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'programName'}
                      direction={orderBy === 'programName' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('programName')
                      }}
                      sx={{
                        '&.Mui-active': {
                          color: 'rgb(252,163,17)'
                        }
                      }}
                    >
                      Program
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'createdOn'}
                      direction={orderBy === 'createdOn' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('createdOn')
                      }}
                      sx={{
                        '&.Mui-active': {
                          color: 'rgb(252,163,17)'
                        }
                      }}
                    >
                      Date Completed
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedWorkouts.map((workout) => (
                  <WorkoutHistoryTableRow
                    workout={workout}
                    key={workout._id}
                    open={open}
                    handleToggle={handleToggle}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  )
}
