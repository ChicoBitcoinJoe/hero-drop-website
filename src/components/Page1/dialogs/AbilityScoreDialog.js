import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

// import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'

function AbilityScore({ label, score }) {

  const outerBoxStyles = { 
    width: '0.5in', 
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
        <Box sx={innerBoxStyles}>
          <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
            <Box sx={{ fontSize: '18px' }}>{score>0 && '+'}{score || '0'}</Box>
            <Box sx={labelStyles}>{label}</Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

function Modifier({ label, state, onClick }){
  const [ modifier, setModifier] = React.useState(state[label])

  const add = () => {
    const newModifier = Number(modifier) + 1
    setModifier(newModifier)
    onClick({
      [label]: newModifier
    })
  }

  const subtract = () => {
    const newModifier = Number(modifier) - 1
    setModifier(newModifier)
    onClick({
      [label]: newModifier
    })
  }

  return <>
    <Grid xs="auto" pr={2}>
      <IconButton onClick={subtract}>
        <ArrowBackIosNewIcon sx={{ color: "#000" }} />
      </IconButton>
    </Grid>
    <AbilityScore label={label} score={state[label]} />
    <Grid xs="auto" pl={2}>
      <IconButton onClick={add}>
        <ArrowForwardIosIcon sx={{ color: "#000" }} />
      </IconButton>
    </Grid>
  </>
}

export default function AbilityScores({ character, submit, close }) {
  const [ state, setState ] = React.useState({
    ...character.abilityScoreChanges || {}
  })

  const onClick = (data) => {
    setState({
       ...state,
       ...data
    })
  }

  const onClose = () => {
    submit({
      ...state
    })
  }

  return <>
    <Grid container spacing={2} sx={{ maxWidth: '420px' }}>
      <Grid xs={12}>
        <Typography variant="h5" sx={{ textAlign: 'center', pb: 2 }}>Ability Score Changes</Typography>
      </Grid>
      
      <Grid container spacing={1} sx={{ height: '420px' }}>
      <Grid xs={6} container justifyContent="center">
          <Modifier label={'STR'} state={state} onClick={onClick} />
        </Grid>
        <Grid xs={6} container justifyContent="center">
          <Modifier label={'INT'} state={state} onClick={onClick} />
        </Grid>
        <Grid xs={6} container justifyContent="center">
          <Modifier label={'DEX'} state={state} onClick={onClick} />
        </Grid>
        <Grid xs={6} container justifyContent="center">
          <Modifier label={'WIS'} state={state} onClick={onClick} />
        </Grid>
        <Grid xs={6} container justifyContent="center">
          <Modifier label={'CON'} state={state} onClick={onClick} />
        </Grid>
        <Grid xs={6} container justifyContent="center">
          <Modifier label={'CHA'} state={state} onClick={onClick} />
        </Grid>
        <Grid xs={12}>
          <Divider textAlign="left">Other</Divider>
        </Grid>
        <Grid xs={6} container justifyContent="center">
          <Modifier label={'WLT'} state={state} onClick={onClick} />
        </Grid>
      </Grid>

      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={close}>cancel</Button>
      </Grid>
      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onClose}>Continue</Button>
      </Grid>
    </Grid>
  </>
}