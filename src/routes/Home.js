import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Header from '../components/Header'
import WhatIsHeroDrop from '../components/WhatIsHeroDrop'
import HowToPlay from '../components/HowToPlay'
import ReasonsToTry from '../components/ReasonsToTry'
import Roadmap from '../components/Roadmap'
import AboutTheCreator from '../components/About'

export default function Home({ Links }) {
  return <>  
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
          <Grid item sx={{ width: '100%', maxWidth: window.innerWidth - 16 }}>
            <WhatIsHeroDrop />
          </Grid>
        </Grid>

        <Grid item sx={{ width: '100%', maxWidth: window.innerWidth - 32 }}>
          <Typography variant="h4" align="center" sx={{ mt: 8, mb: 4 }}>Roadmap</Typography>
          <Roadmap Links={Links} />
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
  </>
}