import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
// import TwitterIcon from '@mui/icons-material/Twitter'
// import { FaDiscord as DiscordIcon } from "react-icons/fa"

import Paper from '../components/Paper'

const Links = {
  Rulebook: "https://docs.google.com/document/d/1zG7CW7Y7-6wxZP_4bRODPPCcrxyXFQ43CUDYZCQ4TbU/edit?usp=sharing",
  Discord: "https://discord.com/channels/927340117637603370/927340117637603373",
  Twitter: "https://twitter.com/HeroDropTTRPG",
}

function buttonStyles(disabled){
  return {
    width: '100%', 
    color: disabled ? 'grey' : 'black',
    webkitUserSelect: disabled && 'none', /* Safari */
    msUserSelect: disabled && 'none', /* IE 10 and IE 11 */
    userSelect: disabled && 'none', /* Standard syntax */
  }
}

function Heading({ text, page, onClick }) {
  const disabled = !onClick
  return (
    <Grid xs={12}>
      <Link component={!disabled ? "button" : "div"} onClick={onClick} 
        sx={{ 
          mt: 2, 
          fontSize: '20px',  
          textTransform: 'uppercase',
          ...buttonStyles(disabled)
        }} 
        underline="none"
      >
        <Grid xs={12} container>
          <Grid xs="auto">
            {text}
          </Grid>
          <Grid xs />
          <Grid xs="auto">
            {page}
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Link>
    </Grid>
  )
}

function Item({ text, page, onClick }) {
  const disabled = !onClick
  return (
    <Grid xs={12} pt={1}>
      <Link component={!disabled ? "button" : "div"} onClick={onClick} 
        sx={{ 
          width: '100%', 
          fontSize: '16px', 
          ...buttonStyles(disabled)
        }} 
        underline="none"
      >
        <Grid xs={12} container>
          <Grid xs="auto">
            {text}
          </Grid>
          <Grid xs>
            <Typography noWrap>......................................................</Typography>
          </Grid>
          <Grid xs="auto">
            {page}
          </Grid>
        </Grid>
      </Link>
    </Grid>
  )
}

function Footer() {
  return (
    <Grid container pt={70}>
      <Grid xs={12} pb={0.5}>
        <Divider />
      </Grid>
      <Grid xs="auto">
        <Typography>
          Created by Joseph Reed
        </Typography>
      </Grid>
      <Grid xs></Grid>
      <Grid xs="auto">
        <Typography sx={{ color: 'black' }}>
          <Link color="inherit" 
            href="mailto:support@herodrop.org" 
            target="_blank" 
            underline="none"
          >
            Contact us
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

function Page1({ navigate }) {
  const [section, setSection] = React.useState(null)

  const toggleSection = (toggledSection) => {
    const newSection = toggledSection !== section ? toggledSection : null
    console.log({ section, toggledSection, newSection })
    setSection(newSection)
  }

  return <>
    <Box sx={{ width: 'calc(216mm + 56px)', pr: '56px' }}>
      <Paper size="Letter" margin={'0.5in'}>
        <Grid container>
          <Grid xs={12} container >
            <Grid xs={5}>
              <Typography sx={{ fontSize: '48px', fontWeight: 'bold' }}>
                HERO DROP
              </Typography>
            </Grid>
            <Grid xs container alignItems={'end'} pb={1.25}>
              <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: 'grey !important' }}>
                TTRPG
              </Typography>
            </Grid>
          </Grid>


          <Grid xs={6} container pr={4}>
            <Heading text="About" page={1} onClick={null}/>
            {/* <Box sx={{ display: (section !== 'about') && 'none' }}>
              <Typography variant="subtitle2">
                Hero Drop is a tabletop role-playing game.
              </Typography>
            </Box> */}
            <Heading text="Introduction" page={2} onClick={null} />
            {/* <Box sx={{ display: (section !== 'intro') && 'none' }}>
              <Typography variant="subtitle2">
                The player's handbook is useful for new player's learning how to play the game. The Bard's Guide is useful for learning how to run a Hero Drop game.
              </Typography>
            </Box> */}
            <Item text="Player's Handbook" page={3}  onClick={null} />
            <Item text="Bard's Guide" page={4}  onClick={null} />
            <Heading text="Lore" page={5}  onClick={null} />
            <Item text="Primordials, Gods, and Heroes" page={6}  onClick={null} />
            <Item text="The Continents of Planar" page={7}  onClick={null} />
            <Item text="Beyond the Edge of the World" page={8}  onClick={null} />
          </Grid>
          <Grid xs={6} pl={4}>
            <Grid container>
              <Heading text="Character Sheet" page={9}  onClick={() => navigate('/character-sheet')} />
              <Heading text="Log in" page={10} onClick={null}/>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  </>
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