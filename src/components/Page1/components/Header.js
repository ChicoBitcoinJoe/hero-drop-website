import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Clickable from '../../Clickable'

import { getClassFromLevel } from '../../../hooks/useCharacter'

export default function Header({ character, onClick }) {
  return <>
    <Clickable onClick={onClick}>
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
    
    {/* <Grid container alignItems="center">
      <Grid>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Hero Drop</h1>
      </Grid>
      <Grid xs></Grid>
      <Grid xs={8}>
        <BorderedContainer onClick={onClick} sx={{ px: 1, py: 0 }}>
          <Grid container spacing={1}>
            <Grid xs={4} sx={{ pt: '32px', fontSize: '9px' }}>
              <div>Character Name</div>
            </Grid>
            <Grid xs={4} sx={{ pt: '32px', fontSize: '9px' }}>
              <div>Form</div>
            </Grid>
            <Grid xs={4} sx={{ pt: '32px', fontSize: '9px' }}>
              <div>Player Name</div>
            </Grid>
          </Grid>
        </BorderedContainer>
      </Grid>
    </Grid> */}
  </>
}