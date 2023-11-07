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

import { getCurrentNaturals, getMaxNaturals, getAbilityModifier } from '../../hooks/useCharacter'
import { useObject } from '../../hooks/useObject'
import Clickable from '../Clickable'

function TraitButton({ children, initialState, years, onChange }) {
  console.log(years)
  const [state, setState] = React.useState(initialState || 'none')
  const isNotTrait = state === 'none'
  const isHalfTrait = state === 'half'
  const isFullTrait = state === 'full'

  React.useEffect(() => {
    console.log(state)
  }, [state])

  function onClick() {
    if(isNotTrait) {
      setState('half')
      onChange(children, 'half')
    }
    else if(isHalfTrait) {
      setState('full')
      onChange(children, 'full')
    }
    else if(isFullTrait) {
      setState('none')
      onChange(children, '')
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
          {calculatedYears > 0 && '+'}{calculatedYears} years
        </Grid>
      </Grid>
    </ButtonBase>
  </>
}

// function TraitButton({ children, initialState, years, onChange }) {

//   const [state, setState] = React.useState(initialState || 'none')
//   const isNotTrait = state === 'none'
//   const isHalfTrait = state === 'half'
//   const isFullTrait = state === 'full'

//   React.useEffect(() => {
//     // console.log(state)
//   }, [state])

//   function onClick() {
//     if(isNotTrait) {
//       setState('half')
//       onChange('half')
//     }
//     else if(isHalfTrait) {
//       setState('full')
//       onChange('full')
//     }
//     else if(isFullTrait) {
//       setState('none')
//       onChange('')
//     }
//   }

//   const buttonStyles = { 
//     width: '100%', 
//     textAlign: 'left', 
//     fontSize: '12px',
//     border: '1px solid black',
//     borderRadius: '4px',
//     overflow: 'hidden'
//   }

//   const leftStyles = { 
//     backgroundColor: (isHalfTrait || isFullTrait) && 'black',
//     color: (isHalfTrait || isFullTrait) && 'white',
//     p: 1,
//   }
  
//   const rightStyles = { 
//     backgroundColor: (isFullTrait) && 'black',
//     color: (isFullTrait) && 'white',
//     p: 1,
//   }

//   const calculatedYears = isFullTrait  ? years : isHalfTrait ? Math.round(years / 2) : 0
//   return <>
//     <ButtonBase sx={buttonStyles} onClick={onClick}>
//       <Grid container sx={{ width: '100%' }} justifyContent="left">
//         <Grid xs={6} sx={leftStyles}>
//           {children}
//         </Grid>
//         <Grid xs={6} container sx={rightStyles} justifyContent="end">
//           {/* {calculatedYears > 0 && '+'}{calculatedYears} years */}
//           { isNotTrait ? '' : isFullTrait ? 'Full' : 'Half' }
//         </Grid>
//       </Grid>
//     </ButtonBase>
//   </>
// }

function EditDialog({ character, initialState, submit, close, remove }) {
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
  const score = getAbilityModifier(trainedYears) + (state.natural ? 1 : 0)
  
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

export function Specialization({ specialization, score }) {
  const { name, training, traits, natural } = specialization
  // console.log({ name, training, score, traits, natural })

  const keys = Object.keys(training)
  let noFullTraits = true
  let noHalfTraits = true
  keys.forEach((key) => {
    if(traits[key] === 'full') noFullTraits = false
    if(traits[key] === 'half') noHalfTraits = false
  })

  const scoreStyles = { 
    width: '28px', 
    fontSize: '12px', 
    fontWeight: 'bold', 
    border: natural ? '1px dotted black' : '1px solid white', 
    p: .75, 
    borderRadius: '6px', 
    textAlign: 'center' 
  }
  
  return <>
    <Grid container xs={12} sx={{ fontSize: '9px' }}>
      <Grid xs="auto" pr={0.5} container justifyContent="center" alignItems="center">
        <Box sx={scoreStyles}>
          {score > 0 && '+'}{score}
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
              Object.keys(training).map((key) => {
                const traitType = traits[key]
                if(traitType === 'full') {
                  return <>
                    {key}&nbsp;
                  </>
                }

                return null
              })
            }
            <Box component="span" sx={{ display: noHalfTraits && 'none'}}>&nbsp;&nbsp;&nbsp;</Box>
          </Grid>
          <Grid xs="auto" sx={{ display: noHalfTraits && 'none'}}>
            <Box component="span">(Half)&nbsp;</Box>
            {
              Object.keys(training).map((key) => {
                const traitType = traits[key]
                if(traitType === 'half') {
                  return <>
                    {key}&nbsp;
                  </>
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

export default function Specializations({ character, handleDialogOpen }) {
  const [clickedIndex, setClickedIndex] = React.useState(null)
  const [initialState, setInitialState] = React.useState(null)
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
      ['inspiration', data]
    ])
  }

  const remove = () => {
    let newSpecializations = [...character.specializations]
    newSpecializations.splice(clickedIndex, 1)
    character.updateMany([
      ['specializations', newSpecializations]
    ])
  }

  const alignStart = {
    display: 'flex !important',
    alignItems: 'flex-start !important',
  }

  const emptySpecializations = new Array(10 - character.specializations.length).fill({
    name: '',
    score: '',
    natural: false,
    training: {
    // dexterity: 'full',
    // constitution: 'half',
    }
  })

  return <>
    <Dialog onClose={closeDialog} open={dialogOpen}>
      <Box p={2}>
        <EditDialog character={character} initialState={initialState} close={closeDialog} remove={remove} />
      </Box>
    </Dialog>
    <Box sx={{ width: '100%' }} >
      {
        //Array(character.totalSpecializations).fill(null).map((_, i) => i+1).map((index) => {
        character.specializations.map((specialization, index) => {
          const { natural, training } = specialization
          const score = getAbilityModifier(Number(training.years) + Number(training.bonus), natural)
          return <React.Fragment key={index}>
            <Clickable square sx={{ p: 0.5, ...alignStart }} onClick={openDialog}>
              <Specialization specialization={specialization} score={score} />
            </Clickable>
          </React.Fragment>
        })
      }
      {
        emptySpecializations.map((specialization, index) => {
          const { natural, training } = specialization
          const score = getAbilityModifier(Number(training.years) + Number(training.bonus), natural)
          return <React.Fragment key={index}>
            <Clickable square sx={{ p: 0.5, ...alignStart }} onClick={openDialog}>
              <Specialization specialization={specialization} score={score} />
            </Clickable>
          </React.Fragment>
        })
      }
      
      <Box displayPrint="none" sx={{ display: character.specializations.length === 14 && 'none' }}>
        <Grid container>
          <Grid xs={12}>
            <Clickable square 
              sx={{ p: 1, ...alignStart, textAlign: 'center' }} 
              onClick={(event) => handleDialogOpen('Specializations', event, 'new')}
            >
              <Typography sx={{ fontSize: '11px' }}>
                + add specialization 
                {/* ({ character.specializations.length + '/' + maxSpecializations }) */}
              </Typography>
            </Clickable>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </>
}