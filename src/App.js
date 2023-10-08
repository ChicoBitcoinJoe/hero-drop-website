import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import './App.css'
import Home from './routes/Home'
import Roster from './routes/Roster'
import useRosterManager from './hooks/useRosterManager'

const appTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#456"
        }
      }
    }
  }
})

function App() {
  const rosterKey ='HeroDrop-v0.0.1'
  const roster = useRosterManager(rosterKey)

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/roster/*" element={<Roster roster={roster} />} />
          {/* <Route path="/roster/*" element={<List roster={roster} />} /> */}
      {/* <Route path="/wizard/*" element={<Wizard roster={roster} />} /> */}
      {/* <Route path="/print/*" element={<Print roster={roster} />} /> */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App