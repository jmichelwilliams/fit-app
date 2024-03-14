import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Homepage'
import Planner from './Planner'
import Training from './Training'
import GlobalStyle from '../styles/GlobalStyles'

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </Router>
  )
}

export default App
