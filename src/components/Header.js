import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import logo from '../logo.png'

export default function Header() {
  return <>
    <Grid container justifyContent="center">
      <Typography variant="h1" sx={{ display: { xs: 'none', sm: 'block' }}}>
        Hero Drop
      </Typography>
      <Typography variant="h2" sx={{ display: { xs: 'block', sm: 'none' }}}>
        Hero Drop
      </Typography>
    </Grid>
    <Grid container justifyContent="center">
      <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)' }} align="center">
        a  tabletop roleplaying game focused on teamwork and creativity
      </Typography>
    </Grid>
    <Grid container justifyContent="center">
      <img src={logo} className="App-logo" alt="logo" />
    </Grid>
  </>
}