import * as React from 'react'

import Box from '@mui/material/Box'

export function Label({ children, left, right }) {
  const labelStyles = {
    padding: '0 4px', 
    position: 'absolute', 
    top: '-7px',
    left: left, 
    right: right, 
    backgroundColor: 'white',
    fontSize: '9px',
    margin: '0 0 0 6px', 
    zIndex: '2',
    borderRadius: '4px',
  }

  return <>
    <h6 style={labelStyles}>{children}</h6>
  </>
}

export default function BorderedContainer({ label, extraLabels, children, sx }){
  const bsx ={
    position: 'relative',
    border: 'solid black',
    borderWidth: '2px 1px 2px 1px',
    borderRadius: '4px',
    p: 0,
    overflow: 'hidden',
    ...sx
  }

  return <Box sx={{ position: 'relative' }}>
    <Label>{label}</Label>
    {extraLabels}
    <Box sx={bsx}>
      {children}
    </Box>
  </Box>
}