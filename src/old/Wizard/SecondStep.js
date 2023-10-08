import * as React from 'react'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2'

import SwapVertIcon from '@mui/icons-material/SwapVert'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import CasinoIcon from '@mui/icons-material/Casino'

import Navigation from "./Navigation"
import { Traits } from "../../components/SelectTraitsDialog"
import { utils } from '../../hooks/useCharacter'

export default function SecondStep({ character, navigation }) {
  const { data, update, swapSentienceAndBeauty, swapBeautyAndPeak } = character
  const [sentienceScore, setSentienceScore] = React.useState(character.sentienceScore)
  const [beautyScore, setBeautyScore] = React.useState(character.sentienceBeautyScore)
  const [peakBeauty, setPeakBeauty] = React.useState(character.sentiencePeakBeauty)
  const maxRolls = 21

  React.useEffect(() => {
    setSentienceScore(character.sentienceScore)
    setBeautyScore(character.sentienceBeautyScore)
    setPeakBeauty(character.sentiencePeakBeauty)
  }, [character])

  React.useEffect(() => {
    if(sentienceScore === character.sentienceScore || numberOfRolls === maxRolls+1) return
    console.log('updating', 'sentienceScore', sentienceScore)
    character.update('sentienceScore', sentienceScore)
  }, [sentienceScore])
  
  React.useEffect(() => {
    if(beautyScore === character.sentienceBeautyScore || numberOfRolls === maxRolls+1) return
    console.log('updating', 'sentienceBeautyScore', beautyScore)
    character.update('sentienceBeautyScore', beautyScore)
  }, [beautyScore])
  
  React.useEffect(() => {
    if(peakBeauty === character.sentiencePeakBeauty || numberOfRolls === maxRolls+1) return
    console.log('updating', 'sentiencePeakBeauty', peakBeauty)
    character.update('sentiencePeakBeauty', peakBeauty)
  }, [peakBeauty])

  const [numberOfRolls, setNumberofRolls] = React.useState(0)

  React.useEffect(() => {
    console.log(numberOfRolls)
    if(numberOfRolls > 0) {
      setSentienceScore(utils.rollDice(1,4) + 1)
      setBeautyScore(utils.rollDice(1,4) + 1)
      setPeakBeauty(utils.rollDice(1,4) - 1)
      setNumberofRolls(numberOfRolls+1)
      if(numberOfRolls > maxRolls) setNumberofRolls(0)
    }
  }, [numberOfRolls])

  function rollForScores() {
    console.log(numberOfRolls)
    setNumberofRolls(1)
  }

  function localSwapSentienceAndBeauty() {
    const sentience = sentienceScore
    const beauty = beautyScore
    setSentienceScore(beauty)
    setBeautyScore(sentience)
    swapSentienceAndBeauty()
  }

  function localSwapBeautyAndPeak() {
    const beauty = beautyScore
    const peak = peakBeauty
    setBeautyScore(peak + 2)
    setPeakBeauty(beauty - 2)
    swapBeautyAndPeak()
  }
  
  const [traits, setTraits] = React.useState(character.sentienceTraits)
  const onTraitChange = (id, value) => {
    let updatedTraits = {...traits}
    updatedTraits[id] = value
    setTraits(updatedTraits)
    update('sentienceTraits', updatedTraits)
  }

  return <>
    <StepLabel>
      Sentience Attributes
    </StepLabel>
    <StepContent>
      <Typography variant="subtitle2">
        A sentience is anything with a desire to live and has the capability to learn from its interactions with the world. Whether it is biological like a human, technological like an artificial intelligence, or magical such as an awakened suit of armor. Your character’s sentience is always intelligent enough to speak the common language, plus one language related to their sentience.
      </Typography>
      <Divider sx={{ my: 2 }} />      
      <Grid container spacing={2}>
        <Grid container xs={12} spacing={2}>
          <Grid xs={12} sx={{ pb: 3 }}>
            <Button fullWidth
              variant="outlined" 
              sx={{ p: 3 }}
              startIcon={<CasinoIcon />} 
              onClick={rollForScores}
            >
              Roll
            </Button>
          </Grid>
          <Grid xs={12} sm>
            <TextField fullWidth 
              id="sentienceScore" 
              label="Sentience Score" 
              value={sentienceScore} 
              onChange={(event) => setSentienceScore(event.target.value)}
              helperText="1d4 + 1"
            />
          </Grid>
          <Grid container xs={12} sm="auto" sx={{ pb: 4 }} justifyContent={'center'} alignItems={'center'}>
            <IconButton color="primary" onClick={localSwapSentienceAndBeauty}>
              <SwapVertIcon sx={{ display: { xs: 'block', sm: 'none' }}} />
              <SwapHorizIcon sx={{ display: { xs: 'none', sm: 'block' }}} />
            </IconButton>
          </Grid>
          <Grid xs={12} sm>
            <TextField fullWidth 
              id="sentienceBeautyScore" 
              label="Max Beauty" 
              value={beautyScore} 
              onChange={(event) => setBeautyScore(event.target.value)}
              helperText="1d4 + 1" 
            />
          </Grid>
          <Grid container xs={12} sm="auto" sx={{ pb: 4 }} justifyContent={'center'} alignItems={'center'}>
            <IconButton color="primary" onClick={localSwapBeautyAndPeak}>
              <SwapVertIcon sx={{ display: { xs: 'block', sm: 'none' }}} />
              <SwapHorizIcon sx={{ display: { xs: 'none', sm: 'block' }}} />
            </IconButton>
          </Grid>
          <Grid xs={12} sm>
            <TextField fullWidth 
              id="sentiencePeakBeauty" 
              label="Peak Beauty" 
              value={peakBeauty} 
              onChange={(event) => setPeakBeauty(event.target.value)}
              helperText="1d4 - 1" 
            />
          </Grid>
          <Grid container xs={12}>
            <Traits traits={traits} specializationScore={data["sentienceScore"]} onChange={onTraitChange} />
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Navigation {...navigation} inputComplete={sentienceScore !== 0 && beautyScore !== 0} />
    </StepContent>
  </>
}