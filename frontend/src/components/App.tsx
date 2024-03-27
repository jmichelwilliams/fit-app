import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Homepage from './Homepage'
import Planner from './Planner'
import Training from './Training'
import Workouts from './Workouts'
import GlobalStyle from '../styles/GlobalStyles'
const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/user/:userId/training" element={<Training />} />
        <Route path="/user/:userId/workouts" element={<Workouts />} />
      </Routes>
    </Router>
  )
}

export default App
