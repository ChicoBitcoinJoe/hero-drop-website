import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import Paper from '../Paper'

export default function Page2({ character }) {  
  console.log(character)

  return (
    <Paper size="Letter" margin={'0.5in'}>
      <Grid container spacing={2}>
      </Grid>
    </Paper>
  )
}