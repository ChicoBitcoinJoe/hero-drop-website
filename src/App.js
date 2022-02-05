import * as React from 'react'
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
import Roadmap from './components/Roadmap'
import AboutTheCreator from './components/About'
import Participation from './components/Participation'

const Links = {
  Rulebook: "https://docs.google.com/document/d/1s07JBt4ydLFZTLBsmE2q0BFiW32j7CPS1l54scmiiJo/edit?usp=sharing",
  BardsGuide: "https://docs.google.com/document/d/1sYbL_LNhaXJnUL4doECauA8FChkL0_o0P5XuVVxby20/edit?usp=sharing",
  CharacterSheet: "https://drive.google.com/file/d/1RHzUlfzSAGwazND7HJ1TnysoT8l59hZ7/view?usp=sharing",
  CommunityDAO: "https://app.daohaus.club/dao/0x4/0x9747a913f50a2f1b9f1a7bb2d4fbc4fb1d678bbb",
  AssetDAO: "https://app.daohaus.club/dao/0x89/0xa7ddfaaa605b9699e08543d980b40ffb94894ba7",
  Discord: "https://discord.com/channels/927340117637603370/927340117637603373",
  DAOGuide: "https://docs.google.com/document/d/1HlgXcBMiAK_-e8HiFC_iHRRcKyTarUv5W_8tjAPXbVs/edit?usp=sharing",
  LearnMore: {
    reputation: "https://docs.google.com/document/d/1OtRpsBs3KKUoFFBEI32Chy5InLYiEWQWHZAEOxnGcc0/edit#heading=h.p8ixy7bw1nmh",
    loot: "https://docs.google.com/document/d/1OtRpsBs3KKUoFFBEI32Chy5InLYiEWQWHZAEOxnGcc0/edit#heading=h.fzi6z9bd7o2s",
    shares: "https://docs.google.com/document/d/1OtRpsBs3KKUoFFBEI32Chy5InLYiEWQWHZAEOxnGcc0/edit#heading=h.xmbk9xljbred",
  }
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
        <Grid sx={{ maxWidth: '996px', p: 2 }}>
          <Grid item xs={12} sx={{ mt: 4, mb: 8 }}>
            <ReasonsToTry />
          </Grid>

          <Participation Links={Links} />

          <Grid container spacing={2} sx={{ mt: 16 }}>            
            <Grid item xs={12}>
              <HowToPlay />
            </Grid>            
            <Grid item xs={12}>
              <WhatIsHeroDrop />
            </Grid>
          </Grid>
            
          <Grid item sx={{ mt: 2, width: '100%', maxWidth: window.innerWidth - 32 }}>
            <ActionTable />
          </Grid>
      
          <Grid item sx={{ width: '100%', maxWidth: window.innerWidth - 32 }}>
            <Typography variant="h4" sx={{ mt: 8, mb: 4 }}>Roadmap</Typography>
            <Roadmap Links={Links} />
          </Grid>                    

          <Grid item xs={12} sx={{ mt: 8 }}>
            <AboutTheCreator />
          </Grid>
        </Grid>
    
        <AppBar position="static" color="primary" elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          contact me - chicobitcoinjoe@gmail.com
        </AppBar>
      </Grid>
    </ThemeProvider>
  )
}

export default App