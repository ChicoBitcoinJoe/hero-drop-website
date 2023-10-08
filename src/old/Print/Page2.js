import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import Paper from '../../components/Paper'
import BorderedContainer, { ExtraLabels } from '../../components/BorderedContainer'
import Note from '../../components/Note'

function Score({ label, label2, label3, endLabel, header }) {
  return <>
    <Grid container xs={12} sx={{ py: '2px', fontWeight: header && 'bold', fontSize: '9px' }}>
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

function Resources({ character }) {
  return <>
    <Grid xs={12}>
      <BorderedContainer label={'Health'} sx={{ height: '118px' }}>
        <ExtraLabels 
          label2={'Max: ' + character.getMaxHealth()} 
          label3={'Recovery: ' + character.getRecovery()} 
        />
      </BorderedContainer>
    </Grid>

    <Grid xs={6}>
      <BorderedContainer label={'Stamina'} sx={{ height: '72px' }}>
        <ExtraLabels label2={'Max: ' + character.getMaxStamina()}  />
      </BorderedContainer>
    </Grid>

    <Grid xs={6}>
      <BorderedContainer label={'Mana'} sx={{ height: '72px' }}>
        <ExtraLabels label2={'Max: ' + character.getMaxMana()} />
      </BorderedContainer>
    </Grid>

    <Grid xs={6}>
      <BorderedContainer label={"Size Die"}>
        <Grid container justifyContent={'center'} alignItems={'center'} sx={{ height: '48px' }}>
          {character.getSizeDie()}
        </Grid>
      </BorderedContainer>
    </Grid>

    <Grid xs={6}>
      <BorderedContainer label={"Lethal Die"}>
        <Grid container justifyContent={'center'} alignItems={'center'} sx={{ height: '48px' }}>
        {character.getLethalDie()}
        {/* +{character.getTraitScore('Lethal')} */}
        </Grid>
      </BorderedContainer>
    </Grid>

    <Grid xs={4}>
      <BorderedContainer label={"Dodge"}>
        <Grid container justifyContent={'center'} alignItems={'center'} sx={{ height: '48px' }}>
          {character.getDodge()}
        </Grid>
      </BorderedContainer>
    </Grid>

    <Grid xs={4}>
      <BorderedContainer label={"Speed"}>
        <Grid container justifyContent={'center'} alignItems={'center'} sx={{ height: '48px' }}>
          {character.getSpeed()}
        </Grid>
      </BorderedContainer>
    </Grid>

    <Grid xs={4}>
      <BorderedContainer label={"Alertness"}>
        <Grid container justifyContent={'center'} alignItems={'center'} sx={{ height: '48px' }}>
          +{character.getTraitScore('Alertness')*10}
        </Grid>
      </BorderedContainer>
    </Grid>

    <Grid xs={12}>
      <BorderedContainer label={'Conditions and Effects'} sx={{ height: 164 }}></BorderedContainer>
    </Grid>
  </>
}

function DR({ label, label2, header }) {
  return <>
    <Grid container xs={12} sx={{ p: '8px', fontWeight: header && 'bold', fontSize: '9px', borderBottom: '1px solid rgba(0,0,0,0.25)' }}>
      <Grid xs={3}>
        {label} 
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '32px' }}>
        <Grid>{label2}</Grid>
      </Grid>
      <Grid container xs justifyContent="center">
        <Grid>{ header && 'Bonuses'}</Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '32px' }}>
        <Grid><b>{ header && 'Total'}</b></Grid>
      </Grid>
    </Grid>
  </>
}

function DamageReduction({ character }) {
  return <>
    <DR header
      label="Trait"
      label2="Score"
      label3="Size"
      label4="Total"
    />
    <DR
      label="Slashing" 
      label2={character.getTraitScore("Slashing") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Bludgeoning" 
      label2={character.getTraitScore("Bludgeoning") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Piercing" 
      label2={character.getTraitScore("Piercing") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Fire" 
      label2={character.getTraitScore("Fire") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Cold" 
      label2={character.getTraitScore("Cold") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Lightning" 
      label2={character.getTraitScore("Lightning") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Thunder" 
      label2={character.getTraitScore("Thunder") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Poison" 
      label2={character.getTraitScore("Poison") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Acid" 
      label2={character.getTraitScore("Acid") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Psychic" 
      label2={character.getTraitScore("Psychic") || '0'} 
      label3={'0'}
    />
    <DR 
      label="Radiant"
      label2={character.getTraitScore("Radiant") || '0'}
      label3={'0'}
    />
    <DR
      label="Necrotic" 
      label2={character.getTraitScore("Necrotic") || '0'} 
      label3={character.getSizeScore() || '0'}
    />
    <DR
      label="Force" 
      label2={character.getTraitScore("Force") || '0'} 
      label3={'0'}
    />
  </>
}

export default function Page2({ character }) {
  const { data, onChange } = character

  return <Paper page="1" size="Letter" margin={'0.5in'}>
    <Grid container spacing={2}>

      <Grid container xs={4}>
        <Grid container xs={12}>
          <Resources character={character} />
        </Grid>
        
        <Grid xs={12}>
          <BorderedContainer>
            <Score label="Sentience Weight" endLabel={character.sentienceWeight} />
            <Score label="Total Carried Weight" endLabel={''} />
            <Score label="Carry Capacity" endLabel={character.getCarryCapacity()} header />
          </BorderedContainer>
        </Grid>
      </Grid>

      <Grid container xs={8}>
        <Grid xs={6}>
          <BorderedContainer label="Attacks and Spellcasting" sx={{ height: 327 }}>

          </BorderedContainer>
        </Grid>
        <Grid xs={6}>
          <BorderedContainer label="Damage Reduction">
            <DamageReduction character={character} />
          </BorderedContainer>
        </Grid>
        <Grid xs={12}>
          <Note label="Character History" height={244} />
        </Grid>
      </Grid>

      <Grid container xs={12}>        
        <Grid xs={4}>
          <Note label="Equipped Gear" height={374} />
        </Grid>  
        <Grid xs={4}>
          <Note label="Backpack" height={374} />
        </Grid>  
        <Grid xs={4}>
          <Note label="Stored Gear" height={374} />
        </Grid>  
      </Grid>
      
    </Grid>
  </Paper>
}