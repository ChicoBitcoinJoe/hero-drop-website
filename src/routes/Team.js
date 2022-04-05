import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function Team({ Links }) {
  const linkStyles = { color: 'white', textDecoration: 'none', fontWeight: 'bold' }
  return <>
    <Grid item container spacing={4}>
      <Grid container item xs={12} sm={5} justifyContent="center">
        <img style={{ borderRadius: '50%', border: '4px solid white', height: '256px' }} src={Links.ProfilePicture} alt="creator's face" />
      </Grid>
      <Grid item xs sx={{ pr: { xs: 0, sm: 4 } }}>
        <Typography variant="h4" sx={{ mb: 0 }}>Joseph Reed</Typography>
        <Typography variant="subtitle2">Creator and Lead Game Designer</Typography>
        <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
          "I’ve always dreamed of being a game designer and finally decided to make it a reality. Using my experience from game design classes and tabletop roleplaying games I designed Hero Drop over the last two years. Hero Drop should feel simple but dynamic, leading to an immersive roleplaying experience. 
        </Typography>
        <Typography variant="body1">
          I hope you enjoy Hero Drop as much as I do!
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, textAlign: 'right'}}>
          - Joe
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ m: 8, textAlign: 'center' }}>
        Want to Join the team? Email <Link sx={{ ...linkStyles}} href="mailto:support@herodrop.org" target="_blank">joe@herodrop.org</Link> 
      </Grid>
    </Grid>
  </>
}