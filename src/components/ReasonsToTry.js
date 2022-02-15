import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid' 

export default function ReasonsToTry() {
  return <>
    <Grid container justifyContent={'center'}>
      <Grid item xs={11} sm={7} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">Be Creative</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Create an engaging character that perfectly fits the role and vision you desire
        </Typography>
      </Grid>
      <Grid item xs={11} sm={7} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">Cinematic</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Each scenario advances the story in an impactful and memorable way.
        </Typography>
      </Grid>
      <Grid item xs={11} sm={7} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">Earn Rewards</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Get involved with the community to earn rewards and join others in a new experience!
        </Typography>
      </Grid>
    </Grid>
  </>
}