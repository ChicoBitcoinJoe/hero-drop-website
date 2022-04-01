import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

import Header from '../components/Header'
import WhatIsHeroDrop from '../components/WhatIsHeroDrop'
import HowToPlay from '../components/HowToPlay'
import ReasonsToTry from '../components/ReasonsToTry'
import AboutTheCreator from '../components/About'
import Navbar from '../components/Navbar'

import theme from '../theme'

function useWindowWidth() {
  
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return windowWidth
}

export default function Home({ Links }) {
  const windowWidth = useWindowWidth()
  return <>
  <ThemeProvider theme={theme}>

    <AppBar position="fixed" color="primary" elevation={0} className="hide-on-print">
      <Navbar label='Hero Drop' Links={Links} />
    </AppBar>
    <div style={{ height: '56px' }}></div>        
    <div style={{ height: '10vh' }}></div>
    <Grid container item xs={12} justifyContent={'center'}>
      <Grid sx={{ maxWidth: '996px', p: 2 }}>
        <Grid container justifyContent="center">
          <Header />
        </Grid>
        <Grid item xs={12}>
          <ReasonsToTry />
        </Grid>
        <Grid container spacing={2} sx={{ mt: 8 }}>            
          <Grid item xs={12}>
            <HowToPlay Links={Links}/>
          </Grid>            
          <Grid item sx={{ width: '100%', maxWidth: windowWidth - 16 }}>
            <WhatIsHeroDrop />
          </Grid>
        </Grid>                
        <Grid item container spacing={4} sx={{ mt: 8 }}>
          <Grid container item xs={12} sm={5} justifyContent="center">
            <img style={{ borderRadius: '50%', border: '4px solid white', height: '256px' }} src={Links.ProfilePicture} alt="creator's face" />
          </Grid>
          <Grid item xs>
            <AboutTheCreator />
          </Grid>
        </Grid>
      </Grid>      
    </Grid>
    <AppBar position="static" color="primary" elevation={2} sx={{ mt: 8, p: 3, textAlign: 'center' }} className="hide-on-print">
      <div>
        Any questions? Email <Link sx={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }} href="mailto:support@herodrop.org" target="_blank">support@herodrop.org</Link>
      </div>
    </AppBar>
  </ThemeProvider>
  </>
}