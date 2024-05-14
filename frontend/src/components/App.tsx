import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Homepage from './Homepage'
import Planner from './Planner'
import AddProgram from './AddProgram'
import WorkoutList from './WorkoutList'
import GlobalStyle from '../styles/GlobalStyles'
import ProgramDetails from './ProgramDetails'
import WorkoutDetails from './WorkoutDetails'
import NotFound from './NotFound'

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/planner/addprogram" element={<AddProgram />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/programs/:programId" element={<ProgramDetails />} />
        <Route path="/workouts/:programId" element={<WorkoutDetails />} />
        <Route path="/workouts" element={<WorkoutList />} />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
