import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { DemoLayout, ProtectedLayout } from './common/Layout'
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
import { SnackbarNotification } from './common/SnackbarNotification'
import { DemoDataProvider } from 'context/DemoDataContext'
import { DemoHomepage } from 'demo/pages/demo-homepage'
import { DemoPlanner } from 'demo/pages/demo-planner'
import { Header } from './common'
import { DemoAddProgram } from 'demo/pages/demo-add-program/DemoAddProgram'
import { DemoProgramDetails } from 'demo/pages/demo-program-details/DemoProgramDetails'
import { DemoWorkoutDetails } from 'demo/pages/demo-workout-details'
import { DemoWorkoutList } from 'demo/pages/demo-planner/components'
import { DemoWorkoutHistory } from 'demo/pages/demo-workout-history/DemoWorkoutHistory'

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

      <Routes>
        <Route element={<ProtectedLayout />}>
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
        </Route>
        <Route
          element={
            <DemoDataProvider>
              <DemoLayout />
            </DemoDataProvider>
          }
        >
          <Route path="/demo" element={<DemoHomepage />} />
          <Route path="/demo/planner" element={<DemoPlanner />} />
          <Route path="/demo/workouts" element={<DemoWorkoutList />} />
          <Route path="/demo/addprogram" element={<DemoAddProgram />} />
          <Route
            path="/demo/programs/:programId"
            element={<DemoProgramDetails />}
          />
          <Route
            path="/demo/workouts/:programId"
            element={<DemoWorkoutDetails />}
          />
          <Route
            path="/demo/workouts/history"
            element={<DemoWorkoutHistory />}
          />
        </Route>

        <Route
          path="/"
          element={
            <>
              <Header />
              <Homepage />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
