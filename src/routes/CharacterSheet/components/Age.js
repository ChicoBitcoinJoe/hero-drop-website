import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

import BorderedContainer from '../../../components/BorderedContainer'
import Clickable from '../../../components/Clickable'
import Score from '../../../components/Score'

function EditDialog({ character, submit, close }) {
  const [ currentAge, setCurrentAge ] = React.useState(character.form.currentAge)
  const [ maxAge, setMaxAge ] = React.useState(character.form.maxAge)

  const onClick = () => {
    submit({
      currentAge,
      maxAge
    })
  }

  return <>
    <Box sx={{ p: 2, maxWidth: 280 }}>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <TextField fullWidth type="Number" label="Current Age" value={currentAge} onChange={event => setCurrentAge(event.target.value)}/>
        </Grid>
        <Grid xs={6}>
          <TextField fullWidth type="Number" label="Max Age" value={maxAge} onChange={event => setMaxAge(event.target.value)}/>
        </Grid>
        <Grid xs={6}>
          <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={close}>cancel</Button>
        </Grid>
        <Grid xs={6}>
          <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onClick}>Continue</Button>
        </Grid>
      </Grid>      
    </Box>
  </>
}

export default function Age({ character }) {
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
    
    character.update('form', {...character.form, ...data})
  }

  return <>
    <Dialog onClose={closeDialog} open={dialogOpen}>
      <EditDialog character={character} submit={submit} close={closeDialog} />
    </Dialog>
    <BorderedContainer label="Age">
      <Clickable onClick={openDialog} sx={{ p: 1 }}>
        <Score label="Current / Maximum" endLabel={character.form.currentAge + (character.form.maxAge && ' / ' + character.form.maxAge + ' years')} />
        <Score label="Category" endLabel={character.form.maxAge && character.form.ageCategory} />
        <Score label="Penalty" endLabel={character.form.maxAge && character.form.agePenalty} />
      </Clickable>
    </BorderedContainer>
  </>
}