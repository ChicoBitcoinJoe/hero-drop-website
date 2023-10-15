import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2'
import CasinoIcon from '@mui/icons-material/Casino'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

import Clickable from '../../Clickable'
import { TextField, Typography } from '@mui/material'

import { getSizeFromWeight, rollDice, getAgeCategoryFromScore, getClassFromLevel, getClassScoreFromLevel } from '../../../hooks/useCharacter'

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

function FormScore({ label, value, onClick, subtract, hide }) {
  return (
    <Grid container>
      <Grid xs={4} sm={12} sx={{ mt: 1, textAlign: 'center', p: 1, fontSize: '18px' }}>
        {label}
      </Grid> 
      <Grid container xs={8} sm={12} justifyContent="center" alignItems={'center'} sx={{ fontSize: '18px' }} >
        <Grid pt={hide && 1.3}>
          <Clickable onClick={onClick}>
            <Die sx={{ color: 'white', backgroundColor: 'rgb(29,118,206)' }} hideBorder>
              {value}
            </Die>
          </Clickable>
        </Grid>
        <Grid xs={2} sx={{ display: hide && 'none'}} container justifyContent="center" alignItems="center" p={2}>
          { subtract ? '-' : '+' }
        </Grid>
        <Grid sx={{ display: hide && 'none'}}>1</Grid>
        <Grid xs={2} sx={{ display: hide && 'none'}} container justifyContent="center" alignItems="center" p={2}>=</Grid>
        <Grid sx={{ display: hide && 'none'}}><Die>{subtract ? value - 1 : !hide ? value + 1 : value}</Die></Grid>
      </Grid>
    </Grid>
  )
}

export default function FormDialog({ character, submit, close}) {
  const [ weight, setWeight ] = React.useState(character.form.weight || '')
  const [ die1, rollDie1, setDie1 ] = useDie(1,4,character.form.style ? character.form.style-1 : 1)
  const [ die2, rollDie2, setDie2 ] = useDie(1,4,character.form.peak ? character.form.peak+1 : 1)
  const [ die3, rollDie3, setDie3 ] = useDie(1,4,character.form.aptitude || 1)

  const [numberOfRolls, setNumberofRolls] = React.useState(0)
  React.useEffect(() => {
    if(numberOfRolls > 0) {
      rollDie1()
      rollDie2()
      rollDie3()
      setNumberofRolls(numberOfRolls-1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfRolls])

  function roll() {
    setNumberofRolls(32)
  }

  const onClick = () => {
    submit({
      style: die1+1,
      peak: die2-1,
      aptitude: die3,
      weight,
    })
  }

  function swapBeautyAndPeak() {
    setDie1(die2)
    setDie2(die1)
  }

  function swapPeakAndAptitude() {
    setDie2(die3)
    setDie3(die2)
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
        Roll
      </Button>
      <Grid xs={12} sm={4.5}>
        <FormScore label="Style" value={die1} onClick={() => setDie1(die1+1 > 4 ? 1 : die1+1)} />
      </Grid>
      <Grid xs={12} sm={4.5}>
        <FormScore label="Peak" value={die2} onClick={() => setDie2(die2+1 > 4 ? 1 : die2+1)} subtract />
      </Grid>
      <Grid xs={12} sm={3}>
        <FormScore label="Aptitude" value={die3} onClick={() => setDie3(die3+1 > 4 ? 1 : die3+1)} hide />
      </Grid>
      <Grid xs={4}></Grid>
      <Grid xs={4} sx={{ marginTop: '-100px', pl: 1,  }}>
        <IconButton onClick={swapBeautyAndPeak}>
          <SwapHorizIcon />
        </IconButton>
      </Grid>
      <Grid xs={3} sx={{ marginTop: '-100px', pl: 1,  }}>
        <IconButton onClick={swapPeakAndAptitude}>
          <SwapHorizIcon />
        </IconButton>
      </Grid>
      <Grid xs={12} sm={4}></Grid>
      <Grid xs={12} sm={4} sx={{ textAlign: 'center' }}>Category: {getAgeCategoryFromScore(die2-1)}</Grid>
      <Grid xs={12} sm={4}></Grid>
      <Grid py={2} xs={12}><Divider /></Grid>
      <Grid xs={4}>
        <TextField label="Weight " value={weight} onChange={(event) => setWeight(event.target.value)} />
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