import * as React from 'react'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import Paper from '../../components/Paper'
import BorderedContainer from '../../components/BorderedContainer'
import SpecializationCard from '../../components/SpecializationCard'
import { utils } from "../../hooks/useCharacter"

function Score({ label, endLabel, bold }) {
  return <>
    <Grid container xs={12} sx={{ py: '3px', fontWeight: bold && 'bold', fontSize: '9px' }}>
      <Grid xs>
        {label} 
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '30px', display: endLabel === undefined && 'none' }}>
        <Grid>{endLabel}</Grid>
      </Grid>
    </Grid>
  </>
}

export default function Page3({ character }) {
  const { data, getSpecializationScore } = character
  const { totalSpecializations } = data

  return <Paper page="3" size="Letter" margin={'0.4in'}>
    <Grid container spacing={2}>
      {/* <Grid sx={{ width: '180px' }}>
        <BorderedContainer label="Primary Traits" label2="Score">
          <Grid xs>
            {
              utils.traits.map((trait, index) => {
                return <React.Fragment key={index}>
                  <Score label={trait} endLabel={character.getTraitScore(trait)} />
                </React.Fragment>
              })
            }
            <Grid xs={12}>
              <Divider sx={{ pt: 1, fontSize: '9px', fontWeight: 'bold' }} textAlign="left">Schools of Magic</Divider>
            </Grid>
            {
              utils.schools.map((trait, index) => {
                return <React.Fragment key={index}>
                  <Score label={trait} endLabel={character.getTraitScore(trait)} />
                </React.Fragment>
              })
            }
            <Grid xs={12}>
              <Divider sx={{ pt: 1, fontSize: '9px', fontWeight: 'bold' }} textAlign="left">Damage Reduction</Divider>
            </Grid>
            {
              utils.damageTypes.map((trait, index) => {
                return <React.Fragment key={index}>
                  <Score label={trait} endLabel={character.getTraitScore(trait)} />
                </React.Fragment>
              })
            }
          </Grid>
        </BorderedContainer>
      </Grid> */}
      <Grid xs={6}>
        <div>
          <Grid container spacing={'2px'}>
            <Grid xs={12}>
              {/* <SpecializationCard
                name={character.sentienceName} 
                age={character.getAge()} 
                score={character.sentienceScore} 
                traits={character.sentienceTraits} 
              /> */}
            </Grid>
            <Grid xs={12}>
              <Divider sx={{ my: 2 }}></Divider>
            </Grid>
            <Grid xs={12}>
              {/* <SpecializationCard
                name={'Specialization'}
                score={'Score'} 
                traits={character.sentienceTraits} 
              /> */}
            </Grid>
            {
              Array(totalSpecializations).fill(null).map((_, i) => i+1).map((index) => {
                const key = "specialization" + index
                // const { specializationName, specializationYears, isNatural, traits } = data[key]
                // const score = getSpecializationScore(key)

                const specialization = {
                  isNatural: false,
                  name: '', //specializationName, 
                  years: '', // specializationYears,
                  score: '',
                  traits: []
                }

                return <Grid xs={12} key={key}>
                  {/* <SpecializationCard {...specialization} /> */}
                </Grid>
              })
            }
          </Grid>
        </div>
      </Grid>
    </Grid>
  </Paper>
}