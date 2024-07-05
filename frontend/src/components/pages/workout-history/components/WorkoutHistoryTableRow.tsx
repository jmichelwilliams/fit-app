import React from 'react'
import {
  TableRow,
  IconButton,
  TableCell,
  Collapse,
  Box,
  TableHead,
  TableBody,
  Table
} from '@mui/material'
import type Workout from '../../../../types/Workout'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { FaCheck } from 'react-icons/fa'

interface WorkoutHistoryTableRowProps {
  workout: Workout
  open: Record<string, boolean>
  handleToggle: (id: string) => void
}
export const WorkoutHistoryTableRow: React.FC<WorkoutHistoryTableRowProps> = ({
  workout,
  open,
  handleToggle
}) => {
  return (
    <React.Fragment key={workout._id}>
      <TableRow>
        <TableCell style={{ width: '10%' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              handleToggle(workout._id)
            }}
          >
            {open[workout._id] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{workout.programName}</TableCell>
        <TableCell>{workout.createdOn}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 0
          }}
          colSpan={6}
        >
          <Collapse in={open[workout._id]} timeout="auto" unmountOnExit>
            <Box>
              <Table
                size="small"
                aria-label="exercises"
                sx={{ tableLayout: 'auto', width: '100%' }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="tablehead-row"
                      style={{
                        paddingLeft: 21,
                        width: '30%'
                      }}
                    >
                      Exercise
                    </TableCell>
                    <TableCell
                      className="tablehead-row"
                      style={{
                        paddingRight: 8,
                        width: '15%'
                      }}
                    >
                      Weight
                    </TableCell>
                    <TableCell
                      className="tablehead-row"
                      style={{
                        paddingRight: 8,
                        width: '15%'
                      }}
                    >
                      Reps
                    </TableCell>
                    <TableCell
                      className="tablehead-row"
                      style={{
                        paddingRight: 8,
                        width: '10%'
                      }}
                    >
                      Sets
                    </TableCell>
                    <TableCell
                      className="tablehead-row"
                      style={{
                        paddingRight: 8,
                        width: '20%'
                      }}
                    >
                      Rest
                    </TableCell>
                    <TableCell
                      className="tablehead-row"
                      style={{
                        paddingRight: 0,
                        width: '10%'
                      }}
                    >
                      <FaCheck />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workout.exercises.map((exercise) => (
                    <TableRow key={exercise.exerciseName}>
                      <TableCell
                        style={{
                          textAlign: 'center'
                        }}
                      >
                        {exercise.exerciseName}
                      </TableCell>
                      <TableCell
                        style={{
                          paddingLeft: 21,
                          textAlign: 'center'
                        }}
                      >
                        {exercise.weight}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: 'center',
                          padding: '2px 0px 2px 0px'
                        }}
                      >
                        {exercise.sets.map((set) => (
                          <div
                            key={set.setId}
                          >{`Set ${set.setId}: ${set.reps}`}</div>
                        ))}
                      </TableCell>
                      <TableCell style={{ paddingLeft: 25 }}>
                        {exercise.sets.length}
                      </TableCell>
                      <TableCell>{exercise.rest}</TableCell>
                      <TableCell>{exercise.completed ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
