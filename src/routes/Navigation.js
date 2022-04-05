import { Routes, Route, Navigate } from "react-router-dom"

import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

import Home from './Home'
import Dao from './Dao'
import Team from './Team'
import Roadmap from './Roadmap'
import Navbar from '../components/Navbar'

function Navigation({ Links }) {
  const linkStyles = { color: 'white', textDecoration: 'none', fontWeight: 'bold' }
  return <>
    <AppBar position="fixed" color="primary" elevation={0} className="hide-on-print">
      <Navbar label='Hero Drop' Links={Links} />
    </AppBar>
    <div style={{ height: '56px' }}></div>
    <div style={{ height: '10vh' }}></div>
    <Grid container item justifyContent={'center'}>
      <Grid container sx={{ maxWidth: '996px', p: 2 }}>
        <Routes>
          <Route exact path="/" element={<Home Links={Links} />} />
          <Route exact path="/roadmap" element={<Roadmap Links={Links} />} />
          <Route exact path="/team" element={<Team Links={Links} />} />
          <Route exact path="/dao" element={<Dao Links={Links} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Grid>
    </Grid>
    <AppBar position="static" color="primary" elevation={2} sx={{ mt: 8, p: 3, textAlign: 'center' }} className="hide-on-print">
      <Grid sx={{ pb: 4 }}>
        Any questions? Email <Link sx={{ ...linkStyles}} href="mailto:support@herodrop.org" target="_blank">support@herodrop.org</Link>
      </Grid>
      <Grid container justifyContent={'space-around'}>
        <Link href="/team" sx={{ ...linkStyles}}>Team</Link>
        <Link href="/roadmap" sx={{ ...linkStyles}}>Roadmap</Link>
        <Link href="/dao" sx={{ ...linkStyles}}>Community Dao</Link>
      </Grid>
    </AppBar>
  </>
}

export default Navigation