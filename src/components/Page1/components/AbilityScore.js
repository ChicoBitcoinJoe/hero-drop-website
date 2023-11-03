import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'

export function AbilityScore({ ability, score, dieFn }) {
  const outerBoxStyles = { 
    width: '.75in', 
    height: '.75in',
    borderRadius: '4px', // '.25in',
    border: '1px solid black',
    p: '2px',
  }
  
  const innerBoxStyles = { 
    // width: '46px', 
    height: 'calc(.75in / 2 - 5px)',
    borderRadius: '4px', // '.25in',
    border: '1px dotted black',
    position: 'relative'
  }

  const bigLabelStyles = {
    fontSize: '10px', 
    width: '32px', 
    position: 'absolute', 
    top: -10,
    right: 15.5,
    border: '1px solid black', 
    borderRadius: '4px', 
    backgroundColor: 'white',
    textAlign: 'center',
  }

  const labelStyles = {
    fontSize: '8px',
    width: '36px',
    textAlign: 'center',
    pb: '18px',
  }

  let mod = score - 10
  mod = mod >= 0 ? Math.floor(mod / 2) : Math.round(mod / 2)
  const die = dieFn && dieFn(mod)
  
  return (
    <Box sx={outerBoxStyles}>
      <Grid container spacing={.5}>
        <Grid xs={12}>
          <Box sx={innerBoxStyles}>
            <Box sx={bigLabelStyles}>{ability}</Box>
            <Grid container alignItems="end" justifyContent="center" sx={{ pt: 0.6 }}>
              <Grid xs={5.5} pl={.5}>
                <ShieldOutlinedIcon sx={{ fontSize: '20px' }} />
              </Grid>
              <Grid xs={6.5} sx={{ fontSize: '18px' }}>
                {score}
              </Grid>
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
        <Grid xs={6}>
          <Box sx={innerBoxStyles}>
            <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
              <Box sx={{ fontSize: '14px' }}>{die}</Box>
              <Box sx={labelStyles}>DIE</Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

// export function AbilityScore({ ability, score, dieFn }) {
//   const outerBoxStyles = { 
//     width: '148px', 
//     height: '.5in',
//     borderRadius: '4px', // '.25in',
//     border: '1px solid black',
//     p: '2px',
//   }
  
//   const innerBoxStyles = { 
//     width: '46px', 
//     height: 'calc(.5in - 6px)',
//     borderRadius: '4px', // '.25in',
//     border: '1px dotted black',
//     pt: '3px'
//   }

//   const labelStyles = {
//     fontSize: '10px',
//     width: '36px',    
//     textAlign: 'center',
//     border: '1px solid black', 
//     borderRadius: '4px', 
//     backgroundColor: 'white'
//   }

//   let mod = score - 10
//   mod = mod >= 0 ? Math.floor(mod / 2) : Math.round(mod / 2)
//   const die = dieFn && dieFn(mod)
  
//   return (
//     <Box sx={{ height: 'calc(.5in + 5px)' }}>
//       <Box sx={outerBoxStyles}>
//         <Grid container sx={{ width: '100%' }}>
//           <Grid xs={4}>
//             <Box sx={innerBoxStyles}>
//               <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
//                 <Box sx={{ fontSize: '18px' }}>{score}</Box>
//                 <Box sx={labelStyles}>{ability}</Box>
//               </Grid>
//             </Box>
//           </Grid>
//           <Grid xs={4}>
//             <Box sx={innerBoxStyles}>
//               <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
//                 <Box sx={{ fontSize: '18px' }}>{score > 11 && '+'}{score && mod}</Box>
//                 <Box sx={labelStyles}>MOD</Box>
//               </Grid>
//             </Box>
//           </Grid>
//           <Grid xs={4}>
//             <Box sx={innerBoxStyles}>
//               <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
//                 <Box sx={{ fontSize: '14px' }}>{die}</Box>
//                 <Box sx={labelStyles}>DIE</Box>
//               </Grid>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   )
// }

export default AbilityScore