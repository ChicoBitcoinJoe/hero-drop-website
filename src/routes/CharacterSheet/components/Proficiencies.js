import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { useObject } from '../../../hooks/useObject'
import Clickable from '../../../components/Clickable'

function TraitButton({ label, state, onClick }) {
  const isHalfTrait = state === 'half'
  const isFullTrait = state === 'full'

  const buttonStyles = { 
    width: '100%', 
    textAlign: 'left', 
    fontSize: '12px',
    border: '1px solid black',
    borderRadius: '4px',
    overflow: 'hidden'
  }

  const leftStyles = { 
    backgroundColor: (isHalfTrait || isFullTrait) && 'black',
    color: (isHalfTrait || isFullTrait) && 'white',
    p: 1,
  }
  
  const rightStyles = { 
    backgroundColor: (isFullTrait) && 'black',
    color: (isFullTrait) && 'white',
    p: 1,
  }

  return <>
    <ButtonBase sx={buttonStyles} onClick={onClick}>
      <Grid container sx={{ width: '100%' }} justifyContent="left">
        <Grid xs={6} sx={leftStyles}>
          {label}
        </Grid>
        <Grid xs={6} container sx={rightStyles} justifyContent="end">
          { isFullTrait ? 'Full' : isHalfTrait ? 'Half' : ''}
        </Grid>
      </Grid>
    </ButtonBase>
  </>
}

function EditDialog({ character, index, close }) {
  const { state, updateState, updateDeepState } = useObject({
    name: '',
    expert: false,
    score: '',
    abilities: {
      dexterity: '',
      strength: '',
      constitution: '',
      intelligence: '',
      wisdom: '',
      charisma: '',
    },
    ...(index !== undefined ? character.proficiencies[index] : {})
  })
  
  const submit = () => {
    close()
    if(index === undefined) {
      character.update('proficiencies', [...character.proficiencies, state])
    }
    else {
      const newProficiencies = [...character.proficiencies]
      newProficiencies[index] = state
      character.update('proficiencies', newProficiencies)
    }
  }

  const remove = () => {
    let newProficiencies = [...character.proficiencies]
    newProficiencies.splice(index, 1)
    character.updateMany([
      ['proficiencies', newProficiencies]
    ])
  }

  const onClick = () => {
    console.log(state)
    submit(state)
  }

  const removeProficiency = () => {
    remove()
    close()
  }

  function toggleAbility(ability) {
    console.log({ state, ability })
    let value = state.abilities[ability]
    if(value === '')
      value = 'half'
    else if(value === 'half')
      value = 'full'
    else if(value === 'full')
      value = ''

    updateDeepState('abilities', ability, value)
  }
  
  return <>
    <Grid container spacing={2} sx={{ maxWidth: '520px' }}>
      <Grid xs={12}>
        <TextField fullWidth
          label="Proficiency Name" 
          value={state.name} 
          onChange={event => updateState('name', event.target.value)}
        />
      </Grid>
      <Grid xs={4} >
        <TextField fullWidth
          label="Score"
          type="number"
          value={state.score} 
          onChange={event => updateState('score', event.target.value)}
        />
      </Grid>
      <Grid xs={4} container justifyContent="center" alignItems="center">
        <FormControlLabel 
          control={<Checkbox checked={state.expert} 
          onChange={(event) => updateState('expert', event.target.checked)} />} 
          label={"Expert (+" + character.proficiencyBonus + ")"}
        />
      </Grid>
      <Grid xs={4}>
        {/* <Button fullWidth sx={{ p: 1.75 }} variant="outlined">Roll</Button> */}
      </Grid>
      <Grid xs={12}>
        <Divider textAlign='left'>Abilities</Divider>
      </Grid>
      <Grid xs={4}>
        <TraitButton label="Constitution" 
          state={state.abilities['constitution']}
          onClick={() => toggleAbility('constitution')}
        />
      </Grid>
      <Grid xs={4}>
        <TraitButton label="Intelligence" 
          state={state.abilities['intelligence']}
          onClick={() => toggleAbility('intelligence')}
        />
      </Grid>
      <Grid xs={4}>
        <TraitButton label="Dexterity" 
          state={state.abilities['dexterity']}
          onClick={() => toggleAbility('dexterity')}
        />
      </Grid>
      <Grid xs={4}>
        <TraitButton label="Wisdom" 
          state={state.abilities['wisdom']}
          onClick={() => toggleAbility('wisdom')}
        />
      </Grid>
      <Grid xs={4}>
        <TraitButton label="Strength" 
          state={state.abilities['strength']}
          onClick={() => toggleAbility('strength')}
        />
      </Grid>
      <Grid xs={4}>
        <TraitButton label="Charisma" 
          state={state.abilities['charisma']}
          onClick={() => toggleAbility('charisma')}
        />
      </Grid>
      <Grid xs={12} container>
        {/* <Grid xs={4} sx={{ display: index === undefined && 'none' }}>
          <Button fullWidth color="warning" variant="outlined" sx={{ py: 2 }} onClick={removeProficiency}>unlearn</Button>
        </Grid> */}
        <Grid xs={index !== undefined ? 6 : 6}>
          <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={close}>cancel</Button>
        </Grid>
        <Grid xs={index !== undefined ? 6 : 6}>
          <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onClick}>Continue</Button>
        </Grid>
      </Grid>
    </Grid>
  </>
}

function Proficiency({ specialization, proficiencyBonus }) {
  const { name, score, expert, abilities } = specialization
  // console.log({ name, training, score, traits, expert })

  const keys = Object.keys(abilities)
  let noFullTraits = true
  let noHalfTraits = true
  keys.forEach((key) => {
    if(abilities[key] === 'full') noFullTraits = false
    if(abilities[key] === 'half') noHalfTraits = false
  })

  const scoreStyles = { 
    width: '28px', 
    fontSize: '12px', 
    fontWeight: 'bold', 
    border: '1px solid black', 
    borderRadius: '6px',
    textAlign: 'center',
    py: 0.75, 
  }

  function ExpertCircle(){
    return (
      <Box sx={{ 
        position: 'absolute', 
        top: -3, 
        left: -3,
        zIndex: 2,
        backgroundColor: expert ? 'grey' : 'white', 
        border: '1px solid black',
        borderRadius: 12,
        width: 12, 
        height: 12,
      }} />
    )
  }

  const fullScore = Number(score) + (expert ? Number(proficiencyBonus) : 0)
  
  return <>
    <Grid container xs={12} sx={{ py: .11, fontSize: '9px', position: 'relative' }}>
      <ExpertCircle />
      <Grid xs="auto" pr={0.5} container justifyContent="center" alignItems="center">
        <Box sx={scoreStyles}>
          {fullScore > 0 && '+'}{fullScore || <>&nbsp;</>}
        </Box>
      </Grid>
      <Grid xs container>
        <Grid xs={12} sx={{ fontWeight: 'bold' }}>
          {name}
        </Grid>
        <Grid xs={12} sx={{ pt: .25, display: noFullTraits && noHalfTraits && 'none' }} container>
          <Grid xs={"auto"} sx={{ display: noFullTraits && 'none'}}>
            <Box component="span">(Full)&nbsp;</Box>
            {
              Object.keys(abilities).map((key) => {
                const ability = abilities[key]
                if(ability === 'full') {
                  return <span key={key}>
                    {key.slice(0,3).toUpperCase()}&nbsp;
                  </span>
                }

                return null
              })
            }
            <Box component="span" sx={{ display: noHalfTraits && 'none'}}>&nbsp;&nbsp;&nbsp;</Box>
          </Grid>
          <Grid xs="auto" sx={{ display: noHalfTraits && 'none'}}>
            <Box component="span">(Half)&nbsp;</Box>
            {
              Object.keys(abilities).map((key) => {
                const ability = abilities[key]
                if(ability === 'half') {
                  return <span key={key}>
                    {key.slice(0,3).toUpperCase()}&nbsp;
                  </span>
                }

                return null
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
}

export default function Proficiencies({ character }) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [clickedIndex, setIndex] = React.useState()

  const openDialog = (newIndex) => {
    setIndex(newIndex)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const alignStart = {
    display: 'flex !important',
    alignItems: 'flex-start !important',
  }

  return <>
    <Dialog onClose={closeDialog} open={dialogOpen}>
      <Box p={2}>
        <EditDialog character={character} index={clickedIndex} close={closeDialog} />
      </Box>
    </Dialog>
    <Box sx={{ width: '100%' }}>
      {
        character.proficiencies.map((specialization, index) => {
          return <React.Fragment key={index}>
            <Clickable square 
              sx={{ p: 0.6, display: 'flex !important', alignItems: 'flex-start !important' }} 
              onClick={() => openDialog(index)}
            >
              <Proficiency specialization={specialization} proficiencyBonus={character.proficiencyBonus}/>
            </Clickable>
          </React.Fragment>
        })
      }
      <Box displayPrint="none" sx={{ display: character.proficiencies.length === 11 && 'none' }}>
        <Grid container>
          <Grid xs={12}>
            <Clickable square 
              sx={{ p: 1, ...alignStart, textAlign: 'center' }} 
              onClick={() => openDialog()}
            >
              <Typography sx={{ fontSize: '11px' }}>
                + add proficiency 
                {/* ({ character.proficiencies.length + '/' + maxProficiencys }) */}
              </Typography>
            </Clickable>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </>
}