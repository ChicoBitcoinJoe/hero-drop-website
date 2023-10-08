import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function HeaderDialog({ character, submit, close }) {
  const [ characterName, setCharacterName] = React.useState(character.name || '')
  const [ level, setLevel] = React.useState(character.level || '0')
  const [ formName, setFormName] = React.useState(character.form.name || '')
  const [ playerName, setPlayerName] = React.useState(character.playerName || '')

  const onClick = () => {
    submit({
      characterName,
      formName,
      playerName,
      level,
    })
  }

  return <>
    <Grid container spacing={2} sx={{ maxWidth: '400px' }}>
      <Grid xs={12} container>
        <Grid container alignContent={'center'} sx={{ width: '108px' }}>
          <Grid xs={12}>
            <TextField fullWidth inputProps={{ style: { textAlign: 'center' }}}
              type="number"
              label="Level" 
              value={level}
              // InputProps={{
              //   endAdornment: <InputAdornment position="end">
              //     <Box sx={{ minWidth: 104, maxWidth: 104 }}>
              //       { getClassFromLevel(level) || 'Unknown' } ({ getClassScoreFromLevel(level) || '0' })
              //     </Box>
              //   </InputAdornment>,
              // }}
              onChange={(event) => setLevel(event.target.value)}
            />
          </Grid>
        </Grid>
        <Grid xs>
          <TextField fullWidth
            label="Form (Human, Dwarf, Elf...)" 
            value={formName} 
            onChange={(event) => setFormName(event.target.value)}
          />
        </Grid>
      </Grid>
      <Grid xs={12}>
        <TextField fullWidth
          label="Character Name / Title" 
          value={characterName} 
          onChange={(event) => setCharacterName(event.target.value)} 
        />
      </Grid>
      <Grid xs={12}>
        <TextField fullWidth
          label="Player Name"  
          value={playerName} 
          onChange={(event) => setPlayerName(event.target.value)} 
        />
      </Grid>
      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={close}>cancel</Button>
      </Grid>
      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onClick}>Continue</Button>
      </Grid>
    </Grid>
  </>
}