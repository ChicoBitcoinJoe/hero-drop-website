import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
// import TwitterIcon from '@mui/icons-material/Twitter'
// import { FaDiscord as DiscordIcon } from "react-icons/fa"

import Paper from '../../components/Paper'
import Page1 from './Page1'

const Links = {
  Rulebook: "https://docs.google.com/document/d/1zG7CW7Y7-6wxZP_4bRODPPCcrxyXFQ43CUDYZCQ4TbU/edit?usp=sharing",
  Discord: "https://discord.com/channels/927340117637603370/927340117637603373",
  Twitter: "https://twitter.com/HeroDropTTRPG",
}

export default function Home() {
  const navigate = useNavigate()
  
  const contentBoxStyles = {   
    p: '0.5in',
    pt: 'calc(.5in + 8px)',
    '@media print': { 
      minWidth: '100%',
      m: 0, 
      p: 0, 
    } 
  }

  const toolbarStyles = { 
    zIndex: 3,
    position: 'absolute', 
    top: '8px',
    left: '0.5in',
    width: '216mm',
    color: 'white',
  }

  return <>
    <Box displayPrint={'none'} sx={toolbarStyles}>
      <Grid container>
        <Grid xs="auto">
          
        </Grid>
        <Grid xs="auto">
          
        </Grid>
        <Grid xs />
        <Grid xs="auto">
          
        </Grid>
      </Grid>
    </Box>
    <Box sx={contentBoxStyles}>
      <Page1 navigate={navigate} />
      {/* <Box displayPrint="none" sx={{ height: '.5in' }} /> */}
      {/* <Page2 character={character}/> */}
    </Box>
  </>
}