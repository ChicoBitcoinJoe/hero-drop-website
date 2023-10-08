import * as React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'

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

function Notes({ id, xs, sx, offset, rows, height, title, value, label, midLabel, endLabel, onChange }) {
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
          <TextArea id={id} style={{ position: 'absolute' }} rows={rows} height={height - (label ? 52 : 32)} value={value} onChange={onChange} />
        </Grid>
        <Lines rows={rows} />
      </Border>
    </Grid>
  )
}

function Pillar({ id, name, score, onChange }) {
  const style = { 
    width: '0.4in', 
    height: '0.35in', 
    marginLeft: '.21in',
    marginTop: '0px',
    backgroundColor: 'blanchedalmond' 
  }

  function onLocalChange(event) {
    onChange(id, event.target.value)
  }

  const godly = score > 5
  const excess = score - 5
  const die = score !== "" ? score === '0' ? 'd1' : !godly ? 'd'+score*4 : 'd20 d'+excess*4 : ''

  return (
    <Border style={{ width: '0.833in', height: '0.7in', textAlign: 'center', marginBottom: '.2in' }}>
      <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '2px' }}>{name}</div>
      <InputBase fullWidth value={score} onChange={onLocalChange}
        inputProps={{ style: { padding: '0', textAlign: 'center', lineHeight: '14px' } }} 
      />
      <Border container alignItems="center" justifyContent="center" style={style}>
        <InputBase fullWidth value={die} sx={{ fontSize: godly ? '12px' : null }} multiline={godly}
          inputProps={{ style: { textAlign: 'center', lineHeight: '12px' } }} 
        />
      </Border>
    </Border>
  )
}

function Talent({ id, name, score, onChange }) {
  const style = { 
    width: '0.4in', 
    height: '0.4in', 
    marginTop: '5.5px',
    backgroundColor: 'blanchedalmond' 
  }

  function onLocalChange(event) {
    onChange(id, event.target.value)
  }

  const godly = score > 5
  const excess = score - 5
  const die = score !== "" ? score === '0' ? 'd1' : !godly ? 'd'+score*4 : 'd20 d'+excess*4 : ''

  return <Grid container item>
    <Border xs container alignItems="center" style={{ marginBottom: '8px', paddingLeft: '.1in', marginRight: '-.21in' }}>
      <Grid item xs style={{ fontSize: '11px', fontWeight: 'bold' }}>{name}</Grid>
      <Grid item xs={6} style={{ paddingRight: '20px', textAlign: 'center' }}>
        <InputBase fullWidth value={score} onChange={onLocalChange}
          inputProps={{ style: { padding: '0', textAlign: 'center'} }} 
        />
      </Grid>
    </Border>
    <Border container alignItems="center" style={style}>
      <InputBase fullWidth value={die} sx={{ fontSize: godly ? '12px' : null }} multiline={godly}
        inputProps={{ style: { padding: '0', textAlign: 'center', lineHeight: '14px' } }} 
      />
    </Border>
  </Grid>
}

function Resource({ id, name, label, value, marginBottom, onChange }) {
  
  function onLocalChange(event) {
    onChange(id, event.target.value)
  }

  return (
    <Border container item xs={12} style={{ height: '0.8in', marginBottom: marginBottom ? '.1in' : '0' }}>
      <Grid container item xs={12} style={{ padding: '2px 4px', borderBottom: '1px solid black' }}>
        <Grid xs item style={{ fontSize: '11px', fontWeight: 'bold' }}>{name}</Grid>
        <Grid xs={6} item style={{ fontSize: '11px', fontWeight: 'bold' }}>
          <InputBase fullWidth value={value} onChange={onLocalChange}
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

function Feat({id, label, name, value, onChange }) {
  
  function onNameChange(event) {
    onChange(id, {
      name: event.target.value,
      value: value
    })
  }

  function onValueChange(event) {
    onChange(id, {
      name: name,
      value: event.target.value
    })
  }

  return (
    <Border container xs={12} style={{ height: '76.8px', marginBottom: '.1in' }}>
      <Grid item xs style={{ height: '20px', marginTop: '-3px' }}>
        <InputBase value={name} sx={{ p: 0 }} fullWidth onChange={onNameChange}
          inputProps={{ style: { padding: '0px 4px', lineHeight: '15px', fontSize: '11px', fontWeight: 'bold' } }} 
        />
      </Grid>
      <Grid item style={{ height: '20px' }}>
        <div style={{ fontSize: '11px', margin: '2px 4px 0 4px', fontWeight: 'bold', textAlign: 'right' }}>{label}</div>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '-10px' }}>
        <InputBase fullWidth multiline value={value} sx={{ p: 0 }} onChange={onValueChange}
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
          <InputBase fullWidth value={value} 
            inputProps={{ style: { padding: '0px', borderBottom: '1px solid black' } }} 
          />
          <div style={{ fontSize: '10px' }}>Character Name</div>
        </Grid>
      </Border>
    </Grid>
  )
}

function Input({ id, label, value, xs, sx, center, onChange }) {
  
  function onLocalChange(event) {
    onChange(id, event.target.value)
  }

  return (
    <Grid xs={xs} item sx={sx}>
      <InputBase fullWidth value={value} sx={{ pt: '2px', height: '22px' }}
        inputProps={{ style: { padding: '0px', borderBottom: '1px solid black', textAlign: center ? 'center' : null } }}              
        onChange={onLocalChange}
      />
      <div style={{ fontSize: '10px', textAlign: center ? 'center' : null }}>{label}</div>
    </Grid>
  )
}

function TextArea({ id, style, rows, height, align, value, onChange }) {
  function onLocalChange(event) {
    onChange(id, event.target.value)
  }

  return (
    <InputBase multiline fullWidth rows={rows} style={{ padding: '0px', ...style }} value={value} onChange={onLocalChange}
      inputProps={{ style: { height: height, textAlign: align, fontSize: '12px', lineHeight: '21px' } }} 
    />
  )
}

export default function CharacterSheet({ file, loadFromURI, match }) {
  const navigate = useNavigate()
  const params = useParams()
  const [data, setData] = React.useState({})
  const windowTitle = data.characterName ? data.characterName : 'Character Sheet'
  useWindowTitle(windowTitle)

  React.useEffect(() => {
    let currentFile = file
    if(loadFromURI) {
      currentFile = JSON.parse(decodeURIComponent(params.file))
    }
    setData({ ...currentFile })
  }, [file, loadFromURI, params.file])

  function onChange(id, value) {
    const newData = { ... data }
    newData[id] = value
    setData(newData)
    const params = encodeURIComponent(JSON.stringify(newData))
    navigate("/print/" + params, { replace: true })
  }

  return <ThemeProvider theme={theme}>
    <Paper size="Letter" page="1" styles={{ color: 'black' }}>
      <Grid container item xs={12} style={{ height: '0.833in', marginBottom: '.1in' }}>
        <Title>Hero Drop</Title>
        <CharacterName value={data.characterName} />
        <Border container xs style={{ marginLeft: '.1in', padding: '0 4px' }}>
          <Input id="level" label={'Level'} value={data.level} xs={1} sx={{ pr: '8px' }} center onChange={onChange} />
          <Input id="raceAndClass" label={'Race and Class'} xs={6} sx={{ pr: '8px' }} value={data.raceAndClass} onChange={onChange} />
          <Input id="playerName" xs={5} label={'Player Name'} value={data.playerName} onChange={onChange} />
          <Input id="age" xs={1} sx={{ pr: '8px' }} label={'Age'} value={data.age} center onChange={onChange} />
          <Input id="alignment" xs={4} sx={{ pr: '8px' }} label={'Alignment'} value={data.alignment} onChange={onChange} />
          <Input id="size" xs={3} sx={{ pr: '8px' }} label={'Size'} value={data.size} onChange={onChange} />
          <Input id="weight" xs={2} sx={{ pr: '8px' }} label={'Weight'} value={data.weight} onChange={onChange} />
          <Input id="height" xs={2} label={'Height'} value={data.height} onChange={onChange} />
        </Border>
      </Grid>
      <Grid container item xs={8} style={{ maxHeight: '336px' }}>
        <Grid container item xs={6} style={{ height: '3.5in'}}>
          <Grid container item style={{ width: '0.833in', marginRight: '8px', }}>
            <Pillar id="combat" name={'Combat'} score={data.combat} onChange={onChange} />
            <Pillar id="social" name={'Social'} score={data.social} onChange={onChange} />
            <Pillar id="exploration" name={'Exploration'} score={data.exploration} onChange={onChange} />
            <Pillar id="magic" name={'Magic'} score={data.magic} onChange={onChange} />
          </Grid>
          <Grid container item xs>
            <Talent id="athletics" name={'Athletics'} score={data.athletics} onChange={onChange} />
            <Talent id="fortitude" name={'Fortitude'} score={data.fortitude} onChange={onChange} />
            <Talent id="influence" name={'Influence'} score={data.influence} onChange={onChange} />
            <Talent id="knowledge" name={'Knowledge'} score={data.knowledge} onChange={onChange} />
            <Talent id="perception" name={'Perception'} score={data.perception} onChange={onChange} />
            <Talent id="stealth" name={'Stealth'} score={data.stealth} onChange={onChange} />
          </Grid>
        </Grid>
        <Grid container item xs={6} style={{ padding: '0 .1in', height: '3.5in' }}>
          <Resource id="health" name={'Health Maximum'} value={data.health} xs={12} marginBottom onChange={onChange} />
          <Resource id="stamina" name={'Stamina Maximum'} value={data.stamina} xs={12} marginBottom onChange={onChange} />
          <Resource id="will" name={'Will Maximum'} value={data.will} xs={12} marginBottom onChange={onChange} />
          <Resource id="mana" name={'Mana Maximum'} value={data.mana} xs={12} marginBottom onChange={onChange} />
        </Grid>
        <Grid container item style={{ paddingRight: '.1in' }}>
          <Grid container item style={{ marginTop: '.1in' }}>
            <Grid container item style={{ width: '240px', marginRight: '-.1in' }}>
              <Notes id="proficiencies" xs={12} title={'Proficiencies'} value={data.proficiencies} offset={'2.5px'} rows={22} height={509} onChange={onChange} />
            </Grid>
            <Grid container item xs style={{ paddingLeft: '.2in' }}>
              <Resource id="wealth" name="Wealth Income" marginBottom value={data.wealth} label={<span>on person <span style={{ marginRight: '.56in' }}></span> in bank</span>} onChange={onChange} />
              <Notes id="racePerks" xs={12} title={'Race Perks'} value={data.racePerks} sx={{ pb: '.1in' }} rows={7} height={200} onChange={onChange} />
              <Notes id="reputation" xs title="Reputation" offset={'7px'} label={'Location'} midLabel="Honor" endLabel="Infamy" rows={7} height={213} value={data.reputation} onChange={onChange} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={4}>
        <Feat id="backgroundFeat" label="Background Feat" name={data.backgroundFeat.name} value={data.backgroundFeat.value} onChange={onChange} />
        <Feat id="level1Feat" label="Level 1 Feat" name={data.level1Feat.name} value={data.level1Feat.value} onChange={onChange} />
        <Feat id="level2Feat" label="Level 2 Feat" name={data.level2Feat.name} value={data.level2Feat.value} onChange={onChange} />
        <Feat id="level3Feat" label="Level 3 Feat" name={data.level3Feat.name} value={data.level3Feat.value} onChange={onChange} />
        <Feat id="level4Feat" label="Level 4 Feat" name={data.level4Feat.name} value={data.level4Feat.value} onChange={onChange} />
        <Feat id="level5Feat" label="Level 5 Feat" name={data.level5Feat.name} value={data.level5Feat.value} onChange={onChange} />
        <Feat id="level6Feat" label="Level 6 Feat" name={data.level6Feat.name} value={data.level6Feat.value} onChange={onChange} />
        <Feat id="attunement1Feat" label="Attunement Feat" name={data.attunement1Feat.name} value={data.attunement1Feat.value} onChange={onChange} />
        <Feat id="attunement2Feat" label="Attunement Feat" name={data.attunement2Feat.name} value={data.attunement2Feat.value} onChange={onChange} />
        <Feat id="attunement3Feat" label="Attunement Feat" name={data.attunement3Feat.name} value={data.attunement3Feat.value} onChange={onChange} />
      </Grid>
    </Paper>

    <Divider style={{ borderColor: '#12121' }} />

    <Paper size="Letter" page="2" styles={{ color: 'black' }}>
      <Grid container item xs={12} style={{ height: '0.833in', marginBottom: '.1in' }}>
        <Title>Hero Drop</Title>
        <CharacterName value={data.characterName} />
        <Border container xs style={{ marginLeft: '.1in', padding: '0 4px' }}>
          <Input id="eyes" xs={4} sx={{ pr: '8px' }} label={'Eyes'} value={data.eyes} onChange={onChange} />
          <Input id="hair" xs={4} sx={{ pr: '8px' }} label={'Hair'} value={data.hair} onChange={onChange} />
          <Input id="skin" xs={4} label={'Skin'} value={data.skin} onChange={onChange} />
          <Input id="carryCapacity" xs={4} sx={{ pr: '8px' }} label={'Carry Capacity (lbs)'} value={data.carryCapacity} onChange={onChange} />
          <Input id="maxMarchSpeed" xs={4} sx={{ pr: '8px' }} label={'Max Marching Speed'} value={data.maxMarchSpeed} onChange={onChange} />
          <Input id="maxMarchDistance" xs={4} label={'Max Marching Distance'} value={data.maxMarchDistance} onChange={onChange} />
        </Border>
      </Grid>

      <Grid container item xs={4}>
        <Notes id="equipment" xs={12} value={data.equipment} title={'Equipment'} offset={'5px'} label={'Item Name'} midLabel="Equipped" endLabel="Weight" rows={24} height={575} onChange={onChange} />
        <Notes id="description" xs={12} value={data.description} sx={{ pt: '.1in' }} title={'Character Description'} rows={11} height={283} onChange={onChange} />
      </Grid>
      <Grid container item xs={8} style={{ fontSize: '10px' }}>
        <Grid item xs={6} sx={{ pl: '.1in' }} >
          <Border container xs={12} style={{ padding: '4px 6px 0 6px', height: '283px' }}>
            <Grid container item xs={12} justifyContent={'space-between'} style={{ fontSize: '11px' }}>
              <b>Movement</b>
              <b>Speed</b>
            </Grid>
            <Grid item xs={9} style={{ lineHeight: '23px' }}>
              <TextArea id="movement" rows={5} height={'112px'} value={data.movement} onChange={onChange} />
            </Grid>
            <Grid container item xs={3} style={{ lineHeight: '23px' }} justifyContent={'flex-end'}>
              <TextArea id="speed" rows={5} height={'112px'} value={data.speed} align="right" onChange={onChange} />
            </Grid>
            <Grid container item xs={12} justifyContent={'space-between'} style={{ fontSize: '11px' }}>
              <b>Jumping</b>
              <b>Distance</b>
            </Grid>
            <Grid item xs={9}>
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
            <Grid container item xs={3} style={{ lineHeight: '23px' }} justifyContent={'flex-end'}>
              <TextArea id="jumping" rows={5} height={'112px'} align="right" value={data.jumping} onChange={onChange} />
            </Grid>
          </Border>
        </Grid>
        <Grid item xs={6} sx={{ pl: '.1in' }} >
        <Border container xs={12} style={{ padding: '4px 6px 0 6px', height: '283px' }}>
            <Grid container item xs={12} justifyContent={'space-between'} style={{ fontSize: '11px' }}>
              <b>Vision</b>
              <b>Distance</b>
            </Grid>
            <Grid item xs={7} style={{ lineHeight: '23px' }}>
              <TextArea id="vision" rows={5} height={'112px'} value={data.vision} onChange={onChange} />
            </Grid>
            <Grid container item xs={5} style={{ lineHeight: '23px' }} justifyContent={'flex-end'}>
              <TextArea id="visionDistance" rows={5} height={'112px'} align="right" value={data.visionDistance} onChange={onChange} />
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
              <TextArea id="range" rows={5} height={'112px'} align="right" value={data.range} onChange={onChange} />
            </Grid>
          </Border>
        </Grid>
        <Spacer height=".1in" />
        <Notes id="principles" xs={6} value={data.principles} sx={{ pl: '.1in' }} title="Principles" rows={11} height={283} onChange={onChange} />
        <Notes id="flaws" xs={6} value={data.flaws} sx={{ pl: '.1in' }} title="Flaws" rows={11} height={283} onChange={onChange} />
        <Spacer height=".1in" />
        <Notes id="backstory" xs={12} value={data.backstory} sx={{ pl: '.1in' }} title={'Character Backstory'} rows={11} height={283} onChange={onChange} />
      </Grid>
    </Paper>
  </ThemeProvider>
}