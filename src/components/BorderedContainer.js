import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'

export function ExtraLabels({ label2, label3 }) {
  return <>{ 
    (label2 || label3) && 
    <Grid container sx={{ fontSize: '9px', width: '100%' }}>
      <Grid xs={!label3 ? 12 : 6} sx={{ display: label2 ? 'block' : 'none' }}>
        <Box sx={{ margin: '0 0 0 0' }}>
          {label2}
        </Box>
      </Grid> 
      <Grid xs={6} sx={{ display: label3 ? 'block' : 'none' }}>
        <Box sx={{ margin: '0 0 0 0' }}>
          {label3}
        </Box>
      </Grid> 
    </Grid>
  }</>
}

export default function BorderedContainer({ container, label, label2, children, spacing, height, sx }){
  const bsx ={
    height: height + ' !important', 
    position: 'relative',
    border: 'solid black',
    borderWidth: '2px 1px 2px 1px',
    borderRadius: '4px',
    p: 0.5,
    ...sx
  }

  const labelStyles = { 
    display: label ? 'block' : 'none', 
    padding: '0 2px', 
    margin: '0 0 0 6px', 
    position: 'absolute', 
    top: '-8px', 
    backgroundColor: 'white',
    fontSize: '9px'
  }

  const label2Styles = { 
    display: label ? 'block' : 'none', 
    padding: '0 2px', 
    margin: '0 0 0 2px', 
    position: 'absolute', 
    top: '-8px', 
    right: '13px',
    backgroundColor: 'white',
    fontSize: '9px'
  }

  return <Grid container={container} sx={bsx} spacing={spacing}>
    <h6 style={labelStyles}>{label}</h6>
    <h6 style={label2Styles}>{label2}</h6>
    {children ? children : <>&nbsp;</>}
  </Grid>
}