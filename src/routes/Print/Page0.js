import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'

import Paper from './components/Paper'
import BaseInput from './components/BaseInput'
import Container from './components/BorderedContainer'
import HorizontalSpace from './components/HorizontalSpace'
import Note, { Lines } from './components/Note'

function Specialization({ natural, label, label2, label3, header }) {
  return <>
    <Grid container xs={12} sx={{ py: '2px', fontWeight: header && 'bold', fontSize: '12px' }}>
      <Grid>
        {
          !header ? 
          <Checkbox checked={natural} disabled sx={{ color: 'rgba(0,0,0,0.67) !important', p: 0, mb: '1px', '& .MuiSvgIcon-root': { fontSize: 15 } }} /> 
          : 'Nat. '
        }
      </Grid>
      <Grid xs sx={{ pl: !header ? 1.5 : .5 }}>
        {label} 
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '48px', display: !label2 && 'none' }}>
        <Grid>{label2}</Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '48px' }}>
        { header && 'Extra' }
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '48px' }}>
        <Grid>{label3}</Grid>
      </Grid>
    </Grid>
  </>
}

function Specializations({ character }) {
  return <>
    <Specialization natural label="Specialization" label2="Years" label3="Score" header />
    {
      Array(character.totalSpecializations).fill(null).map((_, i) => i+1).map((index) => {
        const key = 'specialization' + index
        const specialization = character[key]
        console.log(specialization)
        const years = specialization.specializationYears
        const natural = specialization.isNatural
        const label = specialization.specializationName
        const score = character.getSpecializationScore(key)
        return <>
          <Specialization natural={natural} label={label} label2={years} label3={score} endLabel={''} />
        </>
      })
    }
  </>
}

function CoreValues({ character }) {
  return <>
    <Score label={"Core Values"} endLabel={"Score"} header />
    {
      Array(character.totalCoreValues).fill(null).map((_, i) => i+1).map((index) => {
        const key = 'coreValue' + index
        const label = character[key]
        const score = character[key+'Score']
        return <>
          <Score label={label} endLabel={score} />
        </>
      })
    }
  </>
}

function Age({ sentienceAgeCategory, sentienceCurrentAge, sentiencePeakBeauty, sentienceBeautyScore, classScore }) {

  function modifyPenalty(penalty) {
    const newPenalty = penalty + classScore
    if(newPenalty > 0) return 0    
    return newPenalty
  }

  const table = [
    ['Age Category', 'Wisdom', 'Max Age', 'Penalty', 'Current', 'Beauty'],
    ['Adolescent', '0', '20%', modifyPenalty(-1), '', ''],
    ['Young Adult', '1', '35%', modifyPenalty(0), '', ''],
    ['Adult', '2', '55%', modifyPenalty(-1), '', ''],
    ['Aging Adult', '3', '75%', modifyPenalty(-2), '', ''],
    ['Elder', '4', '95%', modifyPenalty(-3), '', ''],
    ['Ancient', '5', '125%', modifyPenalty(-4), '', '']
  ]

  if(sentienceAgeCategory === 'Adolescent') table[1][4] = sentienceCurrentAge
  else if(sentienceAgeCategory === 'Young Adult') table[2][4] = sentienceCurrentAge
  else if(sentienceAgeCategory === 'Adult') table[3][4] = sentienceCurrentAge
  else if(sentienceAgeCategory === 'Aging Adult') table[4][4] = sentienceCurrentAge
  else if(sentienceAgeCategory === 'Elder') table[5][4] = sentienceCurrentAge
  else if(sentienceAgeCategory === 'Ancient') table[6][4] = sentienceCurrentAge
  
  table[1][5] = sentienceBeautyScore - Math.abs(0 - sentiencePeakBeauty)
  table[2][5] = sentienceBeautyScore - Math.abs(1 - sentiencePeakBeauty)
  table[3][5] = sentienceBeautyScore - Math.abs(2 - sentiencePeakBeauty)
  table[4][5] = sentienceBeautyScore - Math.abs(3 - sentiencePeakBeauty)
  table[5][5] = sentienceBeautyScore - Math.abs(4 - sentiencePeakBeauty)
  table[6][5] = sentienceBeautyScore - Math.abs(5 - sentiencePeakBeauty)

  return <>
    <Container bsx={{ p: 0 }}>
      {
        table.map((row, index) => {
          const isLast = index === table.length-1
          const rowStyles = { 
            fontSize: '10px', 
            fontWeight: index !== 0 || 'bold',
            borderBottom: isLast ? 0 : '1px dotted black'            
          }

          return <Grid key={'ageRow'+index} container xs={12} sx={rowStyles}>
            <Grid sx={{ p: .5, py: .25, width: '80px' }}>
              {row[0]}
            </Grid>
            <Grid container 
              justifyContent="center" 
              sx={{ p: .5, py: .25, borderLeft: '1px dotted black', width: '56px' }}
            >
              {row[1]}
            </Grid>
            <Grid container 
              justifyContent="center" 
              sx={{ p: .5, py: .25, borderLeft: '1px dotted black', width: '56px' }}
            >
             {row[2]}
            </Grid>
            <Grid container 
              justifyContent="center"
              sx={{ p: .5, py: .25, borderLeft: '1px dotted black', width: '56px' }}
            >
              {row[3]}
            </Grid>
            <Grid container xs 
              justifyContent="center"
              sx={{ p: .5, py: .25, borderLeft: '1px dotted black' }}
            >
              {row[4]}
            </Grid>
            <Grid container xs
              justifyContent="center"
              sx={{ p: .5, py: .25, borderLeft: '1px dotted black' }}
            >
              {row[5]}
            </Grid>
          </Grid>
        })
      }
    </Container>
  </>
}

function Score({ label, label2, label3, endLabel, header }) {
  return <>
    <Grid container xs={12} sx={{ py: '2px', fontWeight: header && 'bold', fontSize: '12px' }}>
      <Grid xs>
        {label} 
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '48px', display: !label2 && 'none' }}>
        <Grid>{label2}</Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '48px' }}>
        <Grid>{endLabel}</Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '48px', display: !label3 && 'none' }}>
        <Grid>{label3}</Grid>
      </Grid>
    </Grid>
  </>
}

function Header({ character }) {
  const classSentience = <b>
    {
      (character.class === 'Common' ||
      character.class === 'Uncommon' ||
      character.class === 'Rare') 
      && character.class
    } 
    {character.sentienceName}&nbsp;
    {
      (character.class === 'Hero' ||
      character.class === 'Legend' ||
      character.class === 'God' ||
      character.class === 'Primordial') 
      && character.class
    }
  </b>

  return <>    
    <h1 style={{ marginTop: 0, fontSize: '24px' }}>Hero Drop</h1>
    <span style={{ margin: 0, fontSize: '36px', fontWeight: 'bold' }}>{character.characterName}</span>
    <span style={{ marginLeft: '12px'}}>the <b>{classSentience}</b></span>
    <div style={{ fontSize: '12px' }}>Played by <b>{character.playerName}</b></div>
  </>
}

function Resources({ character }) {
  return <>
    <Grid xs={6}>
      <Container label={'Health'} 
        label2={'Max: ' + character.getMaxHealth()} 
        label3={'Recovery: ' + character.getRecovery()} 
        bsx={{ height: 74.5 }}>
      </Container>
    </Grid>
        
    <Grid xs={3}>
      <Container label={'Speed'} bsx={{ height: 74.5 }}>
        <Grid sx={{ width: '100%', fontSize: '24px' }} container justifyContent="center" alignItems="center">
          {character.getSpeed()}
        </Grid>
      </Container>
    </Grid>

    <Grid xs={3}>
      <Container label={'Initiative'} bsx={{ height: 74.5 }}>
        <Grid sx={{ width: '100%', fontSize: '24px' }} container justifyContent="center" alignItems="center">
          {character.getInitiative()}
        </Grid>
      </Container>
    </Grid>

    <Grid xs={3}>
      <Container label={'Stamina'} 
        label2={'Max: ' + character.getMaxStamina()} 
        bsx={{ height: 74.5 }}>
      </Container>
    </Grid>

    <Grid xs={3}>
      <Container label={'Ego'} 
        label2={'Max: ' + character.getMaxEgo()} 
        bsx={{ height: 74.5 }}>
      </Container>
    </Grid>

    <Grid xs={3}>
      <Container label={'Inspiration'} 
        label2={'Max: ' + character.getMaxInspiration()} 
        bsx={{ height: 74.5 }}>
      </Container>
    </Grid>

    <Grid xs={3}>
      <Container label={'Mana'} 
        label2={'Max: ' + character.getMaxMana()} 
        bsx={{ height: 74.5 }}>
      </Container>
    </Grid>
  </>
}

function PrimaryTraits({ character }) {
  return <>
    <Score label="Primary Traits" label3="Score" endLabel="Bonus" header />
    <Score label="Awareness" label3={character.getTraitScore("Awareness") || '0'} />
    <Score label="Charisma" label3={character.getTraitScore("Charisma") || '0'} />
    <Score label="Dodge" label3={character.getTraitScore("Dodge") || '0'} />
    <Score label="Intelligence" label3={character.getTraitScore("Intelligence") || '0'} />
    <Score label="Lethal" label3={character.getTraitScore("Lethal") || '0'} />
    <Score label="Luck" label3={character.getTraitScore("Luck") || '0'} />
    <Score label="Move Speed" label3={character.getTraitScore("Move Speed") || '0'} />
    <Score label="Spellcasting" label3={character.getTraitScore("Spellcasting") || '0'} />
    <Score label="Strength" label3={character.getTraitScore("Strength") || '0'} />
    <Score label="Wealth" label3={character.getTraitScore("Wealth") || '0'} />
  </>
}

function DamageReduction({ character }) {
  return <>
    <Score
      label="Damage Reduction"
      label3="Score"
      endLabel="Bonus"
      header
    />
    <Score
      label="Physical" 
      label3={character.getTraitScore("Physical") || '0'} 
    />
    <Score
      label="Fire" 
      label3={character.getTraitScore("Fire") || '0'} 
    />
    <Score
      label="Cold" 
      label3={character.getTraitScore("Cold") || '0'} 
    />
    <Score
      label="Lightning" 
      label3={character.getTraitScore("Lightning") || '0'} 
    />
    <Score
      label="Thunder" 
      label3={character.getTraitScore("Thunder") || '0'} 
    />
    <Score
      label="Psychic" 
      label3={character.getTraitScore("Psychic") || '0'} 
    />
    <Score 
      label="Radiant"
      label3={character.getTraitScore("Radiant") || '0'}
    />
    <Score
      label="Necrotic" 
      label3={character.getTraitScore("Necrotic") || '0'} 
    />
    <Score
      label="Force" 
      label3={character.getTraitScore("Force") || '0'} 
    />
  </>
}

function LeftColumn({ character }) {
  return <>
    <Score label="Character" endLabel="Score" header />
    <Score label="Class Score" endLabel={character.getClassScore()} />
    <Score label="Sentience Score" endLabel={character.sentienceScore} />
    <Score label={"Size: " + character.getSize()} endLabel={character.getSizeScore()} />
    <br />
    <Specializations character={character} />
    <Specialization />
    <Specialization />
    <Specialization />
    <Specialization />
    <Specialization />
    <Specialization />
    <Specialization />
  </>
}

function RightColumn({ character }) {
  return <>
    <Grid container spacing={2}>
      
    </Grid>
  </>
}

export default function Page0({ character }) {
  return <Paper page="0" size="Letter" margin={'0.4in'} landscape>
    <Grid container spacing={2}>
      <Grid xs={7.5}>
        <Header character={character} />
      </Grid>
      <Grid container xs={4.5}>
        <Grid xs={12}>
          <Age 
            sentienceAgeCategory={character.sentienceAgeCategory}
            sentienceCurrentAge={character.getAge()}
            sentienceBeautyScore={character.beautyScore}
            sentiencePeakBeauty={character.sentiencePeakBeauty}
            classScore={character.getClassScore()}
          />
        </Grid>
        <Resources character={character} />
      </Grid>
    </Grid>
  </Paper>
}