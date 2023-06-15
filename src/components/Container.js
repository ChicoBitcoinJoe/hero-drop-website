
import Grid from '@mui/material/Unstable_Grid2'

export default function Container({ children, justifyContent, alignItems }) {
  return <>
    <Grid container sx={{ p: 2, height: '100vh' }} justifyContent={justifyContent || 'center'} alignItems={alignItems || 'start'}>
      <Grid container xs sx={{ maxWidth: '768px' }} spacing={2}>
        {children}
      </Grid>
    </Grid>
  </>
}