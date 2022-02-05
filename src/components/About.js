import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export default function About() {
  return (
    <Grid item xs={12}>
      <Typography variant="h4" sx={{ mb: 4 }}>About the Creator</Typography>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
        Hero Drop is a tabletop roleplaying game I have developed over the last two years. I’ve always dreamed of being a game designer. From the BASIC game programming books I read when I was a teenager, the game design courses I took in university, and learning Dungeons and Dragons with my friends, all these experiences created a path that led me to create Hero Drop. 
      </Typography>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
        - Joseph Reed
      </Typography>
    </Grid>  
  )
}