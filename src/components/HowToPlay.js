import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export default function HowToPlay({ Links }) {
  return <>
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
  </>
}