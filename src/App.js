import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import logo from './logo.png'
import theme from './theme'
import './App.css'

import Navbar from './components/Navbar'
import ActionTable from './components/ActionTable'
import Timeline from './components/Timeline'

function Header() {
  return (
    <header className="App-header">
      <Typography variant="h1">
        Hero Drop
      </Typography>
      <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)' }}>
        a simple tabletop roleplaying game
      </Typography>
      <img src={logo} className="App-logo" alt="logo" />          
    </header>
  )
}

function AboutTheCreator() {
  return (
    <Grid item xs={12}>
      <Typography variant="h4" sx={{ mb: 4 }}>About the Creator</Typography>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
        I’ve always dreamed of being a game designer. From the BASIC game programming books I read as a young lad, the game design courses I took in university, and learning Dungeons and Dragons with my friends, all these experiences created a path that lead me to create Hero Drop over the last two years.
      </Typography>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
        - Joseph Reed
      </Typography>
    </Grid>  
  )
}

function WhatIsHeroDrop() {
  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <Typography variant="h4">What is Hero Drop?</Typography>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
        Hero Drop is a simple to learn tabletop roleplaying game with a strong focus on teamwork and creativity. Heroes, both good and evil, roam the land. Some fight divine wars, others fight for themselves, or choose not to fight at all, but all heroes leave a mark wherever they travel. Gameplay is divided into three pillars of adventure: Combat, Social, and Exploration. Combat occurs when a hostile enemy attacks and ends when there are no more hostile enemies. Social interactions occur whenever you interact with a sentient being. Exploration focuses on travel and surviving in different environments. Each pillar is further divided into six talents that define a unique style of gameplay within each pillar.
      </Typography>
    </Card>
  )
}

function HeroDropPreview() {
  return <>
    <Grid item xs={12}>
      <Card sx={{ p: 2, height: '100%' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>How to Play</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h5">The Bard</Typography>
            <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
              An omnipotent storyteller known as a Bard narrates the world and provides opportunities for your character to achieve the goals they set. The Bard describes each scenario to the players and then describes the outcome of any actions the player's take, repeating this process until the players move on to the next scenario. The Bard is also responsible for enforcing rules and always has the final say with any disputes.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h5">The Player</Typography>
            <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
              As a player you choose any actions you wish your character to take in the game world. Many simple actions are guaranteed to succeed but some actions require rolling action dice in a contest to determine its success. Each contest belongs to a combination of one pillar and one talent. An action may fit multiple pillars or talents and a player can try to convince the Bard that an action fits a specific pillar or talent.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </>
}

function ReasonsToTryHeroDrop() {
  return <>
    <Grid item xs={12} style={{ height: '100px' }}></Grid>
    <Grid container item sx={{ px: 4 }}>
      <Grid item xs={12} sm={6} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">Quick to Learn</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Hero Drop only takes about 30 minutes to read the instructions cover to cover.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">Flex your Creativity</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Create a character and craft spells that truly fit the role you imagine.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">Cinematic</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Each scenario should advance the story in an impactful and memorable way.
        </Typography>
      </Grid>
    </Grid>
    <Grid item xs={12} style={{ height: '100px' }}></Grid>
  </>
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" elevation={0}>
        <Navbar label='Hero Drop' />
      </AppBar>
      <Header />
      <Grid container item xs={12} justifyContent={'center'}>
        <Grid sx={{ width: '100%', maxWidth: '1196px', p: 2 }}>
          <Grid container spacing={2}>
            <ReasonsToTryHeroDrop />
            
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
            <HeroDropPreview />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2, width: '100%', maxWidth: window.innerWidth - 32 }}>
            <ActionTable />
          </Grid>
        </Grid>
        <Grid sx={{ width: '100%', maxWidth: '1196px', p: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mt: 8, mb: 4 }}>Roadmap</Typography>
            <Timeline />
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