import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import BorderedContainer, { ExtraLabels } from '../../../components/BorderedContainer'
import HorizontalSpace from './HorizontalSpace'

export function Lines({ rows }) {
  const lines = []
  for(var i = 0; i < rows; i++) {
    lines.push(<div key={i} style={{ marginTop: '20px', borderBottom: '1px solid rgba(0,0,0,1)' }}></div>)
  }

  return lines;
}

export default function Note({ label, label2, height, offSet, rows, xs }){
  const rowsHeight = height - 12 - (label2 ? 15 : 0) - (offSet || 0)
  const calculatedRows = Math.floor(rowsHeight / 21)
  return <>
    <BorderedContainer container label={label} label2={label2} xs={xs} height={height+'px'}>
      <Grid xs={12}>        
        <HorizontalSpace height={ offSet || '0px' } />
        <Lines rows={rows ? rows : calculatedRows} />
      </Grid>
    </BorderedContainer>
  </>
}