import * as React from 'react'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '../Paper'

import BorderedContainer, { Label } from '../BorderedContainer'
import Clickable from '../Clickable'
import Header from './components/Header'
import HeaderDialog from './components/Dialogs/HeaderDialog'
import { Form, FormDialog } from './components/Form'
import Age from './components/Age'
import AgeDialog from './components/Dialogs/AgeDialog'
import AbilityScoreDialog from './components/Dialogs/AbilityScoreDialog'
import Specializations from './components/Specializations'
import SpecializationDialog from './components/Dialogs/SpecializationsDialog'
import Values from './components/Values'
import Miracles from './components/Miracles'
import AbilityScore from './components/AbilityScore'
import { getCurrentNaturals, getMaxNaturals } from '../../hooks/useCharacter'


export default function Page1({ character }) {  
  console.log(character)
  const [dialog, setDialog] = React.useState(null)
  const [initialState, setInitialState] = React.useState(null)
  const [clickedIndex, setClickedIndex] = React.useState(null)

  const handleClickOpen = (dialogId, event, index) => {
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

  const handleClose = (data) => {
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
      else if(dialog === "AbilityScoreModifiers") {
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
          <Header character={character} onClick={(event) => handleClickOpen('Header', event)}/>
        </Grid>

        <Grid xs={6} container>

          <Grid xs={5}>
            <BorderedContainer label={"Form" + (character.form.name && (": " + character.form.name))}>
              <Clickable sx={{ p: 1 }} onClick={(event) => handleClickOpen('Form', event)}>
                <Form character={character} />
              </Clickable>
            </BorderedContainer>
          </Grid>
          <Grid xs={7} sx={{ mt: '0px' }}>
            <Clickable onClick={(event) => handleClickOpen('AbilityScoreModifiers', event)} >
              <Grid container spacing={1}>
                <Grid xs={6}>
                  <AbilityScore label="CON" score={character.constitution}
                  />
                </Grid>
                <Grid xs={6}>
                  <AbilityScore label="INT" score={character.intelligence}
                  />
                </Grid>
                <Grid xs={6}>
                  <AbilityScore label="DEX" score={character.dexterity}
                  />
                </Grid>
                <Grid xs={6}>
                  <AbilityScore label="WIS" score={character.wisdom}
                  />
                </Grid>
                <Grid xs={6}>
                  <AbilityScore label="STR" score={character.strength}
                  />
                </Grid>
                <Grid xs={6}>
                  <AbilityScore label="CHA" score={character.charisma}
                  />
                </Grid>
              </Grid>
            </Clickable>
          </Grid>

          <Grid xs={12}>
            <Clickable onClick={(event) => handleClickOpen('Age', event)}>
              <Age character={character} />
            </Clickable>
          </Grid>

          <Grid xs={12}>
            <BorderedContainer 
              sx={{ height: 518, overflow: 'hidden' }}
              label={"Specializations " + (character.form.aptitude && "(Natural " + current + "/" + max + ")")}
              extraLabels={<>
                <Label left="248px">Training</Label>
                <Label left="300px">Score</Label>
              </>}
            >
              <Specializations character={character} handleClickOpen={handleClickOpen} />
            </BorderedContainer>
          </Grid>

        </Grid>

        <Grid xs={6} container>
          <Grid xs={12}>
            <BorderedContainer 
              onClick={(event) => handleClickOpen('Description', event)} 
              label="Character Description" 
              sx={{ p: 1, height: 193 }} 
            />
          </Grid>
          <Grid xs={12}>
            <BorderedContainer 
              onClick={(event) => handleClickOpen('Values', event)} 
              label="Values" label2="Conviction" 
              sx={{ p: 1, height: 165 }}
            >
              <Values character={character} />
            </BorderedContainer>
          </Grid> 
          <Grid xs={12}>
            <BorderedContainer 
              onClick={(event) => handleClickOpen('Miracles', event)} 
              label={"Miracles"} 
              sx={{ height: 518 }}
            >
              <Miracles character={character} />
            </BorderedContainer>
          </Grid>
        </Grid>
      </Grid> 
      <Dialog onClose={() => handleClose()} open={dialog !== null}>
        <Box p={2}>
          {
            dialog === 'Header' ?
              <HeaderDialog character={character} submit={handleClose} close={() => handleClose()} />
            : dialog === 'Form' ? 
              <FormDialog character={character} submit={handleClose} close={() => handleClose()} />
            : dialog === 'Age' ? 
              <AgeDialog character={character} submit={handleClose} close={() => handleClose()} />
            : dialog === 'Specializations' ? 
              <SpecializationDialog character={character} initialState={initialState} submit={handleClose} close={() => handleClose()} remove={remove} />
            : dialog === 'AbilityScoreModifiers' ? 
              <AbilityScoreDialog character={character} initialState={initialState} submit={handleClose} close={() => handleClose()} remove={remove} />
            : null
          }
        </Box>
      </Dialog>
    </Paper>
  )
}