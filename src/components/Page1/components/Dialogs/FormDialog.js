import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2'
import CasinoIcon from '@mui/icons-material/Casino'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

import Score from './ScoreDialog'
import Clickable from '../../Clickable'
import { TextField, Typography } from '@mui/material'

import { getSizeFromWeight, rollDice, getAgeCategoryFromScore } from '../../../hooks/useCharacter'

function Die({ children, hideBorder, sx }) {
  return <>
    <Box sx={{ height: '0.4in', width: '0.4in', border: hideBorder || '1px solid black', borderRadius: '4px', ...sx }}>
      <Grid container alignItems={'center'} justifyContent={'center'} sx={{ height: '100%', fontSize: '18px' }}>
        {children}
      </Grid>
    </Box>
  </>
}

function useDie(min, max, defaultValue) {
  const [ value, setValue ] = React.useState(defaultValue)

  function roll() {
    setValue(rollDice(min,max))
  }

  if(defaultValue < min) return new Error('invalid default value')
  if(defaultValue > max) return new Error('invalid default value')

  return [
    value,
    roll,
    setValue
  ]
}

function FormScore({ label, value, subtract }) {
  return (
    <Grid container>
      <Grid xs={4} sm={12} sx={{ mt: 1, textAlign: 'center', p: 1, fontSize: '18px' }}>
        {label}
      </Grid> 
      <Grid container xs={8} sm={12} justifyContent="center" alignItems={'center'} sx={{ fontSize: '18px' }} >
        <Grid>
          <Die sx={{ color: 'white', backgroundColor: 'rgb(29,118,206)' }} hideBorder>
            {value}
          </Die>
        </Grid>
        <Grid xs={2} container justifyContent="center" alignItems="center" p={2}>{ subtract ? '-' : '+' }</Grid>
        <Grid>1</Grid>
        <Grid xs={2} container justifyContent="center" alignItems="center" p={2}>=</Grid>
        <Grid><Die>{subtract ? value - 1 : value + 1}</Die></Grid>
      </Grid>
    </Grid>
  )
}

export function FormDialog({ character, submit, close}) {
  const [ weight, setWeight ] = React.useState(character.form.weight || '')
  const [ die1, rollDie1, setDie1 ] = useDie(1,4,character.form.style ? character.form.style-1 : 1)
  const [ die2, rollDie2, setDie2 ] = useDie(1,4,character.form.peak ? character.form.peak+1 : 1)
  const [ die3, rollDie3, setDie3 ] = useDie(1,4,character.form.aptitude ? character.form.aptitude-1 : 1)

  const [numberOfRolls, setNumberofRolls] = React.useState(0)
  React.useEffect(() => {
    if(numberOfRolls > 0) {
      rollDie1()
      rollDie2()
      rollDie3()
      setNumberofRolls(numberOfRolls-1)
    }
  }, [numberOfRolls])

  function roll() {
    setNumberofRolls(32)
  }

  const onClick = () => {
    submit({
      style: die1+1,
      peak: die2-1,
      aptitude: die3+1,
      weight,
    })
  }

  function swapBeautyAndPeak() {
    
  }

  function swapPeakAndAptitude() {
    
  }

  return <>
    <Grid container>
      <Button fullWidth 
        variant="outlined" 
        sx={{ py: 4, mb: 2 }} 
        size="large" 
        startIcon={<CasinoIcon />}
        onClick={roll}
      >
        Roll 3d4
      </Button>
      <Grid xs={12} sm={4}>
        <FormScore label="Beauty" value={die1} />
      </Grid>
      <Grid xs={12} sm={4}>
        <FormScore label="Peak" value={die2} subtract />
      </Grid>
      <Grid xs={12} sm={4}>
        <FormScore label="Aptitude" value={die3} />
      </Grid>
      <Grid xs={3.55}></Grid>
      <Grid xs={4} sx={{ marginTop: '-94px', pl: 1,  }}>
        <IconButton 
          sx={{ height: '24px', width: '24px', backgroundColor: 'white' }}
          onClick={swapBeautyAndPeak}
        >
          <SwapHorizIcon />
        </IconButton>
      </Grid>
      <Grid xs={4} sx={{ marginTop: '-94px', pl: 1,  }}>
        <IconButton 
          sx={{ height: '24px', width: '24px', backgroundColor: 'white' }}
          onClick={swapPeakAndAptitude}
        >
          <SwapHorizIcon />
        </IconButton>
      </Grid>
      <Grid xs={12} sm={4}></Grid>
      <Grid xs={12} sm={4} sx={{ textAlign: 'center' }}>Category: {getAgeCategoryFromScore(die2-1)}</Grid>
      <Grid xs={12} sm={4}></Grid>
      <Grid py={2} xs={12}><Divider /></Grid>
      <Grid xs={4}>
        <TextField label="Weight (lbs)" value={weight} onChange={(event) => setWeight(event.target.value)} />
      </Grid>
      <Grid pl={2} container xs={8} alignItems="center">
        <Grid><Typography>Size: {weight ? getSizeFromWeight(weight) : 'Unknown'}</Typography></Grid>
      </Grid>
      <Grid container xs={12} sx={{ pt: 2 }}>
        <Grid xs={6} sx={{ pr: 1 }}>
          <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={close}>Cancel</Button>
        </Grid>
        <Grid xs={6} sx={{ pl: 1 }}>
          <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onClick}>Continue</Button>
        </Grid>
      </Grid>
    </Grid>
  </>
}

export function Form({ character }) {
  return <>
    <Score label="Beauty" endLabel={character.form.style && '+' + character.form.style} />
    <Score label="Peak" endLabel={getAgeCategoryFromScore(character.form.peak)} />
    <Score label="Aptitude" endLabel={character.form.aptitude && '+' + character.form.aptitude} />
    <Divider sx={{ my: .5 }} />
    <Score label="Size" endLabel={getSizeFromWeight(character.form.weight)} />
    <Score label="Weight (lbs)" endLabel={character.form.weight} />
  </>
}