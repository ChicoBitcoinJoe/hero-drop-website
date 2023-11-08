import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'

import Clickable from '../../../components/Clickable'
import HorizontalInput from '../../../components/HorizontalInput'

function EditDialog({ character, submit, close }) {
  const [ value, setValue] = React.useState(character.initiativeBonus || '')

  const onSubmit = () => {
    submit(value)
  }

  return <>
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid xs="auto">
          <Typography variant="h5" pt={1.75}>&nbsp;{character.dexterity.modifier} +</Typography>
        </Grid>
        <Grid xs>
          <TextField fullWidth 
            type="number"
            label="Initiative Bonuses"
            value={value} 
            onChange={(event) => setValue(event.target.value)} 
          />
        </Grid>
        <Grid xs={12} p={0} />
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

export default function Initiative({ character }) {
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
      ['initiativeBonus', data]
    ])
  }

  const value = character.level && (character.initiative > 0 && '+') + character.initiative
  return <>
    <Dialog onClose={closeDialog} open={dialogOpen}>
      <EditDialog character={character} submit={submit} close={closeDialog} />
    </Dialog>
    <Clickable onClick={openDialog}>
      <HorizontalInput label="Initiative" value={value}/>
    </Clickable>
  </>
}