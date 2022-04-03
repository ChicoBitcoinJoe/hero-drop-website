import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import BlankFile from '../HeroTemplates/Blank'

const theme = createTheme();

function useWindowTitle(title) {
  React.useEffect(() => {
    document.title = title
  })
}

function Paper({ size, styles, children }) {
  const A4 = {
    width: '210mm',
    minWidth: '210mm',
    maxWidth: '210mm',
    height: '297mm',
    minHeight: '297mm',
    maxHeight: '297mm',
  }

  const Letter = {
    width: '216mm',
    minWidth: '216mm',
    maxWidth: '216mm',
    height: '279mm',
    minHeight: '279mm',
    maxHeight: '279mm',
  }

  const paper = size === 'A4' ? A4 : size === 'Letter' ? Letter : {}
  return (
    <div style={{ backgroundColor: 'blanchedalmond', padding: '0.5in', ...paper, ...styles }}>
      <Grid container>
        {children}
      </Grid>
    </div>
  )
}

function Border(props) {
  return (
    <Grid item {...props}
      style={{
        border: 'solid black',
        borderColor: 'black',
        borderWidth: '2px 1px 2px 1px',
        borderRadius: '4px',
        ...props.style
    }}>
      {props.children}
    </Grid>
  )
}

function Title({ children }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <h1 style={{ margin: '0px', fontSize: '36px', position:'absolute', top: '-14px', left: '0px' }}>{children}</h1>
    </div>
  )
}

function Spacer({ height }) {
  return <Grid item xs={12} style={{ paddingBottom: height }} />
}

function Lines({ rows }) {
  const lines = []
  for(var i = 0; i < rows; i++) {
    lines.push(<div key={i} style={{ marginTop: '20px', borderBottom: '1px solid rgba(0,0,0,0.5' }}></div>)
  }

  return lines;
}

function Notes({ xs, sx, offset, rows, height, title, label, midLabel, endLabel }) {
  return (
    <Grid item xs={xs} sx={sx}>
      <Border style={{ padding: title ? '6px 10px' : '3px 10px', height: height, width: '100%' }}>
        { 
          title ? 
          <Grid item style={{ height: '24px', paddingBottom: '0px', fontSize: '11px', fontWeight: 'bold' }}>
            {title}&nbsp;
          </Grid> 
          : null
        }
          
        <Grid container item justifyContent={'space-between'} xs={12} style={{ paddingBottom: offset, fontSize: '10px' }}>
          <b>{label}</b>
          <b></b>
          <b></b>
          <b>{midLabel}</b>
          <b>{endLabel}</b>
        </Grid>
        <Grid item xs={12} style={{ position: 'relative' }}>
          <InputBase fullWidth style={{ position: 'absolute', padding: '0px' }} multiline rows={rows}
            inputProps={{ style: { fontSize: '12px', lineHeight: '21px', height: height-48 } }} 
          />
        </Grid>
        <Lines rows={rows} />
      </Border>
    </Grid>
  )
}

function Pillar({ name, score }) {
  const style = { 
    width: '0.4in', 
    height: '0.35in', 
    marginLeft: '.21in',
    marginTop: '0px',
    backgroundColor: 'blanchedalmond' 
  }

  const godly = score > 5
  const excess = score - 5
  const die = score != null ? score === '0' ? 'd1' : !godly ? 'd'+score*4 : 'd20 d'+excess*4 : ''

  return (
    <Border style={{ width: '0.833in', height: '0.7in', textAlign: 'center', marginBottom: '.2in' }}>
      <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '2px' }}>{name}</div>
      <InputBase fullWidth defaultValue={score} 
        inputProps={{ style: { padding: '0', textAlign: 'center', lineHeight: '14px' } }} 
      />
      <Border container alignItems="center" justifyContent="center" style={style}>
        <InputBase fullWidth defaultValue={die} sx={{ fontSize: godly ? '12px' : null }} multiline={godly}
          inputProps={{ style: { textAlign: 'center', lineHeight: '12px' } }} 
        />
      </Border>
    </Border>
  )
}

function Talent({ name, score }) {
  const style = { 
    width: '0.4in', 
    height: '0.4in', 
    marginTop: '5.5px',
    backgroundColor: 'blanchedalmond' 
  }

  const godly = score > 5
  const excess = score - 5
  const die = score != null ? score === '0' ? 'd1' : !godly ? 'd'+score*4 : 'd20 d'+excess*4 : ''

  return <Grid container item>
    <Border xs container alignItems="center" style={{ marginBottom: '8px', paddingLeft: '.1in', marginRight: '-.21in' }}>
      <Grid item xs style={{ fontSize: '11px', fontWeight: 'bold' }}>{name}</Grid>
      <Grid item xs={6} style={{ paddingRight: '20px', textAlign: 'center' }}>
        <InputBase fullWidth defaultValue={score}
          inputProps={{ style: { padding: '0', textAlign: 'center'} }} 
        />
      </Grid>
    </Border>
    <Border container alignItems="center" style={style}>
      <InputBase fullWidth defaultValue={die} sx={{ fontSize: godly ? '12px' : null }} multiline={godly}
        inputProps={{ style: { padding: '0', textAlign: 'center', lineHeight: '14px' } }} 
      />
    </Border>
  </Grid>
}

function Resource({ name, label, value, marginBottom }) {
  return (
    <Border container item xs={12} style={{ height: '0.8in', marginBottom: marginBottom ? '.1in' : '0' }}>
      <Grid container item xs={12} style={{ padding: '2px 4px', borderBottom: '1px solid black' }}>
        <Grid xs item style={{ fontSize: '11px', fontWeight: 'bold' }}>{name}</Grid>
        <Grid xs={6} item style={{ fontSize: '11px', fontWeight: 'bold' }}>
          <InputBase fullWidth defaultValue={value}
            inputProps={{ style: { textAlign: 'center', fontSize: '11px', padding: '0px' }}} 
          />
        </Grid>
      </Grid>
      <div style={{ height: '0.50in', textAlign: 'center', width: '100%' }}>
        <Grid container item xs={12} style={{ height: '100%' }} justifyContent="center" alignItems="flex-end">
          <div style={{ fontSize: '10px', textTransform: 'lowercase' }}>
            { label ? label : 'current'}
          </div>
        </Grid>
      </div>
    </Border>
  )
}

function Feat({ label, name, value }) {
  return (
    <Border container xs={12} style={{ height: '76.8px', marginBottom: '.1in' }}>
      <Grid item xs={6} style={{ height: '20px', marginTop: '-3px' }}>
      <InputBase defaultValue={name} sx={{ p: 0 }} 
        inputProps={{ style: { padding: '0px 4px', lineHeight: '15px', fontSize: '11px', fontWeight: 'bold' } }} 
      />
      </Grid>
      <Grid item xs={6} style={{ height: '20px' }}>
        <div style={{ fontSize: '11px', margin: '2px 4px 0 4px', fontWeight: 'bold', textAlign: 'right' }}>{label}</div>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '-10px' }}>
        <InputBase fullWidth multiline defaultValue={value} sx={{ p: 0 }} 
          inputProps={{ style: { padding: '0px 4px', lineHeight: '13px', fontSize: '11px', minHeight: '56px' } }} 
        />
      </Grid>
    </Border>
  )
}

function CharacterName({ value }) {
  return (
    <Grid container item xs={4} alignItems="flex-end">
      <Border xs={12} style={{ height: '56px' }}>
        <Grid container sx={{ px: '4px', pt: '13px' }}>
          <InputBase fullWidth defaultValue={value} 
            inputProps={{ style: { padding: '0px', borderBottom: '1px solid black' } }} 
          />
          <div style={{ fontSize: '10px' }}>Character Name</div>
        </Grid>
      </Border>
    </Grid>
  )
}

function Input({ xs, sx, label, value, center }) {
  return (
    <Grid xs={xs} item sx={sx}>
      <InputBase fullWidth defaultValue={value} sx={{ pt: '2px', height: '22px' }}
        inputProps={{ style: { padding: '0px', borderBottom: '1px solid black', textAlign: center ? 'center' : null } }}              
      />
      <div style={{ fontSize: '10px', textAlign: center ? 'center' : null }}>{label}</div>
    </Grid>
  )
}

export default function CharacterSheet({ file }) {
  const [data, ] = React.useState({ ...BlankFile, ...file })
  const windowTitle = data.characterName ? data.characterName : 'Character Sheet'
  useWindowTitle(windowTitle)

  return <ThemeProvider theme={theme}>
    <Paper size="Letter" page="1" styles={{ color: 'black' }}>
      <Grid container item xs={12} style={{ height: '0.833in', marginBottom: '.1in' }}>
        <Title>Hero Drop</Title>
        <CharacterName value={data.characterName} />
        <Border container xs style={{ marginLeft: '.1in', padding: '0 4px' }}>
          <Input xs={1} sx={{ pr: '8px' }} label={'Level'} value={data.level} center />
          <Input xs={6} sx={{ pr: '8px' }} label={'Race and Class'} value={data.race && data.class ? data.race + ' ' + data.class : ''} />
          <Input xs={5} label={'Player Name'} value={data.playerName} />
          <Input xs={1} sx={{ pr: '8px' }} label={'Age'} value={data.age} center />
          <Input xs={4} sx={{ pr: '8px' }} label={'Alignment'} value={data.alignment} />
          <Input xs={3} sx={{ pr: '8px' }} label={'Size'} value={data.size} />
          <Input xs={2} sx={{ pr: '8px' }} label={'Weight'} value={data.weight} />
          <Input xs={2} label={'Height'} value={data.height} />
        </Border>
      </Grid>
      <Grid container item xs={8} style={{ maxHeight: '336px' }}>
        <Grid container item xs={6} style={{ height: '3.5in'}}>
          <Grid container item style={{ width: '0.833in', marginRight: '8px', }}>
            <Pillar name={'Combat'} score={data.pillars.combat} />
            <Pillar name={'Social'} score={data.pillars.social} />
            <Pillar name={'Exploration'} score={data.pillars.exploration} />
            <Pillar name={'Magic'} score={data.pillars.magic} />
          </Grid>
          <Grid container item xs>
            <Talent name={'Athletics'} score={data.talents.athletics} />
            <Talent name={'Fortitude'} score={data.talents.fortitude} />
            <Talent name={'Influence'} score={data.talents.influence} />
            <Talent name={'Knowledge'} score={data.talents.knowledge} />
            <Talent name={'Perception'} score={data.talents.perception} />
            <Talent name={'Stealth'} score={data.talents.stealth} />
          </Grid>
        </Grid>
        <Grid container item xs={6} style={{ padding: '0 .1in', height: '3.5in' }}>
          <Resource name={'Health Maximum'} value={data.resources.health} xs={12} marginBottom />
          <Resource name={'Stamina Maximum'} value={data.resources.stamina} xs={12} marginBottom />
          <Resource name={'Will Maximum'} value={data.resources.will} xs={12} marginBottom />
          <Resource name={'Mana Maximum'} value={data.resources.mana} xs={12} marginBottom />
        </Grid>
        <Grid container item style={{ paddingRight: '.1in' }}>
          <Grid container item style={{ marginTop: '.1in' }}>
            <Grid container item style={{ width: '240px', marginRight: '-.1in' }}>
              <Notes xs={12} title={'Proficiencies'} offset={'2.5px'} rows={22} height={509} />
            </Grid>
            <Grid container item xs style={{ paddingLeft: '.2in' }}>
              <Resource name="Wealth Income" marginBottom value={data.resources.wealth} label={<span>on person &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; in bank</span>} />
              <Notes xs={12} title={'Race Perks'} sx={{ pb: '.1in' }} rows={7} height={200} />
              <Notes xs title="Reputation" offset={'7px'} label={'Location'} midLabel="Honor" endLabel="Infamy" rows={7} height={213} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={4}>
        <Feat label="Background Feat" name={data.feats.background.name} value={data.feats.background.value} />
        <Feat label="Level 1 Feat" name={data.feats.level1.name} value={data.feats.level1.value} />
        <Feat label="Level 2 Feat" name={data.feats.level2.name} value={data.feats.level2.value} />
        <Feat label="Level 3 Feat" name={data.feats.level3.name} value={data.feats.level3.value} />
        <Feat label="Level 4 Feat" name={data.feats.level4.name} value={data.feats.level4.value} />
        <Feat label="Level 5 Feat" name={data.feats.level5.name} value={data.feats.level5.value} />
        <Feat label="Level 6 Feat" name={data.feats.level6.name} value={data.feats.level6.value} />
        <Feat label="Attunement Feat" name={data.feats.attunement1.name} value={data.feats.attunement1.value} />
        <Feat label="Attunement Feat" name={data.feats.attunement2.name} value={data.feats.attunement2.value} />
        <Feat label="Attunement Feat" name={data.feats.attunement3.name} value={data.feats.attunement3.value} />
      </Grid>
    </Paper>

    <Divider style={{ borderColor: '#12121' }} />

    <Paper size="Letter" page="2" styles={{ color: 'black' }}>
      <Grid container item xs={12} style={{ height: '0.833in', marginBottom: '.1in' }}>
        <Title>Hero Drop</Title>
        <CharacterName value={data.characterName} />
        <Border container xs style={{ marginLeft: '.1in', padding: '0 4px' }}>
          <Input xs={4} sx={{ pr: '8px' }} label={'Eyes'} />
          <Input xs={4} sx={{ pr: '8px' }} label={'Hair'} />
          <Input xs={4} label={'Skin'} />
          <Input xs={4} sx={{ pr: '8px' }} label={'Carry Capacity (lbs)'} />
          <Input xs={4} sx={{ pr: '8px' }} label={'Max March Speed'} />
          <Input xs={4} label={'Max March Distance'} />
        </Border>
      </Grid>

      <Grid container item xs={4}>
        <Notes xs={12} title={'Equipment'} offset={'5px'} label={'Item Name'} midLabel="Equipped" endLabel="Weight" rows={24} height={575} />
        <Notes xs={12} sx={{ pt: '.1in' }} title={'Character Description'} rows={11} height={283} />
      </Grid>
      <Grid container item xs={8} style={{ fontSize: '10px' }}>
        <Grid item xs={6} sx={{ pl: '.1in' }} >
          <Border container xs={12} style={{ padding: '4px 6px 0 6px', height: '283px' }}>
            <Grid container item xs={12} justifyContent={'space-between'} style={{ fontSize: '11px' }}>
              <b>Movement</b>
              <b>Speed</b>
            </Grid>
            <Grid item xs={6} style={{ lineHeight: '23px' }}>
              <InputBase multiline rows={5} style={{ padding: '0px' }} 
                inputProps={{ style: { height: '112px', fontSize: '12px', lineHeight: '21px' } }} 
              />
            </Grid>
            <Grid container item xs={6} style={{ lineHeight: '23px' }} justifyContent={'flex-end'}>
              <InputBase multiline rows={5} style={{ padding: '0px' }} 
                inputProps={{ style: { height: '112px', fontSize: '12px', lineHeight: '21px', textAlign: 'right' } }} 
              />
            </Grid>
            <Grid container item xs={12} justifyContent={'space-between'} style={{ fontSize: '11px' }}>
              <b>Jumping</b>
              <b>Distance</b>
            </Grid>
            <Grid item xs={6}>
              <div style={{ lineHeight: '21px', marginTop: '1px' }}>
                Standing High
                <br />
                Standing Long
                <br />
                Running Start
                <br />
                Running High
                <br />
                Running Long
              </div>
            </Grid>
            <Grid container item xs={6} style={{ lineHeight: '23px' }} justifyContent={'flex-end'}>
              <InputBase multiline rows={5} style={{ padding: '0px' }} 
                inputProps={{ style: { height: '112px', fontSize: '12px', lineHeight: '21px', textAlign: 'right' } }} 
              />
            </Grid>
          </Border>
        </Grid>
        <Grid item xs={6} sx={{ pl: '.1in' }} >
        <Border container xs={12} style={{ padding: '4px 6px 0 6px', height: '283px' }}>
            <Grid container item xs={12} justifyContent={'space-between'} style={{ fontSize: '11px' }}>
              <b>Vision</b>
              <b>Distance</b>
            </Grid>
            <Grid item xs={6} style={{ lineHeight: '23px' }}>
              <InputBase multiline rows={5} style={{ padding: '0px' }} 
                inputProps={{ style: { height: '112px', fontSize: '12px', lineHeight: '21px' } }} 
              />
            </Grid>
            <Grid container item xs={6} style={{ lineHeight: '23px' }} justifyContent={'flex-end'}>
              <InputBase multiline rows={5} style={{ padding: '0px' }} 
                inputProps={{ style: { height: '112px', fontSize: '12px', lineHeight: '21px', textAlign: 'right' } }} 
              />
            </Grid>
            <Grid container item xs={12} justifyContent={'space-between'} style={{ fontSize: '11px' }}>
              <b>Range</b>
              <b>Distance</b>
            </Grid>
            <Grid item xs={6}>
              <div style={{ lineHeight: '21px', marginTop: '1px' }}>
              Accurate Range
                <br />
                Throwing Base
                <br />
                Throwing Penalty 1
                <br />
                Throwing Penalty 2
                <br />
                Throwing Penalty 3
              </div>
            </Grid>
            <Grid container item xs={6} style={{ lineHeight: '23px' }} justifyContent={'flex-end'}>
              <InputBase multiline rows={5} style={{ padding: '0px' }} 
                inputProps={{ style: { height: '112px', fontSize: '12px', lineHeight: '21px', textAlign: 'right' } }} 
              />
            </Grid>
          </Border>
        </Grid>
        <Spacer height=".1in" />
        <Notes xs={6} sx={{ pl: '.1in' }} title="Principles" rows={11} height={283} />
        <Notes xs={6} sx={{ pl: '.1in' }} title="Flaws" rows={11} height={283} />
        <Spacer height=".1in" />
        <Notes xs={12} sx={{ pl: '.1in' }} title={'Character Backstory'} rows={11} height={283} />
      </Grid>
    </Paper>
  </ThemeProvider>
}