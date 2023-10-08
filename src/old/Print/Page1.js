import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'

import Paper from './components/Paper'
import BorderedContainer from '../../components/BorderedContainer'

function Header({ character }) {
  const classSentience = <b>
    {
      (character.characterClass === 'Common' ||
      character.characterClass === 'Uncommon' ||
      character.characterClass === 'Rare') 
      && character.characterClass
    } 
    {character.sentienceName || 'Unknown Sentience'}&nbsp;
    {
      (character.characterClass === 'Hero' ||
      character.characterClass === 'Legend' ||
      character.characterClass === 'God' ||
      character.characterClass === 'Primordial') 
      && character.characterClass
    }
  </b>

  return <>    
    <h1 style={{ marginTop: 0, fontSize: '24px' }}>Hero Drop</h1>
      {
        character.characterName ? <>
          <span style={{ margin: 0, fontSize: '36px', fontWeight: 'bold' }}>{character.characterName}</span>
          <span style={{ marginLeft: '12px'}}>{ classSentience && 'the '}<b>{classSentience}</b></span>
          <div style={{ fontSize: '12px' }}>Played by <b>{character.playerName || 'Player Name'}</b></div>
        </> : <>
          <Grid container spacing={1} alignItems={'end'} sx={{ height: '80px' }}>
            <Grid xs={4}>
              <InputBase fullWidth />
              <div style={{ borderTop: '1px solid black', fontSize: '9px' }}>Character Name</div>
            </Grid>
            <Grid xs={4}>
              <InputBase fullWidth />
              <div style={{ borderTop: '1px solid black', fontSize: '9px' }}>Player Name</div>
            </Grid>
            <Grid xs={2}>
              <InputBase fullWidth />
              <div style={{ borderTop: '1px solid black', fontSize: '9px' }}>Class</div>
            </Grid>
            <Grid xs={2}>
              <InputBase fullWidth />
              <div style={{ borderTop: '1px solid black', fontSize: '9px' }}>Sentience</div>
            </Grid>
          </Grid>
        </>
      }
    
    
  </>
}

function Miracles({ character }) {
  return <Grid>
    {
      Array(character.totalMiracles).fill(null).map((_, i) => i+1).map((index) => {
        const key = 'Miracle' + index
        const label = character[key]
        return <React.Fragment key={key}>
          <Score label={label} />
        </React.Fragment>
      })
    }
  </Grid>
}

function BorderedSpecializations({ container, label, label2, children, spacing, height, sx }){
  const bsx ={
    height: height + ' !important', 
    position: 'relative',
    border: 'solid black',
    borderWidth: '2px 1px 2px 1px',
    borderRadius: '4px',
    p: 0.5,
    ...sx
  }

  const baseLabelStyles = {
    padding: '0 2px', 
    margin: '0 0 0 6px', 
    position: 'absolute', 
    backgroundColor: 'white',
    fontSize: '9px'
  }

  const startLabelStyles = {
    ...baseLabelStyles,
    top: '-8px', 
  }
  
  const middleLabel1Styles = {
    ...baseLabelStyles,
    top: '-8px', 
    right: '160px',
  }
  const middleLabel2Styles = {
    ...baseLabelStyles,
    top: '-8px', 
    right: '100px',
  }

  const endLabelStyles = {
    ...baseLabelStyles,
    top: '-8px', 
    right: '20px',
  }

  return <Grid container={container} sx={bsx} spacing={spacing}>
    <h6 style={startLabelStyles}>Specializations</h6>
    <h6 style={middleLabel1Styles}>Years</h6>
    <h6 style={middleLabel2Styles}>Bonus </h6>
    <h6 style={endLabelStyles}>Score</h6>
    {children ? children : <>&nbsp;</>}
  </Grid>
}

function Specializations({ character }) {

  // function Specialization({ natural, label, label2, label3, header }) {
  //   return <>
  //     <Grid container xs={12} sx={{ py: '3px', fontWeight: header && 'bold', fontSize: '9px' }}>
  //       <Grid>
  //         {
  //           header ||
  //           <Checkbox checked={natural} disabled 
  //             sx={{ 
  //               color: 'rgba(0,0,0,0.67) !important', 
  //               p: 0, 
  //               mb: '1px',
  //               '& .MuiSvgIcon-root': { fontSize: 12 } 
  //             }} 
  //           />
  //         }
  //       </Grid>
  //       <Grid xs sx={{ pl: header ? .3 : .6 }}>
  //         {label} 
  //       </Grid>
  //       <Grid container justifyContent="center" sx={{ width: '28px', display: !label2 && 'none' }}>
  //         <Grid>{label2}</Grid>
  //       </Grid>
  //       <Grid container justifyContent="center" sx={{ width: '36px' }}>
  //         { header && 'Bonus' }
  //       </Grid>
  //       <Grid container justifyContent="center" sx={{ width: '24px' }}>
  //         <Grid>{label3}</Grid>
  //       </Grid>
  //     </Grid>
  //   </>
  // }

  return (
    Array(character.totalSpecializations).fill(null).map((_, i) => i+1).map((index) => {
      const key = 'specialization' + index
      const specialization = character[key]
      const label = specialization.specializationName
      const score = character.getSpecializationScore(key)
      const natural = specialization.isNatural
      return <React.Fragment key={key}>
        <Score label={label} endLabel={score} bold={natural} />
      </React.Fragment>
    })
  )
  // {
  //   Array(character.totalSpecializations).fill(null).map((_, i) => i+1).map((index) => {
  //     const key = 'specialization' + index
  //     const specialization = character[key]
  //     const years = specialization.specializationYears
  //     const natural = specialization.isNatural
  //     const label = specialization.specializationName
  //     const score = character.getSpecializationScore(key)
  //     return <React.Fragment key={key}>
  //       <Specialization natural={natural} label={label} label2={years} label3={score} endLabel={''} />
  //     </React.Fragment>
  //   })
  // }
  // {
  //   Array(16 - character.totalSpecializations).fill(null).map((value, index) => {
  //     return <React.Fragment key={'ExtraSpecializations'+index}>
  //       <Specialization />
  //     </React.Fragment>
  //   })
  // }
}

function CoreValues({ character }) {
  return <>
    <Grid xs>
      {
        Array(character.totalCoreValues).fill(null).map((_, i) => i+1).map((index) => {
          const key = 'coreValue' + index
          const label = character[key]
          const score = character[key+'Score']
          return <React.Fragment key={key}>
            <Score label={label} endLabel={score} />
          </React.Fragment>
        })
      }
    </Grid>
  </>
}

function Age({ character }) {
  const { 
    getAgeScore, 
    getAge, 
    sentiencePeakBeauty, 
    sentienceBeautyScore, 
    getClassScore,
    getMaxAge,
  } = character

  function getPenalty(penalty) {
    const newPenalty = penalty + getClassScore()
    if(newPenalty > 0) return 0    
    return newPenalty
  }

  const table = [
    ['Age Category', 'Score', 'Max Age', 'Penalty', 'Current', 'Beauty'],
    ['Adolescent', '0', getMaxAge('Adolescant'), getPenalty(-1), '', ''],
    ['Young Adult', '1', getMaxAge('Young Adult'), getPenalty(0), '', ''],
    ['Adult', '2', getMaxAge('Adult'), getPenalty(-1), '', ''],
    ['Aging Adult', '3', getMaxAge('Aging Adult'), getPenalty(-2), '', ''],
    ['Elder', '4', getMaxAge('Elder'), getPenalty(-3), '', ''],
    ['Ancient', '5', getMaxAge('Ancient'), getPenalty(-4), '', ''],
    ['Immortal', '6', '', '', '', sentienceBeautyScore]
  ]

  const age = getAge()
  const ageScore= getAgeScore()
  // console.log(ageScore, age, table)
  table[ageScore+1][4] = age
  table[1][5] = sentienceBeautyScore - Math.abs(0 - sentiencePeakBeauty)
  table[2][5] = sentienceBeautyScore - Math.abs(1 - sentiencePeakBeauty)
  table[3][5] = sentienceBeautyScore - Math.abs(2 - sentiencePeakBeauty)
  table[4][5] = sentienceBeautyScore - Math.abs(3 - sentiencePeakBeauty)
  table[5][5] = sentienceBeautyScore - Math.abs(4 - sentiencePeakBeauty)
  table[6][5] = sentienceBeautyScore - Math.abs(5 - sentiencePeakBeauty)

  return <>
    <BorderedContainer container sx={{ p: 0 }}>
      {
        table.map((row, index) => {
          const isLast = index === table.length-1
          const rowStyles = { 
            fontSize: '9px', 
            fontWeight: index !== 0 || 'bold',
            borderBottom: isLast ? 0 : '1px dotted black'                       
          }

          return <Grid key={'ageRow'+index} container xs={12} sx={rowStyles}>
            <Grid sx={{ p: .5, py: .381, width: '70px' }}>
              {row[0]}
            </Grid>
            <Grid container 
              justifyContent="center" 
              sx={{ p: .5, py: .381, borderLeft: '1px dotted black', width: '44px' }}
            >
              {row[1]}
            </Grid>
            <Grid container 
              justifyContent="center" 
              sx={{ p: .5, py: .381, borderLeft: '1px dotted black', width: '48px' }}
            >
             {row[2]}
            </Grid>
            <Grid container 
              justifyContent="center"
              sx={{ p: .5, py: .381, borderLeft: '1px dotted black', width: '40px' }}
            >
              {row[3]}
            </Grid>
            <Grid container xs 
              justifyContent="center"
              sx={{ p: .5, py: .381, borderLeft: '1px dotted black' }}
            >
              {row[4]}
            </Grid>
            <Grid container
              justifyContent="center"
              sx={{ p: .5, py: .381, width: '40px', borderLeft: '1px dotted black' }}
            >
              {row[5]}
            </Grid>
          </Grid>
        })
      }
    </BorderedContainer>
  </>
}

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

function Region({ character }) {
  
  function RegionInput ({ data, onChange }){
    return <>
      <Grid container>
        <Grid xs sx={{ pr: 0.5 }}>
          <InputBase fullWidth id="regionName" value={data.regionName} sx={{ pt: '16.5px', height: '22px', fontWeight: 'bold' }}
            inputProps={{ style: { padding: '0px', borderBottom: '1px solid black' } }}
            onChange={onChange}
          />
          <div style={{ paddingTop: '2px', fontSize: '9px' }}>{'Name'}</div>
        </Grid>
        <Grid xs={3} sx={{ pl: 0.5, pr: 0.5 }}>
          <InputBase fullWidth id="regionReputation" value={data.regionReputation} sx={{ pt: '16.5px', height: '22px', fontWeight: 'bold' }}
            inputProps={{ style: { padding: '0px', borderBottom: '1px solid black' } }}
            onChange={onChange}
          />
          <div style={{ paddingTop: '2px', fontSize: '9px' }}>{'Reputation'}</div>
        </Grid>
        <Grid sx={{ width: '40px', pl: 0.5 }}>
          <InputBase fullWidth id="regionWealth" value={data.regionWealth} sx={{ pt: '16.5px', height: '22px', fontWeight: 'bold' }}
            inputProps={{ style: { padding: '0px', borderBottom: '1px solid black' } }}
            onChange={onChange}
          />
          <div style={{ paddingTop: '2px', fontSize: '9px' }}>{'Wealth'}</div>
        </Grid>
      </Grid>
    </>
  }

  return <>
    <BorderedContainer container label="Region">
      <RegionInput data={character.data} onChange={character.onChange} />
      <RegionInput data={character.data} onChange={character.onChange} />
      <RegionInput data={character.data} onChange={character.onChange} />
    </BorderedContainer>
  </>
}

export default function Page1({ character }) {  
  return <Paper page="1" size="Letter" margin={'0.4in'}>
    <Grid container spacing={2}>

      <Grid xs={12}>
        <Header character={character} />
      </Grid>

      <Grid container xs={8}>
        <Grid xs={4.8}>
          <BorderedContainer label="Primary Attributes">
            <Score label="Size" endLabel={(character.getSize() || '').slice(0,3)+'.'} />
            <Score label="Max Beauty Score" endLabel={character.sentienceBeautyScore} />
            <Score label="Max Beauty Age Score" endLabel={character.sentiencePeakBeauty} />
            <Score label="Sentience Score" endLabel={character.sentienceScore} />
            <Score label={"Class Score (" + character.characterClass + ")"} endLabel={character.getClassScore()} />
            <Divider sx={{ my: '9.4px' }} />
            <Score label="Natural Specializations" endLabel={Number(character.sentienceScore) + Number(character.getClassScore())} />
            <Score label="Miracles" endLabel={character.totalMiracles} />
          </BorderedContainer>
        </Grid>

        <Grid xs={7.2}>
          <Age character={character} />
        </Grid>

        <Grid xs={12}>
          <BorderedSpecializations height={'272px'} sx={{ p: 1 }}>
            <Specializations character={character} />
          </BorderedSpecializations>
        </Grid>

        <Grid container xs={6} spacing={2}>
          
          {/* <Grid xs={6}>
            <BorderedContainer label={'Mental'} sx={{ height: '72px' }}>
              <ExtraLabels label2={'Max: 100'} />
            </BorderedContainer>
          </Grid>

          <Grid xs={6}>
            <BorderedContainer label={'Ego'} sx={{ height: '72px' }}>
              <ExtraLabels label2={'Max: ' + character.getMaxEgo()} />
            </BorderedContainer>
          </Grid> */}

        </Grid>
        <Grid xs={12}>
          <BorderedContainer label="Core Values" label2="Score" height={'198px'}>
            <CoreValues character={character} />
          </BorderedContainer>
        </Grid>

        <Grid xs={12}>
          <Region character={character} />
        </Grid>
      </Grid>

      <Grid xs={4}>
        <BorderedContainer label="Miracles" height={'838px'}>
          <Miracles character={character} />
        </BorderedContainer>
      </Grid>

    </Grid>
  </Paper>
}