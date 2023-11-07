import * as React from 'react'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { convertScoreToDamageDie } from '../../hooks/useCharacter'

import BorderedContainer, { Label } from '../../components/BorderedContainer'
import Clickable from '../../components/Clickable'
import HorizontalInput from '../../components/HorizontalInput'
import Paper from '../../components/Paper'

import FormDialog from '../../components/Page1/dialogs/FormDialog'
import AgeDialog from '../../components/Page1/dialogs/AgeDialog'
import SpecializationDialog from '../../components/Page1/dialogs/ProficienciesDialog'
import ValuesDialog from '../../components/Page1/dialogs/ValuesDialog'
import ClassDialog from '../../components/Page1/dialogs/ClassDialog'

import Form from '../../components/Page1/components/Form'
import Age from '../../components/Page1/components/Age'
import Header from '../../components/Page1/Header'
import AbilityScores from '../../components/Page1/AbilityScores'
import Specializations from '../../components/Page1/Proficiencies'
import Values from '../../components/Page1/components/Values'
import Miracles from '../../components/Page1/components/Miracles'
import Inspiration from '../../components/Page1/Inspiration'
import Speed from '../../components/Page1/Speed'
import DodgeClass from '../../components/Page1/DodgeClass'
import Initiative from '../../components/Page1/Initiative'
import HitDice from '../../components/Page1/HitDice'

export default function Page1({ character }) {  
  console.log(character)
  const [dialog, setDialog] = React.useState(null)
  const [initialState, setInitialState] = React.useState(null)
  const [clickedIndex, setClickedIndex] = React.useState(null)

  const handleDialogOpen = (dialogId, event, index) => {
    // console.log({ dialogId, event, index })
    setDialog(dialogId)
    if(dialogId === "Specializations") {
      setClickedIndex(index)
      if(index === 'new') {
        setInitialState(null)
      }
      else if(index === 'form') {
        setInitialState(character.form)
      }
      else {
        setInitialState(character.specializations[index])
      }
    }
    else if(dialogId === 'SchoolsOfMagic') {
      setInitialState(character.schoolsOfMagic)
    }
    else {
      setInitialState(null)
      setClickedIndex(null)
    }
  }

  const handleDialogClose = (data) => {
    console.log({ dialog, data, clickedIndex })
    if(data) {
      if(dialog === 'Class') {
        character.updateMany([
          ['level', data.level],
        ])
      }
      else if(dialog === "Form") {
        character.updateMany([
          ['form', { ...character.form, ...data }],
        ])
      }
      else if(dialog === "Age") {
        character.updateMany([
          ['form', { ...character.form, ...data }],
        ])
      }
      else if(dialog === "Specializations") {
        if(clickedIndex === 'new') {
          character.updateMany([
            ['specializations', [...character.specializations, data]],
          ])
        }
        else {
          const specializations = [...character.specializations]
          specializations[clickedIndex] = data
          character.updateMany([
            ['specializations', specializations],
          ])
        }
        setClickedIndex(null)
        setInitialState(null)
      }
      else if(dialog === "AbilityScoreChanges") {
        character.updateMany([
          ['abilityScoreChanges', data],
        ])
      }
      else if(dialog === "CoreValues") {
        // character.updateMany([
        //   ['abilityScoreChanges', data],
        // ])
      }
      else if(dialog === "SchoolsOfMagic") {
        character.updateMany([
          ['schoolsOfMagic', data],
        ])
      }
    }
    
    setDialog(null)
  }

  const remove = () => {
    let newSpecializations = [...character.specializations]
    newSpecializations.splice(clickedIndex, 1)
    character.updateMany([
      ['specializations', newSpecializations]
    ])
  }

  return (
    <Paper size="Letter" margin={'0.5in'}>
      <Grid container spacing={2}>

        <Grid xs={12}>
          <Header character={character} />
        </Grid>

        <Grid xs={12} container>
          
          {/* LEFT COLUMN */}
          <Grid xs container>

            <Grid xs={12} container spacing={1}>
              <Grid xs>
                <Inspiration character={character} />
              </Grid>
              <Grid xs={6.8}>
                <HorizontalInput 
                  label="Proficiency Bonus" 
                  value={character.level && ('+' + character.proficiencyBonus)} 
                  orientation="right" 
                />
              </Grid>
            </Grid>

            <Grid xs={12} pb={2}>
              <AbilityScores character={character} />
            </Grid>
            
            <Grid xs={12}>
              <BorderedContainer label={"Proficiencies "} sx={{ height: 431, overflow: 'hidden', pt: 0.5 }}>
                <Specializations character={character} />
              </BorderedContainer>
            </Grid>

            <Grid xs={12}>
              <Clickable>
                <HorizontalInput label="Passive Wisdom (Perception)" orientation="right" />
              </Clickable>
            </Grid>

            <Grid xs={12}>
              <BorderedContainer label ="Other Proficiencies & Languages" sx={{ height: 180 }}>
                <Clickable onClick={() => handleDialogOpen('Languages')}>

                </Clickable>
              </BorderedContainer>
            </Grid>

          </Grid>

          {/* MIDDLE COLUMN */}
          <Grid xs>
            <div>
              <Grid container spacing={2}>

                <Grid container spacing={1}>
                  <Grid xs={6}>
                    <Speed character={character} />
                  </Grid>
                  <Grid xs>
                    <DodgeClass character={character} />
                  </Grid>
                  <Grid xs={6}>
                    <Initiative character={character} />
                  </Grid>
                  <Grid xs>
                    <HitDice character={character} />
                  </Grid>
                </Grid>

                <Grid xs={12} container>
                  <Grid xs={8}>
                    <BorderedContainer label="Hit Points (HP)" sx={{ height: 96 }}>
                      <Clickable>
                        <Typography sx={{ pl: 0.5, pt: 0.75, fontSize: '9px' }}>Max: ______________________</Typography>
                      </Clickable>
                    </BorderedContainer>                  
                  </Grid>
                  <Grid xs={4}>
                    <BorderedContainer label="Temp. HP" sx={{ height: 96 }}>
                      <Clickable>
                        <Typography sx={{ pl: 0.5, pt: 0.75, fontSize: '9px' }}></Typography>
                      </Clickable>
                    </BorderedContainer>
                  </Grid>
                </Grid>
                <Grid xs={12} container>
                  <Grid xs={8}>
                    <BorderedContainer label="Ego" sx={{ height: 96 }}>
                      <Clickable>
                        <Typography sx={{ pl: 0.5, pt: 0.75, fontSize: '9px' }}>Max: ______________________</Typography>
                      </Clickable>
                    </BorderedContainer>                  
                  </Grid>
                  <Grid xs={4}>
                    <BorderedContainer label="Temp. Ego" sx={{ height: 96 }}>
                      <Clickable>
                        <Typography sx={{ pl: 0.5, pt: 0.75, fontSize: '9px' }}></Typography>
                      </Clickable>
                    </BorderedContainer>
                  </Grid>
                </Grid>

                <Grid xs={8}>
                  <BorderedContainer label={"Damage Reduction"} sx={{ height: 71 }}>
                    <Clickable onClick={null}>
                      
                    </Clickable>
                  </BorderedContainer>
                </Grid>
                <Grid xs={4}>
                  <BorderedContainer label={"Armor"} sx={{ height: 71 }}>
                    <Clickable onClick={null}>
                      
                    </Clickable>
                  </BorderedContainer>
                </Grid>
                
                <Grid xs={12}>
                  <BorderedContainer label="Attacks and Spellcasting" sx={{ height: 256 }}>
                    <Clickable onClick={(event) => handleDialogOpen('?', event)}>
                      
                    </Clickable>
                  </BorderedContainer>
                </Grid>
                <Grid xs={12}>
                  <BorderedContainer label ="Equipment" sx={{ height: 232 }}>
                    <Clickable onClick={() => handleDialogOpen('Languages')}>

                    </Clickable>
                  </BorderedContainer>
                </Grid>

              </Grid>
            </div>

          </Grid>

          {/* RIGHT COLUMN */}
          <Grid xs container>

          <Grid xs={12}>
            <Form character={character} onClick={(event) => handleDialogOpen('Form', event)} />
          </Grid>
          <Grid xs={12}>
            <Age character={character} onClick={(event) => handleDialogOpen('Age', event)} />
          </Grid>

          <Grid xs={12}>
            <BorderedContainer
              label="Core Values"
              extraLabels={<Label left="188px">Cnv.</Label>}
              sx={{ height: 273.5 }}
            >
              <Clickable onClick={(event) => handleDialogOpen('CoreValues', event)}>
                <Values character={character} />
              </Clickable>
            </BorderedContainer>
          </Grid>
          <Grid xs={12}>
            <BorderedContainer  
              label={"Miracles"} 
              sx={{ height: 439 }}
            >
              <Clickable onClick={(event) => handleDialogOpen('Miracles', event)}>
                <Miracles character={character} />
              </Clickable>
            </BorderedContainer>
          </Grid>
          {/* <Grid xs={12}>
            <BorderedContainer label={"Damage Reduction"} sx={{ height: 221 }}>
              <Clickable onClick={(event) => handleDialogOpen('DamageReduction', event)}>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Bludgeoning', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Slashing', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Piercing', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Fire', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Cold', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Thunder', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Lightning', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Radiant', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Necrotic', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Psychic', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Force', '0']}</Tuple>
              </Clickable>
            </BorderedContainer>
          </Grid> */}
          </Grid>

        </Grid>

      </Grid>
      <Dialog onClose={() => handleDialogClose()} open={dialog !== null}>
        <Box p={2}>
          {
            dialog === 'Form' ? 
              <FormDialog character={character} close={handleDialogClose} />
            : dialog === 'Age' ? 
              <AgeDialog character={character} close={handleDialogClose} />
            : dialog === 'Specializations' ? 
              <SpecializationDialog character={character} initialState={initialState} close={handleDialogClose} remove={remove} />
            : dialog === 'CoreValues' ? 
              <ValuesDialog character={character} close={handleDialogClose} />
            : dialog === 'Class' ? 
              <ClassDialog character={character} close={handleDialogClose} />
            : null
          }
        </Box>
      </Dialog>
    </Paper>
  )
}