import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export default function HowToPlay() {
  return <>
    <Card sx={{ p: 2, height: '100%' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>How to Play</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h5">The Bard</Typography>
          <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
            An omnipotent storyteller known as a Bard narrates the world and provides opportunities for your character to achieve the goals they set. The Bard describes each scenario to the players and then describes the outcome of any actions the player's take, repeating this process until the players move on to the next scenario. The Bard is also responsible for enforcing rules and always has the final say with any disputes.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h5">The Player</Typography>
          <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
            As a player you choose any actions you wish your character to take in the game world. Many simple actions are guaranteed to succeed but some actions require rolling action dice in a contest to determine its success. Each contest belongs to a combination of one pillar and one talent. An action may fit multiple pillars or talents and a player can try to convince the Bard that an action fits a specific pillar or talent.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  </>
}