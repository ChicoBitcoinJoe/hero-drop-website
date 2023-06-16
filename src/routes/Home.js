import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'

import PrintIcon from '@mui/icons-material/Print'
import TwitterIcon from '@mui/icons-material/Twitter'
import { FaDiscord as DiscordIcon } from "react-icons/fa"
import { Divider } from '@mui/material'

import Container from '../components/Container'

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

const Links = {
  Rulebook: "https://docs.google.com/document/d/1zG7CW7Y7-6wxZP_4bRODPPCcrxyXFQ43CUDYZCQ4TbU/edit?usp=sharing",
  Discord: "https://discord.com/channels/927340117637603370/927340117637603373",
  Twitter: "https://twitter.com/HeroDropTTRPG",
}

function ImageCard({ title, body, height, href, img, onClick }) {
  const textStyles = {
    // '-webkit-text-stroke-width': '0.5px',
    // '-webkit-text-stroke-color': 'white',
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: '4px'
  }

  return <>
    <Card sx={{ background: 'rgba(0,0,0,0.8)', border: '0.5px solid grey', width: '100%' }}>
      <CardActionArea sx={{ position: 'relative' }} href={href} onClick={onClick} target="_blank">
        <CardMedia
          component="img"
          height={ height || "200" }
          image={img}
          alt={"placeholder"}
        />        
        <CardContent sx={{ p: 1, pl: 0, position: 'absolute', bottom: '0px', left: '0px' }}>
          { title && <Typography sx={{ ...textStyles, p: 1, ml: 1, mb: 0 }} gutterBottom variant="h5" component="div">
            {title}
          </Typography>}
          { 
            body && 
            <Typography sx={{ ...textStyles, p: 1, ml: 1, mb: 0, mt: '-16px' }} variant="body2">
              {body}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
    </Card>
  </>
}

function Header() {
  const windowWidth = useWindowWidth()
  let navigate = useNavigate()
  return <>
    <Grid container xs={12} sx={{ pl: 1 }} spacing={2} alignItems="center">
      <Grid>
        <Button sx={{ color: 'black !important' }} disabled>Hero Drop</Button>
      </Grid>
      <Grid xs>
        <IconButton href={Links.Twitter} target="_blank">
          <TwitterIcon sx={{ color: "#000" }} />
        </IconButton>
        &nbsp;
        <IconButton href={Links.Discord} target="_blank">
          <DiscordIcon color="#000" />
        </IconButton>
      </Grid>
      <Grid>
        <Button sx={{ color: 'black' }} onClick={() => navigate("/print")} startIcon={<PrintIcon sx={{ color: "#000" }} />}>
          { windowWidth <= 375 ? "Print" : "Quick Print" }
        </Button>
      </Grid>
    </Grid>
  </>
}

export default function Home() {
  let navigate = useNavigate()

  return <>
    <Container justifyContent="center" alignItems="center">
      <Header />
        
      <Grid container xs={12}>
        <Grid xs={12} sm={6}>
          <ImageCard title={"Read the Rules"} body="(opens a google document)" href={Links.Rulebook} height={346}/>
        </Grid>
        <Grid container xs={12} sm={6}>
          <Grid xs={12}>
            <ImageCard title={"Create a Character"} img={null} onClick={() => navigate('/wizard')} />
          </Grid>
          <Grid xs={6}>
            <ImageCard body={"My Roster"} height={128} img={null} onClick={() => navigate('/roster')} />
          </Grid>
          <Grid xs={6}>
            <ImageCard body={"Email Support"} height={128} href="mailto:support@herodrop.org" />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12}><Divider sx={{ my: 4 }} /></Grid>
      <Grid xs={12} container justifyContent="center">
        <Grid>Hero Drop is created and updated by Joseph Reed</Grid>
        <Grid xs={12} />
        <Grid>All Rights Reserved</Grid>
      </Grid>
    </Container>
  </>
}