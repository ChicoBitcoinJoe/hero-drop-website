import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid' 

export default function ReasonsToTry() {
  return <>
    <Grid container>
      <Grid item xs={12} sm={6} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">Quick to Learn</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Hero Drop only takes about 30 minutes to read the instructions cover to cover.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">Flex your Creativity</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Create a character and craft spells that truly fit the role you imagine.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} sx={{ px: 5, py: 3, textAlign: "center" }}>
        <Typography variant="h5">Cinematic</Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Each scenario should advance the story in an impactful and memorable way.
        </Typography>
      </Grid>
    </Grid>
  </>
}