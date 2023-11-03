import * as React from 'react'

import Grid from '@mui/material/Unstable_Grid2'

export default function Score({ label, endLabel, bold }) {
  return <>
    <Grid container xs={12} sx={{ py: .5, fontWeight: bold && 'bold', fontSize: '9px' }}>
      <Grid xs="auto" sx={{ fontWeight: 'bold' }}>
        {label} 
      </Grid>
      <Grid xs sx={{ minWidth: '10px' }} />
      <Grid xs="auto" container justifyContent="center" sx={{ display: endLabel === undefined && 'none' }}>
        <Grid>{endLabel}</Grid>
      </Grid>
    </Grid>
  </>
}