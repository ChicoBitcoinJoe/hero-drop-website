import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

export default function HorizontalSpace({ height, sx }){
  return <Grid xs={12} sx={{ p: 0, height: height || '16px', ...sx }}></Grid>
}