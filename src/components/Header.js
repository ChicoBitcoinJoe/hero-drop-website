import Typography from '@mui/material/Typography'

import logo from '../logo.png'

export default function Header() {
  return (
    <header className="App-header">
      <Typography variant="h1" sx={{ p: 2, display: { xs: 'none', sm: 'block' }}}>
        Hero Drop
      </Typography>
      <Typography variant="h2" sx={{ p: 2, display: { xs: 'block', sm: 'none' }}}>
        Hero Drop
      </Typography>
      <Typography variant="h6" sx={{ p: 2, color: 'rgba(255,255,255,0.5)' }}>
        a  tabletop roleplaying game focused on teamwork and creativity
      </Typography>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
  )
}