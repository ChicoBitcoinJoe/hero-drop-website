import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import BorderedContainer from '../../BorderedContainer'
import { getCurrentAge, getAgeScore } from '../../../hooks/useCharacter'

export default function Age({ character, onClick }) {
  const { form, age, specializations } = character

  function getPenalty(penalty) {
    const newPenalty = penalty
    if(newPenalty > 0) return 0    
    return newPenalty
  }

  const table = [
    ['Age Category', 'Max Age', 'STR Penalty', 'Current', 'Style'],
    ['Adolescent', age.max && Math.floor(age.max * 0.15), character.level && getPenalty(-2), '', form.style && form.style - Math.abs(0 - form.peak)],
    ['Young Adult', age.max && Math.floor(age.max * 0.35), character.level && getPenalty(0), '', form.style && form.style - Math.abs(1 - form.peak)],
    ['Adult', age.max && Math.floor(age.max * 0.55), character.level && getPenalty(-1), '', form.style && form.style - Math.abs(2 - form.peak)],
    ['Aging Adult', age.max && Math.floor(age.max * 0.7), character.level && getPenalty(-2), '', form.style && form.style - Math.abs(3 - form.peak)],
    ['Elder', age.max && Math.floor(age.max * 0.85), character.level && getPenalty(-3), '', form.style && form.style - Math.abs(4 - form.peak)],
    ['Ancient', age.max && Math.floor(age.max), character.level && getPenalty(-4), '', form.style && form.style - Math.abs(5 - form.peak)],
    ['Immortal', '', '', '', form.style]
  ]

  const ageScore = getAgeScore(specializations, age.max)
  table[ageScore+1][3] = getCurrentAge(specializations) || ''
  // console.log({ ageScore, age, table })

  return <>
    <BorderedContainer container sx={{ p: 0 }} onClick={onClick}>
      {/* <Grid container xs={12} 
        sx={{ 
          fontSize: '9px', 
          fontWeight: 'bold',
          borderBottom: '1px dotted black' 
        }}
      >
        <Grid sx={{ p: .5, py: .8, width: '70px' }}>
          {table[0][0]}
        </Grid>
        <Grid container xs
          justifyContent="center"
          sx={{ p: .5, py: .8, borderLeft: '1px dotted black' }}
        >
          {table[0][3]}
        </Grid>
        <Grid container xs
          justifyContent="center" 
          sx={{ p: .5, py: .8, borderLeft: '1px dotted black' }}
        >
          {table[0][1]}
        </Grid>
        <Grid container xs
          justifyContent="center" 
          sx={{ p: .5, py: .8, borderLeft: '1px dotted black' }}
        >
          {table[0][2] || ''}
        </Grid>
      </Grid> */}
      {
        table.map((row, index) => {
          const isLast = index === table.length-1
          const rowStyles = { 
            fontSize: '9px', 
            fontWeight: index !== 0 || 'bold',
            borderBottom: isLast ? 0 : '1px dotted black',
            // display: index !== ageScore+1 && 'none'
          }

          return <>
            <Grid key={'ageRow'+index} container xs={12} sx={rowStyles}>
              <Grid sx={{ p: .5, py: .8, width: '70px' }}>
                {row[0]}
              </Grid>
              <Grid container xs
                justifyContent="center"
                sx={{ p: .5, py: .8, borderLeft: '1px dotted black' }}
              >
                {row[3]}
              </Grid>
              <Grid container xs
                justifyContent="center" 
                sx={{ p: .5, py: .8, borderLeft: '1px dotted black' }}
              >
                {row[1]}
              </Grid>
              <Grid container xs
                justifyContent="center" 
                sx={{ p: .5, py: .8, borderLeft: '1px dotted black' }}
              >
                {row[2] || ''}
              </Grid>
              {/* <Grid container xs 
                justifyContent="center"
                sx={{ p: .5, py: .8, borderLeft: '1px dotted black' }}
              >
                {row[4] > 0 && '+'}{row[4] || ''}
              </Grid> */}
              {/* <Grid container
                justifyContent="center"
                sx={{ p: .5, py: .58, width: '40px', borderLeft: '1px dotted black' }}
              >
                {row[5]}
              </Grid> */}
            </Grid>
          </>
        })
      }
    </BorderedContainer>
  </>
}