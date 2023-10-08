import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function AgeDialog({ character, submit, close}) {
  const [ maxAge, setMaxAge ] = React.useState(character.age.max)

  const onClick = () => {
    submit({
       max: maxAge
    })
  }

  return <>
    <Grid container spacing={2}>
      <Grid xs={12}>
        <TextField fullWidth label="Max Age" value={maxAge} onChange={event => setMaxAge(event.target.value)}/>
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