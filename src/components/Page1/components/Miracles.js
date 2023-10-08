import * as React from 'react'

import Grid from '@mui/material/Unstable_Grid2'

import Score from './Score'

export default function Miracles({ character }) {
  return <Grid>
    {
      Array(character.totalMiracles).fill(null).map((_, i) => i+1).map((index) => {
        const key = 'Miracle' + index
        const label = character[key]
        return <React.Fragment key={key}>
          <Score label={label} />
        </React.Fragment>
      })
    }
  </Grid>
}