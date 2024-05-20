import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from './Header'
import Homepage from './Homepage'
import Planner from './Planner'
import AddProgram from './AddProgram'
import WorkoutList from './WorkoutList'
import GlobalStyle from '../styles/GlobalStyles'
import ProgramDetails from './ProgramDetails'
import WorkoutDetails from './WorkoutDetails'
import NotFound from './NotFound'
import ProtectedRoute from './auth/ProtectedRoute'
import NotMobile from './NotMobile'

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
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
