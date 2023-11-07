import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import Clickable from '../Clickable'
import HorizontalInput from '../HorizontalInput'

function EditDialog({ character, submit, close }) {
  const [ value, setValue] = React.useState(character.inspiration || '')

  const onSubmit = () => {
    submit(value)
  }

  return <>
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField fullWidth 
            type="number"
            label="Inspiration"
            value={value} 
            onChange={(event) => setValue(event.target.value)} 
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

export default function Inspiration({ character }) {
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
      ['inspiration', data]
    ])
  }

  return <>
    <Dialog onClose={closeDialog} open={dialogOpen}>
      <EditDialog character={character} submit={submit} close={closeDialog} />
    </Dialog>
    <Clickable onClick={openDialog}>
      <HorizontalInput label="Inspiration" value={character.inspiration}/>
    </Clickable>
  </>
}