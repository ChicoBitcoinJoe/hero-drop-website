import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'

import Clickable from '../Clickable'

function EditDialog({ character, submit, close }) {
  const [ level, setLevel] = React.useState(character.level || '0')
  const [ formName, setFormName] = React.useState(character.form.name || '')
  const [ characterName, setCharacterName] = React.useState(character.name || '')
  const [ characterTitle, setCharacterTitle] = React.useState(character.title || '')
  const [ playerName, setPlayerName] = React.useState(character.playerName || '')

  const onSubmit = () => {
    submit({
      characterName,
      characterTitle,
      formName,
      playerName,
      level,
    })
  }

  return <>
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
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
            label="Character Name" 
            value={characterName} 
            onChange={(event) => setCharacterName(event.target.value)} 
          />
        </Grid>
        <Grid xs={12}>
          <TextField fullWidth
            label="Character Title" 
            value={characterTitle} 
            onChange={(event) => setCharacterTitle(event.target.value)} 
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
          <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onSubmit}>Continue</Button>
        </Grid>
      </Grid>
    </Box>
  </>
}

export default function Header({ character }) {
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
      ['level', data.level],
      ['form', { ...character.form, name: data.formName }],
      ['name', data.characterName],
      ['title', data.characterTitle],
      ['playerName', data.playerName],
    ])
  }

  return <>
    <Dialog onClose={closeDialog} open={dialogOpen}>
      <EditDialog character={character} submit={submit} close={closeDialog} />
    </Dialog>
    <Clickable onClick={openDialog}>
      <Grid container  sx={{ borderBottom: '1px solid black'}}>
        <Grid xs={2.5}>
          <h1 style={{ margin: 0, marginBottom: '-5px', fontSize: '24px' }}>Hero Drop</h1>
        </Grid>
        <Grid xs={1.5} sx={{ pt: '5px' }}>
          <Typography noWrap sx={{ fontSize: '12px' }}>{character.class.category} { character.level }</Typography>
        </Grid>
        <Grid xs={2} sx={{ pt: '5px' }}>
          <Typography noWrap sx={{ fontSize: '12px' }}>{ character.form.name }</Typography>
        </Grid>
        <Grid xs={character.title ? "auto" : 4} sx={{ pt: '5px' }}>
          <Typography noWrap sx={{ fontSize: '12px' }}>{ character.name }</Typography>
        </Grid>
        <Grid xs sx={{ pt: '5px', display: !character.title && 'none' }}>
          <Typography noWrap sx={{ fontSize: '12px' }}>&nbsp;{ character.title }</Typography>
        </Grid>
        <Grid xs={2} sx={{ pt: '5px' }}>
          <Typography noWrap sx={{ fontSize: '12px' }}>{ character.playerName }</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={2.5} sx={{ fontSize: '9px' }}>
          <div>Character Sheet</div>
        </Grid>
        <Grid xs={1.5} sx={{ fontSize: '9px' }}>
          <div>Class / Level</div>
        </Grid>
        <Grid xs={2} sx={{ fontSize: '9px' }}>
          <div>Form</div>
        </Grid>
        <Grid xs={character.title ? "auto" : 4} sx={{ fontSize: '9px' }}>
          <div>Character Name</div>
        </Grid>
        <Grid xs sx={{ fontSize: '9px' }}>
          <Box sx={{ display: !character.title && 'none' }}>&nbsp;and Title</Box>
        </Grid>
        <Grid xs={2} sx={{ fontSize: '9px' }}>
          <div>Player Name</div>
        </Grid>
      </Grid>
    </Clickable>
  </>
}