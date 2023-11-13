import * as React from 'react'

import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'

import BorderedContainer, { Label } from '../../components/BorderedContainer'
import Clickable from '../../components/Clickable'
import HorizontalInput from '../../components/HorizontalInput'
import Paper from '../../components/Paper'

import Values from '../../components/Page1/components/Values'
import Feats from '../../components/Page1/components/Feats'

import Age from './components/Age'
import Form from './components/Form'
import Header from './components/Header'
import AbilityScores from './components/AbilityScores'
import Skills from './components/Skills'
import Inspiration from './components/Inspiration'
import Speed from './components/Speed'
import DodgeClass from './components/DodgeClass'
import Initiative from './components/Initiative'
import HitDice from './components/HitDice'

export default function Page1({ character }) {
  console.log(character)
  return (
    <Paper size="Letter" margin={'0.5in'}>
      <Grid container spacing={2}>

        <Grid xs={12}>
          <Header character={character} />
        </Grid>

        <Grid xs={12} container>
          {/* LEFT COLUMN */}
          <Grid xs>
            <div>
              <Grid container spacing={2}>

                <Grid xs={12} container>
                  <Grid xs>
                    <Inspiration character={character} />
                  </Grid>
                  <Grid xs={6.8}>
                    <HorizontalInput 
                      label="Proficiency Bonus" 
                      value={character.level && ('+' + character.class.proficiencyBonus)} 
                      orientation="right" 
                    />
                  </Grid>
                </Grid>

                <Grid xs={12}>
                  <AbilityScores character={character} />
                </Grid>
                
                <Grid xs={12}>
                  <BorderedContainer label={"Skills "} sx={{ height: 431, overflow: 'hidden' }}>
                    <Skills character={character} />
                  </BorderedContainer>
                </Grid>

                <Grid xs={12}>
                  <Clickable>
                    <HorizontalInput label="Passive Perception" orientation="right" />
                  </Clickable>
                </Grid>

                <Grid xs={12}>
                  <BorderedContainer label ="Other Proficiencies & Languages" sx={{ height: 184 }}>
                    <Clickable onClick={null}>

                    </Clickable>
                  </BorderedContainer>
                </Grid>

              </Grid>
            </div>


          </Grid>
          {/* MIDDLE COLUMN */}
          <Grid xs={4}>
            <div>
              <Grid container spacing={2}>
                <Grid container>
                  <Grid xs container spacing={1}>
                    <Grid xs={12}>
                      <Initiative character={character} />
                    </Grid>
                    <Grid xs={12}>
                      <HorizontalInput label="Death Saves" />
                    </Grid>
                  </Grid>
                  <Grid xs container spacing={1}>
                    <Grid xs={12}>
                      <Speed character={character} />
                    </Grid>
                    <Grid xs={12}>
                      <DodgeClass character={character} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={6}>
                  <BorderedContainer label="Hit Points" sx={{ height: 80 }}>
                    <Clickable>
                      <Typography sx={{ pl: 0.5, pt: 0.9, fontSize: '9px', borderBottom: '1px solid black' }}>
                        Max: {character.maxHitPoints || ''}
                      </Typography>
                    </Clickable>
                  </BorderedContainer>                  
                </Grid>
                <Grid xs={6}>
                  <BorderedContainer label="Temporary HP" sx={{ height: 80 }} />
                </Grid>

                <Grid xs={6}>
                  <BorderedContainer label="Ego" sx={{ height: 80 }}>
                    <Clickable>
                      <Typography sx={{ pl: 0.5, pt: 0.9, fontSize: '9px', borderBottom: '1px solid black' }}>
                        Max: {''}
                      </Typography>
                    </Clickable>
                  </BorderedContainer>                  
                </Grid>
                <Grid xs={6}>
                  <BorderedContainer label="Temporary Ego" sx={{ height: 80 }} />
                </Grid>

                <Grid xs={6}>
                  <BorderedContainer label="Hit Dice" sx={{ height: 80 }}>
                    <Clickable>
                      <Typography sx={{ pl: 0.5, pt: 0.9, fontSize: '9px', borderBottom: '1px solid black' }}>
                        Max: {''}
                      </Typography>
                    </Clickable>
                  </BorderedContainer>
                </Grid>
                <Grid xs={6}>
                  <BorderedContainer label={"Damage Reduction"} sx={{ height: 80 }}>
                    <Clickable onClick={null} />
                  </BorderedContainer>
                </Grid>
                
                <Grid xs={12}>
                  <BorderedContainer label="Attacks and Spellcasting" sx={{ height: 277 }}>
                    <Clickable onClick={null}>
                      
                    </Clickable>
                  </BorderedContainer>
                </Grid>

                <Grid xs={12}>
                  <BorderedContainer label ="Equipment" sx={{ height: 236 }}>
                    <Clickable onClick={null}>

                    </Clickable>
                  </BorderedContainer>
                </Grid>
              </Grid>

            </div>

          </Grid>
          {/* RIGHT COLUMN */}
          <Grid xs container>

            <Grid xs={12}>
              <Form character={character} />
            </Grid>
            <Grid xs={12}>
              <Age character={character} />
            </Grid>

            <Grid xs={12}>
              <BorderedContainer
                label="Core Values"
                extraLabels={<Label left="182px">Cnv.</Label>}
                sx={{ height: 284 }}
              >
                <Clickable onClick={null}>
                  <Values character={character} />
                </Clickable>
              </BorderedContainer>
            </Grid>
            <Grid xs={12}>
              <BorderedContainer  
                label={"Feats"} 
                sx={{ height: 420 }}
              >
                <Clickable onClick={null}>
                  <Feats character={character} />
                </Clickable>
              </BorderedContainer>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  )
}