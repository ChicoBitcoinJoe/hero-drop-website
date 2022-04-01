import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputBase from '@mui/material/InputBase'

function useWindowTitle(title) {
  React.useEffect(() => {
    document.title = title;
  })
}

const theme = createTheme();

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
    lines.push(<div style={{ marginTop: '20px', borderBottom: '1px solid rgba(0,0,0,0.5' }}></div>)
  }

  return lines;
}

function Notes({ rows, height, title, label, midLabel, endLabel }) {
  return (
    <Border style={{ padding: title ? '6px 10px' : '3px 10px', height: height, width: '100%' }}>
      { 
        title ? 
        <Grid item style={{ paddingBottom: '4px' }}>
          <b style={{ fontSize: '12px' }}>
            {title}
          </b>
        </Grid> 
        : null
      }
        
      <Grid container justifyContent={'space-between'} xs={12} style={{ paddingBottom: !title ? '7px' : !label ? 0 : '8px', fontSize: '10px' }}>
        <b>{label}</b>
        <b></b>
        <b></b>
        <b>{midLabel}</b>
        <b>{endLabel}</b>
      </Grid>
      <Lines rows={rows} />
    </Border>
  )
}

function Notes2({ xs, sx, rows, height, title, label, midLabel, endLabel }) {
  return (
    <Grid xs={xs} sx={sx}>
      <Border style={{ padding: title ? '6px 10px' : '3px 10px', height: height, width: '100%' }}>
        { 
          title ? 
          <Grid item style={{ paddingBottom: '4px' }}>
            <b style={{ fontSize: '12px' }}>
              {title}&nbsp;
            </b>
          </Grid> 
          : null
        }
          
        <Grid container justifyContent={'space-between'} xs={12} style={{ paddingBottom: !title ? '7px' : !label ? 0 : '8px', fontSize: '10px' }}>
          <b>{label}</b>
          <b></b>
          <b></b>
          <b>{midLabel}</b>
          <b>{endLabel}</b>
        </Grid>
        <Lines rows={rows} />
      </Border>
    </Grid>
  )
}

function Gear() {
  return (
    <Grid container item style={{ marginTop: '.1in' }}>
      <Grid container item style={{ width: '240px', marginRight: '-.1in' }}>
        <Notes title={'Equipment'} rows={9} height={'250px'} />
      </Grid>
      <Grid container item xs style={{ paddingLeft: '.2in' }}>
        <Resource name="Wealth Income" label={<span>on person &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; in bank</span>} />
        <Notes title={'Race Perks'} rows={6} height={'163px'} />
      </Grid>
    </Grid>
  )
}

function Pillar({ name }) {
  return (
    <Border style={{ width: '0.833in', height: '0.7in', textAlign: 'center', marginBottom: '.2in' }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '2px' }}>{name}</div>
      <div style={{ position: 'absolute', width: '.82in' }}></div>
      <Border container alignItems="center" style={{ width: '0.4in', height: '0.35in', margin: '.24in 0 0 .21in', backgroundColor: 'blanchedalmond' }}></Border>
    </Border>
  )
}

function Talent({ name }) {
  return <Grid container item>
    <Border xs container alignItems="center" style={{ marginBottom: '8px', paddingLeft: '.1in', marginRight: '-.21in' }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{name}</div>
    </Border>
    <Border container alignItems="center" style={{ width: '0.4in', height: '0.4in', marginTop: '5.5px', paddingLeft: '.1in', backgroundColor: 'blanchedalmond' }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold' }}> </div>
    </Border>
  </Grid>
}

function Resource({ name, label }) {
  return (
    <Border container item xs={12} style={{ marginBottom: '.1in', height: '0.8in' }}>
      <Grid item xs={12} style={{ padding: '2px 4px', borderBottom: '1px solid black' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{name}</div>
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

function Feat({ name }) {
  return (
    <Border xs={12} style={{ height: '76.8px', marginBottom: '.1in' }}>
      <div style={{ fontSize: '12px', margin: '2px 4px', fontWeight: 'bold' }}>{name}</div>
    </Border>
  )
}

function TinyTrackers() {
  return (
    <Grid container xs={12} style={{ margin: '.1in 0', maxHeight: '250px', fontSize: '10px' }}>
      <Grid container item xs={4}>
        <Border xs={12} style={{ padding: '4px 6px 0 6px', height: '250px', margin: '0 4px 0 0' }}>
          <div style={{ lineHeight: '20px', fontWeight: 'bold' }}>Proficiencies</div>
        </Border>
      </Grid>
      <Grid container item xs={4}>
        <Border xs={12} style={{ padding: '4px 6px 0 6px', height: '250px', margin: '0 4px 0 4px' }}>
          <div style={{ lineHeight: '20px' }}>
            <Grid container justifyContent={'space-between'} xs={12}>
              <b>Movement</b>
              <b>Speed</b>
            </Grid>
            Base
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <Grid container justifyContent={'space-between'} xs={12}>
              <b>Jumping</b>
              <b>Distance</b>
            </Grid>
            <div style={{ lineHeight: '20px', marginBottom: '4px' }}>
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
          </div>
        </Border>
      </Grid>
      <Grid container item xs={4}>
        <Border xs={12} style={{ padding: '4px 6px 0 6px', height: '250px', margin: '0 0 0 4px' }}>
          <div style={{ lineHeight: '20px' }}>
            <Grid container justifyContent={'space-between'} xs={12}>
              <b>Vision</b>
              <b>Distance</b>
            </Grid>
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            &nbsp;
            <br />
            <div style={{ lineHeight: '20px', marginBottom: '4px' }}>
              <Grid container justifyContent={'space-between'} xs={12}>
                <b>Range</b>
                <b>Distance</b>
              </Grid>
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
          </div>
        </Border>
      </Grid>
    </Grid>
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

export default function CharacterSheet({ data }) {
  useWindowTitle('Character Sheet - ' + data.class)
  console.log(data)
  return <ThemeProvider theme={theme}>
    <Paper size="Letter" page="1" styles={{ color: 'black' }}>
      <Grid container item xs={12} style={{ height: '0.833in', marginBottom: '.1in' }}>
        <Title>Hero Drop</Title>
        <CharacterName value={data.characterName} />
        <Border container xs style={{ marginLeft: '.1in', padding: '0 4px' }}>
          <Input xs={1} sx={{ pr: '8px' }} label={'Level'} value={data.level} center />
          <Input xs={6} sx={{ pr: '8px' }} label={'Race and Class'} value={data.race + ' ' + data.class} />
          <Input xs={5} label={'Player Name'} value={data.playerName} />
          <Input xs={1} sx={{ pr: '8px' }} label={'Age'} value={data.age} center />
          <Input xs={4} sx={{ pr: '8px' }} label={'Alignment'} value={data.alignment} />
          <Input xs={3} sx={{ pr: '8px' }} label={'Size'} value={data.size} />
          <Input xs={2} sx={{ pr: '8px' }} label={'Weight'} value={data.weight} />
          <Input xs={2} label={'Height'} value={data.height} />
        </Border>
      </Grid>
      <Grid container item xs={8} style={{ maxHeight: '336px' }}>
        <Grid container item xs={6}>
          <Grid container item style={{ height: '3.5in'}}>
            <Grid container item style={{ width: '0.833in', marginRight: '8px', }}>
              <Pillar name={'Combat'} />
              <Pillar name={'Social'} />
              <Pillar name={'Exploration'} />
              <Pillar name={'Magic'} />
            </Grid>
            <Grid container item xs>
              <Talent name={'Athletics'} />
              <Talent name={'Fortitude'} />
              <Talent name={'Influence'} />
              <Talent name={'Knowledge'} />
              <Talent name={'Perception'} />
              <Talent name={'Stealth'} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={6} style={{ padding: '0 .1in', height: '3.5in' }}>
          <Resource name={'Health Maximum'} xs={12} />
          <Resource name={'Stamina Maximum'} xs={12} />
          <Resource name={'Will Maximum'} xs={12} />
          <Resource name={'Mana Maximum'} xs={12} />
        </Grid>
        <Grid container item style={{ paddingRight: '.1in' }}>
          <Gear rows={10} />
          <TinyTrackers />
        </Grid>
      </Grid>
      <Grid container item xs={4}>
        <Feat name="Background Feat" />
        <Feat name="Level 1 Feat" />
        <Feat name="Level 2 Feat" />
        <Feat name="Level 3 Feat" />
        <Feat name="Level 4 Feat" />
        <Feat name="Level 5 Feat" />
        <Feat name="Level 6 Feat" />
        <Feat name="Attunement Feat" />
        <Feat name="Attunement Feat" />
        <Feat name="Attunement Feat" />
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

      <Notes2 xs={4} title={'Character Description'} rows={11} height={'283px'} />
      <Notes2 xs={8} sx={{ pl: '.1in' }} title={'Character Backstory'} rows={11} height={'283px'} />
      <Spacer height=".1in" />
      <Notes2 xs={4} title="Reputation" label={'Location'} midLabel="Honor" endLabel="Infamy" rows={10} height={'283px'} />
      <Notes2 xs={4} sx={{ pl: '.1in' }} title="Principles" rows={11} height={'283px'} />
      <Notes2 xs={4} sx={{ pl: '.1in' }} title="Flaws" rows={11} height={'283px'} />
      <Spacer height=".1in" />
      <Notes2 xs={4} title={'Additional Equipment'} rows={11} height={'283px'} />
      <Notes2 xs={4} sx={{ pl: '.1in' }} title={true} rows={11} height={'283px'} />
      <Notes2 xs={4} sx={{ pl: '.1in' }} title={true} rows={11} height={'283px'} />
    </Paper>
  </ThemeProvider>
}