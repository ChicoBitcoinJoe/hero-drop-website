import * as React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

import { getSpecializationScore } from '../../../hooks/useCharacter'
import Clickable from '../../Clickable'

export function TraitButton({ children, initialState, years, onChange }) {
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

export function Specialization({ specialization, score }) {
  const { name, training, traits, natural } = specialization
  // console.log({ name, training, score, traits, natural })

  const keys = Object.keys(traits)
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
  
  return (
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
              Object.keys(traits).map((key) => {
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
              Object.keys(traits).map((key) => {
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
  )
}

export default function Specializations({ character, handleDialogOpen }) {
  
  const alignStart = {
    display: 'flex !important',
    alignItems: 'flex-start !important',
  }

  return <>
    <Box sx={{ width: '100%' }} >
      {
        //Array(character.totalSpecializations).fill(null).map((_, i) => i+1).map((index) => {
        character.specializations.map((specialization, index) => {
          const { natural, training } = specialization
          const score = getSpecializationScore(Number(training.years) + Number(training.bonus), natural)
          return <React.Fragment key={index}>
            <Clickable square sx={{ p: 0.5, ...alignStart }} onClick={(event) => handleDialogOpen('Specializations', event, index)}>
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