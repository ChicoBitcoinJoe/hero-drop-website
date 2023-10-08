import * as React from 'react'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2'

import AddIcon from '@mui/icons-material/Add'

import Navigation from "./Navigation"

function CoreValue({ data, onChange, id, index }) {
  const onScoreChange = (event) => {
    const newScore = event.target.value
    if(newScore >= 0 && newScore <=100) {
      onChange(event)
    }
  }

  return <>
    <Grid container xs={12} sx={{ pt: 1 }} spacing={2}>
      <Grid xs>
        <TextField 
          fullWidth 
          multiline
          id={id}
          label={"Core Value #"+index}
          rows={4}
          value={data[id]}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid sx={{ width: '100px' }}>
        <TextField
          id={id+'Conviction'}
          label={'Conviction'} 
          value={data[id+'Conviction'] || 0}
          onChange={onScoreChange} 
          inputProps={{ 
            inputMode: 'numeric',
          }}
          InputProps={{
            endAdornment: <>%</>
          }}
        />
      </Grid>
    </Grid>
  </>
}

export default function FourthStep({ character, navigation }) {
  const { data, onChange, update } = character

  return <>
    <StepLabel>
      Choose your Core Values
    </StepLabel>
    <StepContent>
      <Typography variant="subtitle2">
        A core value is impossible to change against someone’s will and without tremendous effort. Breaking a core value inflicts psychic damage based on the score of the core value broken. A core values score can be applied in actions where it makes sense. <i>For example, having a friend as a core value allows that friend to use the core value score to break your character out of a mind control effect or to negate the psychic damage of breaking a core value. But should they die, you suffer a mental penalty depending on the strength of the bond of the lost friend.</i> 
        <br /><br />
        You can have any number of core values but be ready to suffer the mental effects if you break them.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid xs={6} sm={3}>
          <TextField id="totalCoreValues" label="Core Values" value={character.totalCoreValues} onChange={onChange} />
        </Grid>
        {
          Array.from({length: data.totalCoreValues}, (v, i) => i).map((index) => {
            return <Grid xs={12} key={index}>
              <CoreValue data={data} onChange={onChange} id={"coreValue"+(index+1)} index={index+1} />
            </Grid>
          })
        }
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Navigation {...navigation} inputComplete />
    </StepContent>
  </>
}