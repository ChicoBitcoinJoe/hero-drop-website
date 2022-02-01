import Typography from '@mui/material/Typography'

import logo from '../logo.png'

export default function Header() {
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