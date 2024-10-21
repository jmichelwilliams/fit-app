/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { type Workout } from 'types/Workout'
import { type Program } from 'types/Program'
import { useDemoData } from 'context/DemoDataContext'
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
import { WorkoutHistoryTableRow } from '../../../components/common'
import type {} from '@mui/lab/themeAugmentation'

type Order = 'asc' | 'desc'

const StyledWorkoutHistoryWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
`

export const DemoWorkoutHistory: React.FC = () => {
  const { workouts } = useDemoData()
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>()
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof Workout>('createdOn')
  const [open, setOpen] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const filteredWorkouts = (workouts as Array<Program | Workout>)
      .filter((item): item is Workout => 'createdOn' in item)
      .map((workout) => ({
        ...workout,
        createdOn: new Date(workout.createdOn).toLocaleString('en-US', {
          timeZone: timezone
        })
      }))

    setWorkoutHistory(filteredWorkouts)
  }, [workouts])

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
      </Box>
    </StyledWorkoutHistoryWrapper>
  )
}
