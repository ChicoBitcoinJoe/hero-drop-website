import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import { utils } from "../hooks/useCharacterManager"

function TraitButton({ children, initialState, score, onChange }) {
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
    borderRadius: '16px',
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
    <Grid xs={12}>
      <ButtonBase sx={buttonStyles} onClick={onClick}>
        <Grid container sx={{ width: '100%' }} >
          <Grid xs={6} sx={leftStyles}>
            {children}
          </Grid>
          <Grid container xs={6} justifyContent={'end'} sx={rightStyles}>
            {state} { state !== 'none' && <>trait&nbsp;</>} 
            { state !== 'none' && '(' + (state === 'full' ? score : Math.round(score / 2)) + ")"}
          </Grid>
        </Grid>
      </ButtonBase>
    </Grid>
  </>
}

function Traits({ traits, specializationScore, onChange }) {
  console.log(traits)
  return <>
    <Grid container xs={12} sx={{ fontSize: '12px' }}>
      <Grid xs={12} sm={4}>
        <Divider textAlign="left"><b>Primary Traits</b></Divider>
        <Grid container spacing={0.5}>
          {
            utils.traits.map((trait, index) => {
              return <Grid xs={12} key={index}>
                <TraitButton 
                  initialState={traits[trait] || 'none'} 
                  score={specializationScore}
                  onChange={onChange}
                >
                  {trait}
                </TraitButton>
              </Grid>
            })
          }
        </Grid>
      </Grid>
      <Grid xs={12} sm={4}>
        <Divider textAlign="left">Schools of Magic</Divider>
        <Grid container spacing={0.5}>
          {
            utils.schools.map((trait, index) => {
              return <Grid xs={12} key={index}>
                <TraitButton 
                  initialState={traits[trait] || 'none'} 
                  score={specializationScore}
                  onChange={onChange}
                >
                  {trait}
                </TraitButton>
              </Grid>
            })
          }
        </Grid>
      </Grid>
      <Grid xs={12} sm={4}>
        <Divider textAlign="left">Damage Reduction</Divider>
        <Grid container spacing={0.5}>
          {
            utils.damageTypes.map((trait, index) => {
              return <Grid xs={12} key={index}>
                <TraitButton 
                  initialState={traits[trait] || 'none'} 
                  score={specializationScore}
                  onChange={onChange}
                >
                  {trait}
                </TraitButton>
              </Grid>
            })
          }
        </Grid>
      </Grid>
    </Grid>
  </>
}

export default function TraitSelector({ open, closeDialog, handleSubmit, initialData, naturalSpecializations }) {
  const [specializationName, setSpecializationName] = React.useState(initialData ? initialData.specializationName : '')
  const [specializationYears, setSpecializationYears] = React.useState(initialData ? initialData.specializationYears : '0')
  const [specializationBonusYears, setSpecializationBonusYears] = React.useState(initialData && (initialData.specializationBonusYears || '0'))
  const [isNatural, setIsNatural] = React.useState(initialData ? initialData.isNatural : false)
  const [traits, setTraits] = React.useState(initialData ? initialData.traits : {})
  
  let currentIsNatural = initialData ? ( (isNatural && !initialData['isNatural']) && 1 ) || ( (!isNatural && (initialData['isNatural'] || false)) && 1 ) : 0
  const totalYears = Number(specializationYears) + Number(specializationBonusYears)
  const specializationScore = utils.getSpecializationScore(totalYears, isNatural)
  const currentNaturalSpecializations = naturalSpecializations.current + currentIsNatural
  const valid = specializationName && (specializationYears > 0) && (currentNaturalSpecializations <= naturalSpecializations.max)

  const handleAddSpecialization = () => {
    handleSubmit({
      specializationName,
      specializationYears,
      specializationBonusYears,
      isNatural,
      traits
    })
  }

  const onTraitChange = (id, value) => {
    let updatedTraits = {...traits}
    updatedTraits[id] = value
    setTraits(updatedTraits)
  }

  return <>
    <Dialog open={open} onClose={closeDialog}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid xs={12} sm>
            <TextField fullWidth 
              label={'Specialization'}
              value={specializationName || ''}
              onChange={(event) => setSpecializationName(event.target.value)}
              helperText={"Score: " + specializationScore}
            />
          </Grid>
          <Grid sx={{ width: '84px' }}>
            <TextField fullWidth
              label={"Years"}
              value={specializationYears || ''} 
              onChange={(event) => setSpecializationYears(event.target.value)}
            />
          </Grid>
          <Grid sx={{ width: '110px' }}>
            <TextField fullWidth
              label={"Bonus Years"}
              value={specializationBonusYears || '0'} 
              onChange={(event) => setSpecializationBonusYears(event.target.value)}
            />
          </Grid>
          <Grid xs={12} sx={{ pt: 0 }}>
            <FormControlLabel
              control={<Checkbox checked={isNatural} sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} onChange={event => setIsNatural(event.target.checked)} />}
              label={
                <div style={{ fontSize: '14px'}}>
                  {"Natural (" + currentNaturalSpecializations + "/" + naturalSpecializations.max + ")"}
                </div>
              }
            />
          </Grid>
          <Grid container xs={12}>
            <Traits traits={traits} specializationScore={specializationScore} onChange={onTraitChange}  />
          </Grid>
          <Grid xs={12} container spacing={2}>
            <Grid xs={4}>
              <Button size="large" variant="outlined" fullWidth onClick={closeDialog}>Cancel</Button>
            </Grid>
            <Grid xs={8}>
              <Button size="large" 
                variant="outlined" 
                fullWidth 
                onClick={handleAddSpecialization}
                disabled={!valid}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  </>
}