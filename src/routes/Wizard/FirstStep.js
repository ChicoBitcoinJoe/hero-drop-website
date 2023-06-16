import * as React from 'react'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'


import Navigation from "./Navigation"
import { utils } from "../../hooks/useCharacter"


export default function FirstStep({ character, navigation }) {
  const {data, onChange, getClassScore, getSize } = character

  

  return <>
    <StepLabel optional={null && <Typography variant="caption">What is Roleplaying?</Typography>}>
      Start your Character
    </StepLabel>
    <StepContent>
      <Typography variant="subtitle2">
        Roleplaying is the idea of putting yourself in the mind of a character and choosing actions for them that make sense given who they are and what they know. Keep this in mind as you create your character so the end result is fun for you (and importantly, others) to experience. Having a strong background is usually more fulfilling to play but it is not a requirement. Your character must be a size of small, medium, or large unless otherwise allowed by the Bard.      
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <TextField 
            id="playerName" 
            label="Player Name"  
            value={data.playerName} 
            onChange={onChange} 
            fullWidth 
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField 
            fullWidth id="sentienceName" 
            label="Sentience Name" 
            value={data["sentienceName"]} 
            onChange={onChange} 
          />
        </Grid>
        <Grid xs>
          <TextField 
            id="characterName" 
            label="Character Name" 
            value={data.characterName} 
            onChange={onChange} 
            fullWidth 
          />
        </Grid>
        <Grid xs="auto">
          <FormControl>
            <InputLabel id="select-class-label" sx={{ px: .75, backgroundColor: 'white' }}>Class</InputLabel>
            <Select
              labelId="select-class-label"
              sx={{ width: '130px' }}
              name="characterClass"
              id="characterClass"
              value={data.characterClass}
              onChange={onChange}
            >
              <MenuItem value={'Common'}>Common</MenuItem>
              <MenuItem value={'Uncommon'}>Uncommon</MenuItem>
              <MenuItem value={'Rare'}>Rare</MenuItem>
              <MenuItem value={'Hero'}>Hero</MenuItem>
              <MenuItem value={'Legend'}>Legend</MenuItem>
              <MenuItem value={'God'}>God</MenuItem>
            </Select>
            <FormHelperText sx={{ ml: '8px' }}>Score: {getClassScore()}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid container xs={12}>
          <Grid xs={6}>
            <TextField fullWidth
              id="sentienceWeight" 
              label="Weight"
              helperText={"Size: " + getSize()}
              value={data["sentienceWeight"]} 
              onChange={onChange} 
            />
          </Grid>
          <Grid xs={6} sm>
            <TextField fullWidth 
              id="sentienceMaxAge" 
              label="Max Age" 
              value={data.sentienceMaxAge} 
              onChange={onChange} 
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Navigation {...navigation} inputComplete={data.characterName} />
    </StepContent>
  </>
}