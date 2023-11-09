import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import Dialog from '@mui/material/Dialog'
import { TextField, Typography } from '@mui/material'

import { getSizeFromWeight } from '../../../hooks/useCharacter'
import BorderedContainer from '../../../components/BorderedContainer'
import Clickable from '../../../components/Clickable'
import Score from '../../../components/Score'

function FormDialog({ character, submit, close}) {
  const [ weight, setWeight ] = React.useState(character.form.weight || '')
  
  const onClick = () => {
    submit(weight)
  }

  return <Box p={2}>
    <Grid container spacing={2} sx={{ maxWidth: '440px' }}>
      <Grid xs={6}>
        <TextField fullWidth label="Weight " value={weight} onChange={(event) => setWeight(event.target.value)} />
      </Grid>
      <Grid xs={6} container alignItems="center" pl={2} >
        <Grid><Typography>Size: {weight ? getSizeFromWeight(weight) : 'Unknown'}</Typography></Grid>
      </Grid>
      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={close}>Cancel</Button>
      </Grid>
      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onClick}>Continue</Button>
      </Grid>
    </Grid>
  </Box>
}

export default function Form({ character }) {
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
    
    character.update('form', {...character.form, weight: data})
  }

  return <>
    <Dialog onClose={closeDialog} open={dialogOpen}>
      <FormDialog character={character} submit={submit} close={closeDialog} />
    </Dialog>
    <BorderedContainer label={"Form" + (character.form.name && (": " + character.form.name))}>
      <Clickable sx={{ p: 1 }} onClick={openDialog}>
        <Score label="Weight" endLabel={character.form.weight + ' lb'} />
        <Score label="Size" endLabel={character.form.weight && character.form.size} />
        <Score label="Size Die" endLabel={character.form.sizeDie || ''} />
        {/* <Score label="DR" endLabel={character.form.damageReduction || ''} /> */}
      </Clickable>
    </BorderedContainer>
  </>
}