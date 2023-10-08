import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate } from 'react-router-dom'

import PrintIcon from '@mui/icons-material/Print'
import HomeIcon from '@mui/icons-material/Home'

import Page1 from '../components/Page1/Page1'
import Page2 from '../components/Page2/Page2'
import useCharacter from '../hooks/useCharacter'

export default function Roster({ roster }) {
  const navigate = useNavigate()
  const character = useCharacter()

  function HomeButton() {
    return (
      <Button onClick={() => navigate("/home")}
        sx={{ color: 'white', borderRadius: 0 }}  
        size="large"
        startIcon={<HomeIcon />}
      >
        Home
      </Button>
    )
  }
  
  function PrintButton() {
    return (
      <Button onClick={() => {window.print()}}
        sx={{ color: 'white', borderRadius: 0 }}  
        size="large"
        startIcon={<PrintIcon />}
      >
        Print
      </Button>
    )
  }

  const contentBoxStyles = {   
    backgroundColor: 'grey',
    p: '0.5in',
    pt: 'calc(.5in + 8px)',
    '@media print': { 
      minWidth: '100%',
      m: 0, 
      p: 0, 
    } 
  }

  const toolbarStyles = { 
    position: 'absolute', 
    // backgroundColor: 'white',
    color: 'white',
    left: '0.5in',
    top: 8,
    zIndex: 3,
    width: '216mm',
    borderBottom: '1px solid grey',
    // borderTop: '1px solid grey',
  }

  return <>
    <Box displayPrint={'none'} sx={toolbarStyles}>
      <Grid container>
        <Grid xs="auto">
          <HomeButton />
        </Grid>
        <Grid xs>

        </Grid>
        <Grid xs="auto">
          <PrintButton />
        </Grid>
      </Grid>
    </Box>
    <Box sx={contentBoxStyles}>
      <Page1 character={character} />
      <Box displayPrint="none" sx={{ height: '.5in' }} />
      <Page2 character={character}/>
    </Box>
  </>
}