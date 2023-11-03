import * as React from 'react'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { convertScoreToDamageDie } from '../../hooks/useCharacter'

import BorderedContainer, { Label } from '../BorderedContainer'
import Clickable from '../Clickable'
import HorizontalInput from '../HorizontalInput'
import Paper from '../Paper'

import HeaderDialog from './dialogs/HeaderDialog'
import FormDialog from './dialogs/FormDialog'
import AgeDialog from './dialogs/AgeDialog'
import AbilityScoreDialog from './dialogs/AbilityScoreDialog'
import SpecializationDialog from './dialogs/SpecializationsDialog'
import ValuesDialog from './dialogs/ValuesDialog'
import ClassDialog from './dialogs/ClassDialog'

import Form from './components/Form'
import Age from './components/Age'
import Score from './components/Score'
import Header from './components/Header'
import Specializations from './components/Specializations'
import Values from './components/Values'
import Miracles from './components/Miracles'
import AbilityScore from './components/AbilityScore'
import ClassBox from './components/ClassBox'

function Tuple({ children, sx }){
  return (
    <Grid container sx={{ p: 1, ...sx }}>
      <Grid xs>
        <Typography sx={{ fontSize: '10px' }}>{children[0]}</Typography>
      </Grid>
      <Grid xs={1} container justifyContent={'cneter'}>
        <Typography sx={{ fontSize: '10px' }}>{children[1]}</Typography>
      </Grid>
    </Grid>
  )
}

function Incrementer({ label, score, increment, decrement, current, max, sx }){
  const scoreMax = Math.round(max / 2)
  return (
    <Grid xs={12} container sx={{ p: 1, pt: 0, ...sx }}>
      <Grid xs={6} container alignItems={'center'}>
        <Typography sx={{ fontSize: '16px' }}>{label}</Typography>
      </Grid>
      <Grid xs container>
        <Grid xs={4}>
          <IconButton onClick={decrement} disabled={score === 0}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Grid>
        <Grid xs={4} container justifyContent={'center'} alignItems={'center'}>
          <Typography sx={{ fontSize: '16px' }}>{score}</Typography>
        </Grid>
        <Grid xs={4}>
          <IconButton onClick={increment} disabled={score >= scoreMax || current >= max}>
            <ArrowBackIosNewIcon sx={{ rotate: '180deg' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

function SchoolsOfMagicDialog({ character, initialState, close, submit }) {
  const [state, setState] = React.useState({
    Abjuration: 0,
    Conjuration: 0,
    Divination: 0,
    Enchantment: 0,
    Evocation: 0,
    Illusion: 0,
    Necromancy: 0,
    Transmutation: 0,
    ...(initialState || {})
  })

  let current = 0
  const keys = Object.keys(state)
  for(let i = 0; i < 8; i++) {
    current += state[keys[i]]
  }
  const max = character.magic

  function increment(label) {
    console.log({
      ...state,
      [label]: state[label]+1
    })
    setState({
      ...state,
      [label]: state[label]+1
    })
  }
  
  function decrement(label) {
    setState({
      ...state,
      [label]: state[label]-1
    })
  }

  function onClick() {
    submit(state)
  }

  return (
    <Grid container spacing={2} sx={{ maxWidth: '260px' }} justifyContent={'center'}>
      <Typography sx={{ p: 3, fontSize: '20px' }}>{current} / {max} Learned</Typography>
      <Typography sx={{ p: 3, pt: 0, fontSize: '14px', textAlign: 'center' }}>The highest score cannot be higher than half of max ({ Math.round(max / 2) })</Typography>
      <Incrementer label="Abjuration" score={state.Abjuration} current={current} max={character.magic} increment={() => increment("Abjuration")} decrement={() => decrement("Abjuration")}/>
      <Incrementer label="Conjuration" score={state.Conjuration} current={current} max={character.magic} increment={() => increment("Conjuration")} decrement={() => decrement("Conjuration")}/>
      <Incrementer label="Divination" score={state.Divination} current={current} max={character.magic} increment={() => increment("Divination")} decrement={() => decrement("Divination")}/>
      <Incrementer label="Enchantment" score={state.Enchantment} current={current} max={character.magic} increment={() => increment("Enchantment")} decrement={() => decrement("Enchantment")}/>
      <Incrementer label="Evocation" score={state.Evocation} current={current} max={character.magic} increment={() => increment("Evocation")} decrement={() => decrement("Evocation")}/>
      <Incrementer label="Illusion" score={state.Illusion} current={current} max={character.magic} increment={() => increment("Illusion")} decrement={() => decrement("Illusion")}/>
      <Incrementer label="Necromancy" score={state.Necromancy} current={current} max={character.magic} increment={() => increment("Necromancy")} decrement={() => decrement("Necromancy")}/>
      <Incrementer label="Transmutation" score={state.Transmutation} current={current} max={character.magic} increment={() => increment("Transmutation")} decrement={() => decrement("Transmutation")}/>
      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={close}>cancel</Button>
      </Grid>
      <Grid xs={6}>
        <Button fullWidth variant="outlined" sx={{ py: 2 }} onClick={onClick}>Continue</Button>
      </Grid>
    </Grid>
  )
}

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
      if(dialog === 'Header') {
        character.updateMany([
          ['name', data.characterName],
          ['title', data.characterTitle],
          ['form', { ...character.form, name: data.formName }],
          ['level', data.level],
          ['playerName', data.playerName],
        ])
      }
      else if(dialog === 'Class') {
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
          <Header character={character} onClick={(event) => handleDialogOpen('Header', event)}/>
        </Grid>

        {/* LEFT COLUMN */}
        <Grid xs={4} container>

          <Grid xs={12} container spacing={1}>
            <Grid xs>
              <Clickable>
                <HorizontalInput label="Inspiration" value={character.inspiration}/>
              </Clickable>
            </Grid>
            <Grid xs={6.8}>
              <Clickable>
                <HorizontalInput label="Proficiency Bonus" />
              </Clickable>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <Clickable onClick={(event) => handleDialogOpen('AbilityScoreChanges', event)}>
              <Grid container spacing={.5}>
                <Grid xs={4}>
                  <AbilityScore 
                    ability="DEX" 
                    score={character.dexterity} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={4} pb={1}>
                  <AbilityScore 
                    ability="STR" 
                    score={character.strength} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={4}>
                  <AbilityScore 
                    ability="CON" 
                    score={character.constitution} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={4}>
                  <AbilityScore 
                    ability="INT" 
                    score={character.intelligence} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={4}>
                  <AbilityScore 
                    ability="WIS" 
                    score={character.wisdom} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
                <Grid xs={4}>
                  <AbilityScore 
                    ability="CHA" 
                    score={character.charisma} 
                    dieFn={convertScoreToDamageDie}
                  />
                </Grid>
              </Grid>
            </Clickable>
          </Grid>
          {/* <Grid xs={12}>
            <BorderedContainer label={"Saving Throws"} sx={{  }}>
              <Clickable onClick={(event) => handleDialogOpen('DamageReduction', event)}>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Strength', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Dexterity', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Constitution', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Intelligence', '0']}</Tuple>
                <Tuple sx={{ pb: 0, pt: 0.5 }}>{['Wisdom', '0']}</Tuple>
                <Tuple sx={{ pb: 0.5, pt: 0.5 }}>{['Charisma', '0']}</Tuple>
              </Clickable>
            </BorderedContainer>
          </Grid> */}
          <Grid xs={12}>
            <BorderedContainer label={"Specializations "} sx={{ height: 431, overflow: 'hidden', pt: 0.5 }}>
              <Specializations character={character} handleDialogOpen={handleDialogOpen} />
            </BorderedContainer>
          </Grid>
          <Grid xs={12}>
            <Clickable>
              <HorizontalInput label="Passive Wisdom (Perception)" orientation="right" />
            </Clickable>
          </Grid>

          <Grid xs={12}>
            <BorderedContainer label ="Proficiencies & Languages" sx={{ height: 188 }}>
              <Clickable onClick={() => handleDialogOpen('Languages')}>

              </Clickable>
            </BorderedContainer>
          </Grid>

          

        </Grid>

        {/* MIDDLE COLUMN */}
        <Grid xs={4}>
          <div>
            <Grid container spacing={2}>

              <Grid container spacing={1}>
                <Grid xs={6}>
                  <Clickable>
                    <HorizontalInput label="Speed" />
                  </Clickable>
                </Grid>
                <Grid xs>
                  <Clickable>
                    <HorizontalInput label="Dodge Class" orientation="right" />
                  </Clickable>
                </Grid>
                <Grid xs={6}>
                  <Clickable>
                    <HorizontalInput label="Initiative" />
                  </Clickable>
                </Grid>
                <Grid xs>
                  <Clickable>
                    <HorizontalInput label="Hit Dice" orientation="right" />
                  </Clickable>
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

              <Grid xs={12}>
                <BorderedContainer label={"Damage Reduction"} sx={{ p: 1}}>
                  <Clickable onClick={(event) => handleDialogOpen('DamageReduction', event)}>
                    <Grid container spacing={1} sx={{ fontSize: '10px' }}>
                      <Grid xs={6}>From Armor</Grid>
                      <Grid xs={6}></Grid>
                      <Grid xs={6}>From Size</Grid>
                      <Grid xs={6}></Grid>
                      <Grid xs={6}>From Other Sources</Grid>
                      <Grid xs={6}></Grid>
                    </Grid>
                  </Clickable>
                </BorderedContainer>
              </Grid>
              
              <Grid xs={12}>
                <BorderedContainer label="Attacks and Spellcasting" sx={{ height: 248 }}>
                  <Clickable onClick={(event) => handleDialogOpen('?', event)}>
                    
                  </Clickable>
                </BorderedContainer>
              </Grid>
              <Grid xs={12}>
                <BorderedContainer label ="Equipment" sx={{ height: 240 }}>
                  <Clickable onClick={() => handleDialogOpen('Languages')}>

                  </Clickable>
                </BorderedContainer>
              </Grid>

            </Grid>
          </div>

        </Grid>

        {/* RIGHT COLUMN */}
        <Grid xs={4} container>

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
              <AbilityScoreDialog character={character} submit={handleDialogClose} close={() => handleDialogClose()} />
            : dialog === 'CoreValues' ? 
              <ValuesDialog character={character} submit={handleDialogClose} close={() => handleDialogClose()} />
            : dialog === 'Class' ? 
              <ClassDialog character={character} submit={handleDialogClose} close={() => handleDialogClose()} />
            : dialog === 'SchoolsOfMagic' ? 
              <SchoolsOfMagicDialog character={character} initialState={initialState} submit={handleDialogClose} close={() => handleDialogClose()} />
            : null
          }
        </Box>
      </Dialog>
    </Paper>
  )
}