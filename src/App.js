import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import './App.css'
import Home from './routes/Home/Home'
import CharacterSheet from './routes/CharacterSheet/CharacterSheet'
import useRosterManager from './hooks/useRosterManager'

const appTheme = createTheme()

function App() {
  const rosterKey ='HeroDrop-v0.0.1'
  const roster = useRosterManager(rosterKey)

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/character-sheet/*" element={<CharacterSheet roster={roster} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App