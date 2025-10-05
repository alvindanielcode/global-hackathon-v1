import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage.tsx'
import ExploreStartupsNew from './pages/ExploreStartupsNew.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExploreStartupsNew />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
