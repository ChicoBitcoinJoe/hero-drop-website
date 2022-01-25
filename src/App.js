import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import logo from './logo.png';
import theme from './theme';
import './App.css';

import Navbar from './components/Navbar';
import ActionTable from './components/ActionTable'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" elevation={0}>
        <Navbar label='Hero Drop' />
      </AppBar>
      <div className="App">
        <header className="App-header">
          <Typography variant="h1">
            Hero Drop
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            tabletop roleplaying game
          </Typography>
          <img src={logo} className="App-logo" alt="logo" />          
        </header>
        <Box sx={{ maxWidth: '1196px', p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ p: 2, height: '100%' }}>
                <Typography variant="h4" sx={{ mb: 4 }}>What is Hero Drop?</Typography>
                <Typography variant="body1" sx={{ my: 2, textAlign: 'justify', height: '100%' }}>
                  Hero Drop is a simple to learn roleplaying game with a strong focus on teamwork and creativity. Heroes, both good and evil, roam the land. Some fight divine wars, others fight for themselves, or choose not to fight at all, but all heroes leave a mark wherever they travel.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>Why play Hero Drop?</Typography>
                <Typography variant="body1" sx={{ my: 2, textAlign: 'justify', height: '100%' }}>
                  Players have an incredible amount of agency and access to a plethora of tools to encourage creative problem solving and working together. The goal while playing Hero Drop is for it to feel cinematic. Movies don't waste their viewers' time by having the main character kill rats for thirty minutes. A game shouldn't waste the players time either. Each scenario should enable a meaningful roleplaying situation or have an impact on the story.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ p: 2, height: '100%' }}>
                <Typography variant="h4" sx={{ mb: 4 }}>How to Play</Typography>
                <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
                  Gameplay is divided into three pillars of adventure: Combat, Social, and Exploration. Combat occurs when a hostile enemy attacks and ends when there are no more hostile enemies. Social interactions occur whenever you interact with a sentient being. Exploration focuses on travel and surviving in different environments. Each pillar is further divided into six talents that define a unique style of gameplay and collectively represent the strengths and weaknesses of your character.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card sx={{ p: 2, height: '100%' }}>
                <Typography variant="h4" sx={{ mb: 4 }}>The Bard</Typography>
                <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
                  An omnipotent storyteller known as a Bard narrates the world and provides opportunities for your character to achieve the goals they set. The Bard describes each scenario, and describes the outcome of any actions the player's take. The Bard is also responsible for enforcing rules and always has the final say with any disputes.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card sx={{ p: 2, height: '100%' }}>
                <Typography variant="h4" sx={{ mb: 4 }}>The Player</Typography>
                <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
                  As a player you choose any actions your character takes in the world. Many simple actions are guaranteed to succeed but some actions require rolling action dice in a contest to determine its success. Each contest usually belongs to a combination of one pillar and one talent. An action may fit multiple pillars or talents and a player can try to convince the Bard that an action fits a specific pillar or talent.
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2, maxWidth: window.innerWidth - 32 }}>
            <ActionTable />
          </Grid>
        </Box>
        <div style={{ height: '30vh' }}></div>
        <AppBar position="static" color="primary" elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          Created by Joseph Reed <br />
          <br />
          chicobitcoinjoe@gmail.com
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default App;
