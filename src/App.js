import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import './App.css'
import Home from './routes/Home'
import Roster from './routes/Roster'
import Wizard from './routes/Wizard/Wizard.js'
import Print from './routes/Print/Print.js'
import useCharacterManager from './hooks/useCharacterManager'
import useIpfs from './hooks/useIpfs'

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
  const rosterKey ='HeroDrop-Roster'
  const { ipfsReady, utils } = useIpfs()
  const { saveJSON, loadJSON } = utils
  const roster = useCharacterManager(saveJSON, loadJSON, saveRoster)
  const [ appReady, setAppReady] =  React.useState(false)

  React.useEffect(() => {
    async function loadRoster() {
      if(!ipfsReady) return

      const rosterPath = localStorage.getItem(rosterKey)
      if(rosterPath) {
        const initialRoster = await loadJSON(rosterPath)
        roster.set(initialRoster)
        console.log('Loaded roster', initialRoster)
      }
      else {
        console.log('No roster saved')
      }
      setAppReady(true)
    }
    
    loadRoster()
  }, [ipfsReady])

  async function saveRoster(newRoster) {
    console.log('saving roster:', newRoster)
    const newRosterPath = await saveJSON(newRoster)
    console.log('saving roster path:', newRosterPath)
    localStorage.setItem(rosterKey, newRosterPath)
  }

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/roster" element={<Roster appReady={appReady} roster={roster} />} />
          <Route exact path="/wizard/*" element={<Wizard appReady={appReady} roster={roster} />} />
          <Route exact path="/print/*" element={<Print appReady={appReady} roster={roster} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App