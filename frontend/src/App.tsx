import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={'Homepage'} />
          <Route path="/planner" element={'Planner'} />
          <Route path="/training" element={'Training'} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
