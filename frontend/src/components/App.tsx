import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Homepage from './pages/Homepage'
import { AddProgram, ProgramDetails, Planner } from './program/components'
import {
  WorkoutList,
  WorkoutDetails,
  WorkoutHistory
} from './workout/components'
import GlobalStyle from '../styles/GlobalStyles'
import NotFound from './pages/NotFound'
import { ProtectedRoute } from './auth/components'
import NotMobile from './pages/NotMobile'
import { Header } from './common/components'

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
