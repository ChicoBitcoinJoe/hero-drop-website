import * as React from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import { Divider, FormControlLabel } from '@mui/material'

import { getCurrentNaturals, getMaxNaturals, getSpecializationScore } from '../../../hooks/useCharacter'
import { useObject } from '../../../hooks/useObject'

export function TraitButton({ children, initialState, years, onChange }) {

  const [state, setState] = React.useState(initialState || 'none')
  const isNotTrait = state === 'none'
  const isHalfTrait = state === 'half'
  const isFullTrait = state === 'full'

  React.useEffect(() => {
    // console.log(state)
  }, [state])

  function onClick() {
    if(isNotTrait) {
      setState('half')
      onChange('half')
    }
    else if(isHalfTrait) {
      setState('full')
      onChange('full')
    }
    else if(isFullTrait) {
      setState('none')
      onChange('')
    }
  }

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

  const calculatedYears = isFullTrait  ? years : isHalfTrait ? Math.round(years / 2) : 0
  return <>
    <ButtonBase sx={buttonStyles} onClick={onClick}>
      <Grid container sx={{ width: '100%' }} justifyContent="left">
        <Grid xs={6} sx={leftStyles}>
          {children}
        </Grid>
        <Grid xs={6} container sx={rightStyles} justifyContent="end">
          {/* {calculatedYears > 0 && '+'}{calculatedYears} years */}
          { isNotTrait ? '' : isFullTrait ? 'Full' : 'Half' }
        </Grid>
      </Grid>
    </ButtonBase>
  </>
}

export default function SpecializationDialog({ character, initialState, submit, close, remove }) {
  // console.log({ initialState, submit, close })
  const { state, updateState, updateDeepState } = useObject(initialState || {
    name: '',
    natural: false,
    training: {
      years: 0,
      bonus: 0,
    },
    traits: {}
  })

  const trainedYears = Number(state.training.years) + Number(state.training.bonus)
  const score = getSpecializationScore(trainedYears) + (state.natural ? 1 : 0)
  
  const onClick = () => {
    console.log(state)
    submit(state)
  }

  const onTraitChange = (trait, value) => {
    updateDeepState('traits', trait, value)
  }

  const max = getMaxNaturals(character)
  let current = getCurrentNaturals(character.specializations)
  if(initialState) {
    if(initialState.natural) { 
      if(!state.natural) current -= 1
    }
    if(!initialState.natural && state.natural) { 
      current += 1
    }
  }

  //+ (state.natural && !initialState['natural'] && 1) - (!state.natural && initialState['natural'] && 1) 
  // const disabled = current === max && !override
  const removeSpecialization = () => {
    remove()
    close()
  }
  
  return <>
    <Grid container spacing={2} sx={{ maxWidth: '360px' }}>
      <Grid xs={12}>
        <TextField fullWidth
          label="Specialization Name" 
          value={state.name} 
          onChange={event => updateState('name', event.target.value)}
        />
      </Grid>
      <Grid xs={6}>
        <TextField fullWidth
          label="Years" 
          value={state.training.years} 
          onChange={event => updateDeepState('training', 'years', event.target.value)}
        />
      </Grid>
      <Grid xs={6}>
        <TextField fullWidth
          label="Bonus Years" 
          value={state.training.bonus} 
          onChange={event => updateDeepState('training', 'bonus', event.target.value)}
        />
      </Grid>
      <Grid xs={12} container>
        <Grid xs={6} container justifyContent="center" alignItems="center">
          <FormControlLabel 
            control={<Checkbox checked={state.natural} 
            onChange={(event) => updateState('natural', event.target.checked)} />} 
            label={'Natural ('+ current + '/' + max + ')'} 
          />
        </Grid>
        <Grid xs={6} container justifyContent="center" alignItems="center">
          <Typography sx={{ fontWeight: 'bold' }}>Score: {score !== 0 && '+'}{score}</Typography>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Divider textAlign='left'>Abilities</Divider>
      </Grid>
      <Grid xs={6}>
        <TraitButton 
          initialState={state.traits['CON']} 
          years={trainedYears} 
          onChange={(value) => onTraitChange('CON', value)}
        >
          Constitution
        </TraitButton>
      </Grid>
      <Grid xs={6}>
        <TraitButton 
          initialState={state.traits['INT']} 
          years={trainedYears} 
          onChange={(value) => onTraitChange('INT', value)}
        >
          Intelligence
        </TraitButton>
      </Grid>
      <Grid xs={6}>
        <TraitButton 
          initialState={state.traits['DEX']} 
          years={trainedYears} 
          onChange={(value) => onTraitChange('DEX', value)}
        >
          Dexterity
        </TraitButton>
      </Grid>
      <Grid xs={6}>
        <TraitButton 
          initialState={state.traits['WIS']} 
          years={trainedYears} 
          onChange={(value) => onTraitChange('WIS', value)}
        >
          Wisdom
        </TraitButton>
      </Grid>
      <Grid xs={6}>
        <TraitButton 
          initialState={state.traits['STR']} 
          years={trainedYears} 
          onChange={(value) => onTraitChange('STR', value)}
        >
          Strength
        </TraitButton>
      </Grid>
      <Grid xs={6}>
        <TraitButton 
          initialState={state.traits['CHA']} 
          years={trainedYears} 
          onChange={(value) => onTraitChange('CHA', value)}
        >
          Charisma
        </TraitButton>
      </Grid>
      <Grid xs={12}>
        <Divider textAlign='left'>Other</Divider>
      </Grid>
      <Grid xs={6}>
        <TraitButton 
          initialState={state.traits['LTH']} 
          years={trainedYears} 
          onChange={(value) => onTraitChange('LTH', value)}
        >
          Lethality
        </TraitButton>
      </Grid>
      <Grid xs={6}>
        <TraitButton 
          initialState={state.traits['SPL']} 
          years={trainedYears} 
          onChange={(value) => onTraitChange('SPL', value)}
        >
          Spellcasting
        </TraitButton>
      </Grid>
      <Grid xs={6}>
        <TraitButton 
          initialState={state.traits['WLTH']} 
          years={trainedYears} 
          onChange={(value) => onTraitChange('WLTH', value)}
        >
          Wealth
        </TraitButton>
      </Grid>
      <Grid xs={12} container>
        <Grid xs={4} sx={{ display: !initialState && 'none' }}>
          <Button fullWidth color="warning" variant="outlined" sx={{ py: 2 }} onClick={removeSpecialization}>unlearn</Button>
        </Grid>
        <Grid xs={initialState ? 4 : 6}>
          <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={close}>cancel</Button>
        </Grid>
        <Grid xs={initialState ? 4 : 6}>
          <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onClick}>Continue</Button>
        </Grid>
      </Grid>
    </Grid>
  </>
}