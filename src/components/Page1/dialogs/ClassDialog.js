import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function ClassDialog({ character, submit, close}) {
  const [ level, setLevel] = React.useState(character.level || '0')

  const onClick = () => {
    submit({
      level,
    })
  }

  return <>
    <Grid container spacing={2} sx={{ maxWidth: '400px' }}>
      <Grid xs={12} container>
        <Grid xs={12}>
          <TextField fullWidth inputProps={{ style: { textAlign: 'center' }}}
            type="number"
            label="Level" 
            value={level}
            onChange={(event) => setLevel(event.target.value)}
          />
        </Grid>
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