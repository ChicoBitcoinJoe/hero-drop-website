import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export default function About() {
  return (
    <Grid item xs={12}>
      <Typography variant="h4" sx={{ mb: 4 }} align="center">About the Creator</Typography>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
        Hello, my name is Joseph Reed and I am the creator of Hero Drop. I’ve always dreamed of being a game designer and finally decided to make it a reality using my experience from game design classes I took in university and my experience with tabletop roleplaying games. My goal when designing the core game mechanics was for Hero Drop to feel simple but dynamic, leading to an immersive roleplaying experience. 
      </Typography>
      <Typography variant="body1">
        I hope you enjoy Hero Drop as much as I do!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, textAlign: 'right'}}>
        - Joe
      </Typography>
    </Grid>  
  )
}