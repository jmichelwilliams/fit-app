import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Homepage } from './pages/homepage'
import { ProgramDetails } from './pages/program-details/ProgramDetails'
import { WorkoutDetails } from './pages/workout-details'
import { WorkoutHistory } from './pages/workout-history'
import { AddProgram } from './pages/add-program/AddProgram'
import { Planner } from './pages/planner'
import { WorkoutList } from './pages/planner/components'
import GlobalStyle from '../styles/GlobalStyles'
import { NotFound } from './pages/not-found'
import { ProtectedRoute } from './auth/components'
import { NotMobile } from './pages/not-mobile'
import { Header } from './common'
import { SnackbarNotification } from './common/SnackbarNotification'

const App: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:768px)')

  if (!isMobile) {
    return (
      <>
        <GlobalStyle />
        <NotMobile />
      </>
    )
  }

  return (
    <Router>
      <GlobalStyle />
      <SnackbarNotification />
      <Header />
      <Routes>
        <Route
          path="/planner/addprogram"
          element={<ProtectedRoute element={<AddProgram />} />}
        />
        <Route
          path="/planner"
          element={<ProtectedRoute element={<Planner />} />}
        />
        <Route
          path="/programs/:programId"
          element={<ProtectedRoute element={<ProgramDetails />} />}
        />
        <Route
          path="/workouts/:programId"
          element={<ProtectedRoute element={<WorkoutDetails />} />}
        />
        <Route
          path="/workouts"
          element={<ProtectedRoute element={<WorkoutList />} />}
        />
        <Route
          path="/workouts/history"
          element={<ProtectedRoute element={<WorkoutHistory />} />}
        />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
