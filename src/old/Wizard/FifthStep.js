import * as React from 'react'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import AddIcon from '@mui/icons-material/Add'

import Navigation from "./Navigation"

function Miracle({ data, onChange, id, index }) {
  return <>
    <Grid xs={12}>
      <TextField 
        fullWidth 
        multiline
        id={id}
        label={"Miracle #"+index}
        rows={4}
        value={data[id]}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  </>
}

export default function FifthStep({ character, navigation }) {
  const { data, onChange, update } = character
  const [contextMenu, setContextMenu] = React.useState(null)

  const handleContextMenu = (event) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    )
  }

  const handleMenuClose = () => {
    setContextMenu(null)
  }

  return <>
    <StepLabel>
      Choose your Miracles
    </StepLabel>
    <StepContent>
      <Typography variant="subtitle2">
        The story being told determines your character's starting class as well as how many miracles they start with. Miracles are abilities and items that make your character powerful and unique.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid xs={4} sm={3}>
          <TextField id="totalMiracles" label="Miracles" value={character.totalMiracles} onChange={onChange} />
        </Grid>
        
        <Grid container xs={8} sm={9} sx={{ fontSize: '12px' }} spacing={0}>
          <Grid xs={12} sm={4}>Uncommon (0 - 1)</Grid>
          <Grid xs={12} sm={4}>Rare (1 - 2)</Grid>
          <Grid xs={12} sm={4}>Hero (3 - 4)</Grid>
          <Grid xs={12} sm={4}>Legend (5 - 8)</Grid>
          <Grid xs={12} sm={4}>God (9 - 16)</Grid>
          <Grid xs={12} sm={4}>Primordial (17 - 32)</Grid>
        </Grid>
        {
          Array.from({length: data.totalMiracles}, (v, i) => i).map((index) => {
            return <Grid container xs={12} key={index} onContextMenu={handleContextMenu}>
              <Miracle data={data} onChange={onChange} id={"Miracle"+(index+1)} index={index+1} />
              <Menu
                open={contextMenu !== null}
                onClose={handleMenuClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
              >
                <MenuItem sx={{ minWidth: '120px', height: '40px' }} disabled></MenuItem>
                <MenuItem sx={{ minWidth: '120px' }} onClick={null}>Remove</MenuItem>
              </Menu>
            </Grid>
          })
        }
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Navigation {...navigation} inputComplete />
    </StepContent>
  </>
}