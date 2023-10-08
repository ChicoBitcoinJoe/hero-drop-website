import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'

export function AbilityScore({ label, score }) {

  const outerBoxStyles = { 
    width: 'calc(1in - 4px)', 
    height: '.50in',
    borderRadius: '4px', // '.25in',
    border: '1px solid black',
    p: '2px',
  }
  
  const innerBoxStyles = { 
    width: 'calc(.50in - 6px)', 
    height: 'calc(.50in - 6px)',
    borderRadius: '4px', // '.25in',
    border: '1px dotted black',
    pt: '3px'
  }

  const labelStyles = {
    fontSize: '10px',
    px: '3px',
    width: '30px',
    textAlign: 'center',
    border: '1px solid black', 
    borderRadius: '4px', 
    backgroundColor: 'white'
  }

  let mod = score - 10
  mod = mod >= 0 ? Math.floor(mod / 2) : Math.round(mod / 2)
  return (
    <Box sx={{ height: 'calc(.5in + 7px)' }}>
      <Box sx={outerBoxStyles}>
        <Grid container sx={{ width: '100%' }}>
          <Grid xs={6}>
            <Box sx={innerBoxStyles}>
              <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
                <Box sx={{ fontSize: '18px' }}>{score}</Box>
                <Box sx={labelStyles}>{label}</Box>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box sx={innerBoxStyles}>
              <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
                <Box sx={{ fontSize: '18px' }}>{score > 11 && '+'}{score && mod}</Box>
                <Box sx={labelStyles}>MOD</Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default AbilityScore