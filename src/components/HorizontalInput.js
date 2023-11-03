import * as React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

import BorderedContainer from './BorderedContainer'
import Typography from '@mui/material/Typography'

export default function HorizontalInput({ label, value, orientation }) {
  if(!orientation) orientation = 'left'

  function ValueBox() {
    return <Grid xs="auto">
      <BorderedContainer sx={{ width: '36px', p: '2px' }}>
        <Box sx={{ p: .5, border: '1px dotted', borderRadius: '2px', height: '28px' }}>
          <Typography sx={{ fontSize: '14px', textAlign: 'center' }}>{value}</Typography>
        </Box>
      </BorderedContainer>
    </Grid>
  }

  function Label() {
    return <Grid xs container alignItems={'center'}>
      <Grid xs={12}>
        <BorderedContainer sx={{ 
            p: 0.75, 
            borderTopLeftRadius: orientation === 'left' && '0px', 
            borderTopRightRadius: orientation === 'right' && '0px', 
            borderBottomLeftRadius: orientation === 'left' && '0px', 
            borderBottomRightRadius: orientation === 'right' && '0px', 
            borderLeft: orientation === 'left' &&  '0px',
            borderRight: orientation === 'right' &&  '0px',
          }}>
          <Typography sx={{ fontSize: '9px', textAlign: 'center' }}>{label}</Typography>
        </BorderedContainer>
      </Grid>
    </Grid>
  }

  return (
    <Grid container>
      {
        orientation === 'right' ? <>
          <Label />
          <ValueBox />
        </>
        : <>
          <ValueBox />
          <Label />
        </>
      }
    </Grid>
  )
}