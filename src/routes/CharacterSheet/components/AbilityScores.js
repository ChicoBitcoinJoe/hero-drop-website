import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'

import Clickable from '../../../components/Clickable'

function AbilityScore({ label, ability }) {
  const { score, modifier, die } = ability
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
  
  return (
    <Box sx={outerBoxStyles}>
      <Grid container spacing={.5}>
        <Grid xs={12}>
          <Box sx={innerBoxStyles}>
            <Box sx={bigLabelStyles}>{label}</Box>
            <Grid container alignItems="end" justifyContent="center" sx={{ pt: 0.6 }}>
              <Grid xs={6} sx={{ textAlign: 'center' }}>
                <ShieldOutlinedIcon sx={{ fontSize: '20px' }} />
              </Grid>
              <Grid xs={6} sx={{ fontSize: '18px', textAlign: 'center' }}>
                {score}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box sx={innerBoxStyles}>
            <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
              <Box sx={{ fontSize: '12px' }}>{score > 11 && '+'}{score && modifier}</Box>
              <Box sx={labelStyles}>MOD</Box>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box sx={innerBoxStyles}>
            <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
              <Box sx={{ fontSize: '12px' }}>{die}</Box>
              <Box sx={labelStyles}>DIE</Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

function AbilityScoreModifier({ label, ability, state, onClick }){
  const [ modifier, setModifier] = React.useState(state)

  const add = () => {
    const newModifier = Number(modifier) + 1
    setModifier(newModifier)
    onClick({
      [ability]: newModifier
    })
  }

  const subtract = () => {
    const newModifier = Number(modifier) - 1
    setModifier(newModifier)
    onClick({
      [ability]: newModifier
    })
  }

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

  return <Grid container justifyContent="center">
    <Grid xs="auto" pr={2}>
      <IconButton onClick={subtract}>
        <ArrowBackIosNewIcon sx={{ color: "#000" }} />
      </IconButton>
    </Grid>
    <Box sx={{ height: 'calc(.5in + 7px)' }}>
      <Box sx={outerBoxStyles}>
        <Box sx={innerBoxStyles}>
          <Grid container alignItems="end" justifyContent="center" sx={{ height: '.5in' }}>
            <Box sx={{ fontSize: '18px' }}>{modifier > 0 && '+'}{modifier || '0'}</Box>
            <Box sx={labelStyles}>{label}</Box>
          </Grid>
        </Box>
      </Box>
    </Box>
    <Grid xs="auto" pl={2}>
      <IconButton onClick={add}>
        <ArrowForwardIosIcon sx={{ color: "#000" }} />
      </IconButton>
    </Grid>
  </Grid>
}

function EditDialog({ character, submit, close }) {
  const [ state, setState ] = React.useState({
    ...character.abilityScoreChanges || {}
  })

  const onClick = (data) => {
    setState({
       ...state,
       ...data
    })
  }

  const onSubmit = () => {
    submit({
      ...state
    })
  }

  return <Box p={2} sx={{ maxWidth: 560 }}>
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography variant="h5" sx={{ textAlign: 'center', pb: 2 }}>Ability Score Changes</Typography>
      </Grid>
      
      <Grid xs={4}>
        <AbilityScoreModifier label={'DEX'} ability="dexterity" state={state.dexterity} onClick={onClick} />
      </Grid>
      <Grid xs={4}>
        <AbilityScoreModifier label={'STR'} ability="strength" state={state.strength} onClick={onClick} />
      </Grid>
      <Grid xs={4}>
        <AbilityScoreModifier label={'CON'} ability="constitution" state={state.constitution} onClick={onClick} />
      </Grid>
      <Grid xs={4}>
        <AbilityScoreModifier label={'INT'} ability="intelligence" state={state.intelligence} onClick={onClick} />
      </Grid>
      <Grid xs={4}>
        <AbilityScoreModifier label={'WIS'} ability="wisdom" state={state.wisdom} onClick={onClick} />
      </Grid>
      <Grid xs={4}>
        <AbilityScoreModifier label={'CHA'} ability="charisma" state={state.charisma} onClick={onClick} />
      </Grid>

      <Grid xs={12} />

      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={close}>cancel</Button>
      </Grid>
      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onSubmit}>Continue</Button>
      </Grid>
    </Grid>
  </Box>
}

export default function AbilityScores({ character }) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const openDialog = () => {
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }
  
  const submit = (data) => {
    closeDialog()
    if(!data) return
    
    character.updateMany([
      ['abilityScoreChanges', data]
    ])
  }

  return <>
    <Dialog onClose={closeDialog} open={dialogOpen}>
      <EditDialog character={character} submit={submit} close={closeDialog} />
    </Dialog>
    <Clickable onClick={openDialog}>
      <Grid container spacing={.5}>
        <Grid xs={4}>
          <AbilityScore label="DEX" 
            ability={character.proficiencies.length > 0 && character.dexterity}
          />
        </Grid>
        <Grid xs={4} pb={1}>
          <AbilityScore label="STR" 
            ability={character.proficiencies.length > 0 && character.strength}
          />
        </Grid>
        <Grid xs={4}>
          <AbilityScore label="CON" 
            ability={character.proficiencies.length > 0 && character.constitution}
          />
        </Grid>
        <Grid xs={4}>
          <AbilityScore label="INT" 
            ability={character.proficiencies.length > 0 && character.intelligence}
          />
        </Grid>
        <Grid xs={4}>
          <AbilityScore label="WIS" 
            ability={character.proficiencies.length > 0 && character.wisdom}
          />
        </Grid>
        <Grid xs={4}>
          <AbilityScore label="CHA" 
            ability={character.proficiencies.length > 0 && character.charisma}
          />
        </Grid>
      </Grid>
    </Clickable>
  </>
}