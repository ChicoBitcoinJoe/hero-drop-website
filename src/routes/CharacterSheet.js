import * as React from 'react'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

function useWindowTitle(title) {
  React.useEffect(() => {
    document.title = title;
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
        // borderRadius: '2% 95% 2% 95%/95% 2% 95% 2%',
        // transform: 'rotate(-0.1deg)',
        ...props.style
    }}>
      {props.children}
    </Grid>
  )
}

function Title({ children }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <h1 style={{ margin: '0px', fontSize: '36px', position:'absolute', top: '-18px', left: '0px' }}>{children}</h1>
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

function Input({ label }) {
  return (
    <div style={{ marginTop: '22px', borderTop: '1px solid black', fontSize: '10px' }}>
      {label}
    </div>
  )
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

function Gear({ rows }) {
  return (
    <Grid container item style={{ marginTop: '.1in' }}>
      <Grid container item style={{ width: '240px', marginRight: '-.1in' }}>
        <Notes title={'Equipment'} rows={9} height={'250px'} />
      </Grid>
      <Grid container item xs style={{ paddingLeft: '.2in' }}>
        <Resource name="Wealth Income" label={<span>on person &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; in bank</span>} />
        <Notes rows={6} height={'163px'} />
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

function FirstPageHeader() {
  return (
    <Grid container item xs={12} style={{ height: '0.833in', marginBottom: '.1in' }}>
      <Title>Hero Drop</Title>
      <Grid container item xs={4} alignItems="flex-end">
        <Border xs={12} style={{ height: '56px', padding: '14px 4px 0 4px' }}>
          <Input label={'Character Name'} />
        </Border>
      </Grid>
      <Border container xs style={{ marginLeft: '.1in', padding: '0 4px' }}>
        <Grid item xs={1} style={{ paddingRight: '8px' }}>
          <Input label={'Level'} />
        </Grid>
        <Grid item xs={6} style={{ paddingRight: '8px' }}>
          <Input label={'Class and Race'} />
        </Grid>  
        <Grid item xs={5}>
          <Input label={'Player Name'} />
        </Grid>
        <Grid item xs={1} style={{ paddingRight: '8px' }}>
          <Input label={'Age'} />
        </Grid>
        <Grid item xs={4} style={{ paddingRight: '8px' }}>
          <Input label={'Alignment'} />
        </Grid>
        <Grid item xs={3} style={{ paddingRight: '8px' }}>
          <Input label={'Size'} />
        </Grid>
        <Grid item xs={2} style={{ paddingRight: '8px' }}>
          <Input label={'Weight'} />
        </Grid>
        <Grid item xs={2}>
          <Input label={'Height'} />
        </Grid>
      </Border>
    </Grid>
  )
}

function PillarsAndTalents() {
  return (
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
  )
}

function FeatsAndAttunements() {
  return (
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
  )
}

function SecondPageHeader() {
  return (
    <Grid container item xs={12} style={{ height: '0.833in', marginBottom: '.1in' }}>
      <Title>Hero Drop</Title>
      <Grid container item xs={4} alignItems="flex-end">
        <Border xs={12} style={{ height: '56px', padding: '14px 4px 0 4px' }}>
          <Input label={'Character Name'} />
        </Border>
      </Grid>
      <Border container xs style={{ marginLeft: '.1in', padding: '0 4px' }}>
        <Grid item xs={4} style={{ paddingRight: '8px' }}>
          <Input label={'Eyes'} />
        </Grid>
        <Grid item xs={4} style={{ paddingRight: '8px' }}>
          <Input label={'Hair'} />
        </Grid>
        <Grid item xs={4} style={{ paddingRight: '8px' }}>
          <Input label={'Skin'} />
        </Grid>
        <Grid item xs={4} style={{ paddingRight: '8px' }}>
          <Input label={'Carry Capacity (lbs)'} />
        </Grid>
        <Grid item xs={4} style={{ paddingRight: '8px' }}>
          <Input label={'Max March Speed'} />
        </Grid>
        <Grid item xs={4} style={{ paddingRight: '8px' }}>
          <Input label={'Max March Distance'} />
        </Grid>
      </Border>
    </Grid>
  )
}

export default function CharacterSheet() {
  useWindowTitle('Character Sheet')
  return <>
    <Paper size="Letter" page="1" styles={{ color: 'black' }}>
      <FirstPageHeader />
      <PillarsAndTalents />
      <FeatsAndAttunements />
    </Paper>

    <Divider style={{ borderColor: '#12121' }} />

    <Paper size="Letter" page="2" styles={{ color: 'black' }}>
      <SecondPageHeader />

      <Grid item xs={4}>
        <Notes title={'Character Description'} rows={11} height={'283px'} />
      </Grid>
      <Grid item xs={8} style={{ paddingLeft: '.1in' }}>
        <Notes title={'Character Backstory'} rows={11} height={'283px'} />
      </Grid>
      <Spacer height=".1in" />
      <Grid item xs={4}>
        <Notes title="Reputation" label={'Location'} midLabel="Honor" endLabel="Infamy" rows={10} height={'283px'} />
      </Grid>
      <Grid item xs={4} style={{ paddingLeft: '.1in' }}>
        <Notes title="Principles" rows={11} height={'283px'} />
      </Grid>
      <Grid item xs={4} style={{ paddingLeft: '.1in' }}>
        <Notes title="Flaws" rows={11} height={'283px'} />
      </Grid>
      <Spacer height=".1in" />
      <Grid container item xs={4}>
        <Notes title={'Notes'} rows={11} height={'283px'} />
      </Grid>
      <Grid container item xs={4} style={{ paddingLeft: '.1in' }}>
        <Notes title={'Notes'} rows={11} height={'283px'} />
      </Grid>
      <Grid container item xs={4} style={{ paddingLeft: '.1in' }}>
        <Notes title={'Notes'} rows={11} height={'283px'} />
      </Grid>      
    </Paper>
  </>
}