import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import logo from '../logo.png'
import ActionTable from '../components/ActionTable'

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

export default function Home({ Links }) {
  const windowWidth = useWindowWidth()

  function Reason({ title, text }) {
    return (
      <Grid item xs={11} sm={7} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>{text}</Typography>
      </Grid>
    )
  }
  
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
    <Grid container item justifyContent={'center'}>
      <Reason title={'Be Creative'} text={"Create an engaging character that perfectly fits the role and vision you desire"} />
      <Reason title={'Cinematic'} text={"Each scenario advances the story in an impactful and memorable way."} />
      <Reason title={'Join the Community'} text={"Join the discord and meet others experiencing Hero Drop and give feedback"} />
    </Grid>
    <Grid container spacing={2} sx={{ mt: 8 }}>            
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mb: 4 }} align="center">Gameplay</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ p: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h5">The Bard</Typography>
                <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
                  An omnipotent storyteller known as a Bard narrates the world and provides opportunities for your character to achieve the goals they set. The Bard describes each scenario to the players and then describes the outcome of any actions the player's take, repeating this process until the players move on to the next scenario. The Bard is also responsible for enforcing rules and always has the final say with any disputes.
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={Links.Resources.BardsGuide} target="_blank" variant="outlined" sx={{ color: 'white' }}>Bard's Guide</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ p: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h5">The Player</Typography>
                <Typography variant="body1" sx={{ my: 2, textAlign: 'justify', minHeight: { md: '192px' } }}>
                  As a player you create a character that fills a role you desire by choose their strengths and weaknesses. Then you choose actions for them that make sense for their personality and the information that they know. Many simple actions are guaranteed to succeed but some actions require rolling action dice in a contest to determine if it succeeds. 
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={Links.Resources.Rulebook} target="_blank" variant="outlined" sx={{ color: 'white' }}>Rulebook</Button>
                <Button href={"/character-sheet"} target="_blank" variant="outlined" sx={{ color: 'white' }}>Character Sheet</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>            
      <Grid item sx={{ width: '100%', maxWidth: windowWidth - 16 }}>
        <Card>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5">The Three Pillars of Adventure</Typography>
            <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
              Gameplay is divided into three pillars of adventure: Combat, Social, and Exploration. Combat occurs when a hostile enemy attacks and ends when there are no more hostile enemies. Social interactions occur whenever you interact with a sentient being. Exploration focuses on travel and surviving in different environments. Each pillar is further divided into six talents that define a unique style of gameplay within each pillar.
            </Typography>
          </Box>
          <ActionTable />
        </Card>
      </Grid>
    </Grid>
  </>
}