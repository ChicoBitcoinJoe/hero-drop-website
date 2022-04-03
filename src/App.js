import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import './App.css'
import theme from './theme'
import Home from './routes/Home'
import HeroTemplates from './routes/HeroTemplates'
import CharacterSheet from './routes/CharacterSheet'
// import Dao from './routes/Dao'

const Links = {
  Resources: {
    Rulebook: "https://docs.google.com/document/d/1s07JBt4ydLFZTLBsmE2q0BFiW32j7CPS1l54scmiiJo/edit?usp=sharing",
    BardsGuide: "https://docs.google.com/document/d/1sYbL_LNhaXJnUL4doECauA8FChkL0_o0P5XuVVxby20/edit?usp=sharing",
    CharacterSheet: "https://drive.google.com/file/d/1RHzUlfzSAGwazND7HJ1TnysoT8l59hZ7/view?usp=sharing",
  },
  DAO: {
    LearnMore: "https://docs.google.com/document/d/1SPz2uUbLthxfkQSCgItmYpRw7QTx8EuxqW6qox5R0DQ/edit?usp=sharing",
    Website: "https://app.daohaus.club/dao/0x89/0xa7ddfaaa605b9699e08543d980b40ffb94894ba7",
    Testnet: "https://app.daohaus.club/dao/0x4/0x9747a913f50a2f1b9f1a7bb2d4fbc4fb1d678bbb",
  },
  Community: {
    Discord: "https://discord.com/channels/927340117637603370/927340117637603373",
    Twitter: "https://twitter.com/HeroDropTTRPG",
  },
  HowTo: {
    LearnMore: "https://ethereum.org/en/dao/",
    Metamask: "https://metamask.io/",
    Ledger: "https://www.ledger.com/",
    StoreSeed: "https://www.coinbase.com/learn/crypto-basics/what-is-a-seed-phrase",
    Polygon: "https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/",
    Matic: "https://www.moonpay.com/buy/matic",
    Dai: "https://makerdao.com/en/",
    Uniswap: "https://app.uniswap.org/#/swap?chain=polygon",
  },
  ProfilePicture: "https://avatars.githubusercontent.com/u/21048886?v=4"
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home Links={Links} />} />
          {/* <Route exact path="/dao" element={<Dao Links={Links} />} /> */}
          <Route exact path="/character-sheet" element={<CharacterSheet />} />
          <Route exact path="/character-sheet/*" element={<HeroTemplates />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App