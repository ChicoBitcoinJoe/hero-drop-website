import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import theme from './theme'
import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import WhatIsHeroDrop from './components/WhatIsHeroDrop'
import HowToPlay from './components/HowToPlay'
import ReasonsToTry from './components/ReasonsToTry'
import ActionTable from './components/ActionTable'
import Timeline from './components/Timeline'
import AboutTheCreator from './components/About'

const Links = {
  Rulebook: "https://docs.google.com/document/d/1s07JBt4ydLFZTLBsmE2q0BFiW32j7CPS1l54scmiiJo/edit?usp=sharing",
  BardsGuide: "https://docs.google.com/document/d/1sYbL_LNhaXJnUL4doECauA8FChkL0_o0P5XuVVxby20/edit?usp=sharing",
  CharacterSheet: "https://drive.google.com/file/d/1RHzUlfzSAGwazND7HJ1TnysoT8l59hZ7/view?usp=sharing",
  CommunityDAO: "https://app.daohaus.club/dao/0x4/0x9747a913f50a2f1b9f1a7bb2d4fbc4fb1d678bbb",
  Discord: "https://discord.com/channels/927340117637603370/927340117637603373",
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" elevation={0}>
        <Navbar label='Hero Drop' Links={Links} />
      </AppBar>
      <Header />
      <Grid container item xs={12} justifyContent={'center'}>
        <Grid sx={{ width: '100%', maxWidth: '1196px', p: 2 }}>
          <Grid container spacing={2}>
            <ReasonsToTry />
            
            <Grid item xs={12} md={6}>
              <WhatIsHeroDrop />
            </Grid>
            
            <Grid container item xs={12} md={6}>
              <Card sx={{ width: '100%' }}>
                <CardMedia component="img"
                  sx={{ height: '441.85px' }}
                  image="http://via.placeholder.com/1024x1024"
                  alt="Placeholder"
                />
              </Card>
            </Grid>
            <HowToPlay />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2, width: '100%', maxWidth: window.innerWidth - 32 }}>
            <ActionTable />
          </Grid>
        </Grid>
        <Grid sx={{ width: '100%', maxWidth: '1196px', p: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mt: 8, mb: 4 }}>Roadmap</Typography>
            <Timeline Links={Links} />
          </Grid>
        </Grid>
        <Grid sx={{ width: '100%', maxWidth: '1196px', p: 2 }}>
          <div style={{ height: '120px' }}></div>
          <AboutTheCreator />
        </Grid>
        <AppBar position="static" color="primary" elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          contact me - chicobitcoinjoe@gmail.com
        </AppBar>
      </Grid>
    </ThemeProvider>
  )
}

export default App