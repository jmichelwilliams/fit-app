import React, { useState, useEffect, useCallback } from 'react'
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
  TableSortLabel,
  styled
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { WorkoutHistoryTableRow } from './components'
import BACKEND_URL from '../../../constants'
import type {} from '@mui/lab/themeAugmentation'
type Order = 'asc' | 'desc'

const StyledWorkoutHistoryWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
`

export const WorkoutHistory: React.FC = () => {
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof Workout>('createdOn')
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const { user, getAccessTokenSilently } = useAuth0()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const fetchWorkouts = useCallback(async () => {
    if (user === undefined || user === null || !hasMore) return
    try {
      setIsLoading(true)
      const accessToken = await getAccessTokenSilently()
      const res = await fetch(
        `${BACKEND_URL}/workouts/${user.sub}?page=${page}&limit=8`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      const data = await res.json()

      const parsedData = data.data.map((workout: Workout) => ({
        ...workout,
        createdOn: new Date(workout.createdOn).toLocaleString('en-US', {
          timeZone: timezone
        })
      }))

      setWorkoutHistory((prev) => [...prev, ...parsedData])
      setHasMore(data.hasMore)
    } catch (error) {
      console.error('Error fetching workouts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user, getAccessTokenSilently, page, hasMore, timezone])

  useEffect(() => {
    void fetchWorkouts()
  }, [fetchWorkouts])

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
    <StyledWorkoutHistoryWrapper>
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
                      '&.Mui-hover': {
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

        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <LoadingButton
            variant="contained"
            loading={isLoading || !hasMore}
            onClick={() => {
              setPage((prevPage) => prevPage + 1)
            }}
            sx={{
              width: '128px',
              backgroundColor: 'var(--button-color)'
            }}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </LoadingButton>
        </Box>
      </Box>
    </StyledWorkoutHistoryWrapper>
  )
}
