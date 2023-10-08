import * as React from 'react'
import InputBase from '@mui/material/InputBase'
import Grid from '@mui/material/Unstable_Grid2'

export default function BaseInput ({ id, label, value, sx, inputProps, styles, onChange, disabled }){
  return <>
    <InputBase fullWidth
      id={id} 
      value={ value || '' }
      sx={sx || {
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "black",
        },
      }}
      inputProps={ inputProps || { 
        style: { 
          padding: 0,
          fontSize: '14px',
          ...styles,
          color: 'black !important'
        }
      }}
      onChange={(event) => onChange(id, event.target.value)}
      disabled={disabled}
    />
    <Grid xs={12} sx={{ p: 0, borderBottom: '1px solid black' }}></Grid>
    { 
      label
      ? <div style={{ height: '12px', fontSize: '10px' }}>{label}</div>
      : null
    }    
  </>
}