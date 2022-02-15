import * as React from 'react'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"

import { ThemeProvider } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'

import './App.css'
import theme from './theme'
import Home from './routes/Home'
import Dao from './routes/Dao'
import Navbar from './components/Navbar'

const Links = {
  Resources: {
    Rulebook: "https://docs.google.com/document/d/1s07JBt4ydLFZTLBsmE2q0BFiW32j7CPS1l54scmiiJo/edit?usp=sharing",
    BardsGuide: "https://docs.google.com/document/d/1sYbL_LNhaXJnUL4doECauA8FChkL0_o0P5XuVVxby20/edit?usp=sharing",
    CharacterSheet: "https://drive.google.com/file/d/1RHzUlfzSAGwazND7HJ1TnysoT8l59hZ7/view?usp=sharing",
  },
  Community: {
    DAO: "https://app.daohaus.club/dao/0x89/0xa7ddfaaa605b9699e08543d980b40ffb94894ba7",
    Discord: "https://discord.com/channels/927340117637603370/927340117637603373",
    Twitter: "https://twitter.com/HeroDropTTRPG",
    TestnetDAO: "https://app.daohaus.club/dao/0x4/0x9747a913f50a2f1b9f1a7bb2d4fbc4fb1d678bbb",
  },
  HowTo: {
    Metamask: "https://metamask.io/",
    Ledger: "https://www.ledger.com/",
    StoreSeed: "https://www.coinbase.com/learn/crypto-basics/what-is-a-seed-phrase",
    Polygon: "https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/",
    Matic: "https://www.moonpay.com/buy/matic",
    Dai: "https://makerdao.com/en/",
    Uniswap: "https://app.uniswap.org/#/swap?chain=polygon",
  },
  LearnMore: "https://ethereum.org/en/dao/",
  ProfilePicture: "https://avatars.githubusercontent.com/u/21048886?v=4"
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: 'smooth', 
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <AppBar position="fixed" color="primary" elevation={0}>
          <Navbar label='Hero Drop' Links={Links} />
        </AppBar>
        <div style={{ height: '56px' }}></div>
        <Routes>
          <Route exact path="/" element={<Home Links={Links} />} />
          <Route exact path="/dao" element={<Dao Links={Links} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <AppBar position="static" color="primary" elevation={2} sx={{ mt: 8, p: 3, textAlign: 'center' }}>
          <div>
            Any questions? Email <Link sx={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }} href="mailto:support@herodrop.org" target="_blank">support@herodrop.org</Link>
          </div>
        </AppBar>
      </Router>
    </ThemeProvider>
  )
}

export default App