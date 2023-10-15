import * as React from 'react'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '../Paper'

import BorderedContainer, { Label } from '../BorderedContainer'
import Clickable from '../Clickable'
import Header from './components/Header'
import HeaderDialog from './dialogs/HeaderDialog'
import Form from './components/Form'
import FormDialog from './dialogs/FormDialog'
import Age from './components/Age'
import AgeDialog from './dialogs/AgeDialog'
import AbilityScoreDialog from './dialogs/AbilityScoreDialog'
import Specializations from './components/Specializations'
import SpecializationDialog from './dialogs/SpecializationsDialog'
import Values from './components/Values'
import ValuesDialog from './dialogs/ValuesDialog'
import Miracles from './components/Miracles'
import AbilityScore from './components/AbilityScore'
import { getCurrentNaturals, getMaxNaturals, convertScoreToDamageDie } from '../../hooks/useCharacter'

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
    else {
      setInitialState(null)
      setClickedIndex(null)
    }
  }

  const handleDialogClose = (data) => {
    console.log({ dialog, data, clickedIndex })
    if(data) {
      if(dialog === 'Header') {
        character.updateMany([
          ['name', data.characterName],
          ['form', { ...character.form, name: data.formName }],
          ['level', data.level],
          ['playerName', data.playerName],
        ])
      }
      else if(dialog === "Form") {
        character.updateMany([
          ['form', { ...character.form, ...data }],
        ])
      }
      else if(dialog === "Age") {
        character.updateMany([
          ['age', data],
        ])
      }
      else if(dialog === "Specializations") {
        if(clickedIndex === 'new') {
          character.updateMany([
            ['specializations', [...character.specializations, data]],
          ])
        }
        else if(clickedIndex === 'form') {
          character.updateMany([
            ['form', {...character.form, ...data}],
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
          ['abilityScoreModifiers', data],
        ])
      }
      else if(dialog === "CoreValues") {
        character.updateMany([
          ['abilityScoreModifiers', data],
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
  
  const current = getCurrentNaturals(character.specializations)
  const max = getMaxNaturals(character)

  return (
    <Paper size="Letter" margin={'0.5in'}>
      <Grid container spacing={2}>

        <Grid xs={12}>
          <Header character={character} onClick={(event) => handleDialogOpen('Header', event)}/>
        </Grid>

        <Grid xs={7} container>
          <Grid xs={4}>
            <BorderedContainer label={"Form" + (character.form.name && (": " + character.form.name))}>
              <Clickable sx={{ p: 1 }} onClick={(event) => handleDialogOpen('Form', event)}>
                <Form character={character} />
              </Clickable>
            </BorderedContainer>
          </Grid>
          <Grid xs={8}>
            <Clickable onClick={(event) => handleDialogOpen('Age', event)}>
              <Age character={character} />
            </Clickable>
          </Grid>
          <Grid xs>
            <BorderedContainer label={"Specializations "}
              sx={{ height: 498, overflow: 'hidden' }}
              extraLabels={<>
                <Label left="132px">Training</Label>
                <Label left="180px">Score</Label>
              </>}
            >
              <Specializations character={character} handleDialogOpen={handleDialogOpen} />
            </BorderedContainer>
          </Grid>
          <Grid xs={4.35}>
            <Clickable onClick={(event) => handleDialogOpen('AbilityScoreChanges', event)} >
              <Grid container spacing={1}>
                <Grid xs={12}>
                  <AbilityScore 
                    ability="CON" 
                    score={character.constitution} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={12}>
                  <AbilityScore 
                    ability="DEX" 
                    score={character.dexterity} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={12}>
                  <AbilityScore 
                    ability="STR" 
                    score={character.strength} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={12}>
                  <AbilityScore 
                    ability="LTH" 
                    score={character.lethality} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={12}>
                  <AbilityScore 
                    ability="INT" 
                    score={character.intelligence} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={12}>
                  <AbilityScore 
                    ability="WIS" 
                    score={character.wisdom} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={12}>
                  <AbilityScore 
                    ability="CHA" 
                    score={character.charisma} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={12}>
                  <AbilityScore 
                    ability="MAG" 
                    score={character.magic} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
              </Grid>
            </Clickable>
          </Grid>
          <Grid xs={12}>
            <Clickable onClick={(event) => handleDialogOpen('?', event)}>
              <BorderedContainer
                sx={{ height: 184 }}
              >
                
              </BorderedContainer>
            </Clickable>
          </Grid>
        </Grid>

        <Grid xs={5} container>
          <Grid xs={12}>
            <Clickable onClick={(event) => handleDialogOpen('CoreValues', event)}>
              <BorderedContainer
                label="Core Values"
                extraLabels={<>
                  <Label left="224px">Conviction</Label>
                </>}
                sx={{ height: 194 }}
              >
                <Values character={character} />
              </BorderedContainer>
            </Clickable>
          </Grid>
          <Grid xs={6}>
            <Clickable onClick={(event) => handleDialogOpen('SchoolsOfMagic', event)}>
              <BorderedContainer label={"Schools of Magic"} 
                sx={{ height: 241 }}
              >
                <Miracles character={character} />
              </BorderedContainer>
            </Clickable>
          </Grid>
          <Grid xs={6}>
            <Clickable onClick={(event) => handleDialogOpen('DamageReduction', event)}>
              <BorderedContainer label={"Damage Reduction"} 
                sx={{ height: 241 }}
              >
                <Miracles character={character} />
              </BorderedContainer>
            </Clickable>
          </Grid>
          <Grid xs={12}>
            <Clickable onClick={(event) => handleDialogOpen('Miracles', event)}>
              <BorderedContainer  
                label={"Miracles"} 
                sx={{ height: 442 }}
              >
                <Miracles character={character} />
              </BorderedContainer>
            </Clickable>
          </Grid>
        </Grid>
        
      </Grid>
      <Dialog onClose={() => handleDialogClose()} open={dialog !== null}>
        <Box p={2}>
          {
            dialog === 'Header' ?
              <HeaderDialog character={character} submit={handleDialogClose} close={() => handleDialogClose()} />
            : dialog === 'Form' ? 
              <FormDialog character={character} submit={handleDialogClose} close={() => handleDialogClose()} />
            : dialog === 'Age' ? 
              <AgeDialog character={character} submit={handleDialogClose} close={() => handleDialogClose()} />
            : dialog === 'Specializations' ? 
              <SpecializationDialog character={character} initialState={initialState} submit={handleDialogClose} close={() => handleDialogClose()} remove={remove} />
            : dialog === 'AbilityScoreChanges' ? 
              <AbilityScoreDialog character={character} initialState={initialState} submit={handleDialogClose} close={() => handleDialogClose()} remove={remove} />
            : dialog === 'CoreValues' ? 
              <ValuesDialog character={character} initialState={initialState} submit={handleDialogClose} close={() => handleDialogClose()} remove={remove} />
            : null
          }
        </Box>
      </Dialog>
    </Paper>
  )
}