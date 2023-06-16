import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import AddIcon from '@mui/icons-material/Add'
import { Divider } from '@mui/material'

import useCharacter from '../hooks/useCharacter'
import Container from '../components/Container'

function CharacterCard({ index, characterPath, roster, height, img }) {
  const navigate = useNavigate()
  const character = useCharacter()
  const [contextMenu, setContextMenu] = React.useState(null)
  
  React.useEffect(() => {
    (async function() {
      const data = await roster.loadMember(characterPath)
      character.setData(data)
    })()
  }, [characterPath])

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

  const handleClose = () => {
    setContextMenu(null)
  }
  
  const handleEdit = () => {
    navigate('/wizard/' + characterPath)
  }
  
  const handleDelete = () => {
    roster.removeMember(index)
    handleClose()
  }

  const textStyles = {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: '4px'
  }

  return <>
    <Card sx={{ background: 'rgba(0,0,0,0.8)', border: '0.5px solid grey', width: '100%' }} onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      <CardActionArea sx={{ position: 'relative' }} onClick={() => navigate('/print/'+characterPath)} target="_blank">
        <CardMedia
          component="img"
          height={ height || "200" }
          image={img}
          alt={"placeholder"}
        />
        <CardContent sx={{ p: 1, pl: 0, position: 'absolute', bottom: '0px', left: '0px' }}>
          { character.data && <Typography sx={{ ...textStyles, p: 1, ml: 1, mb: 0 }} gutterBottom variant="h5" component="div">
            {character.characterName}
          </Typography>}
          { 
            character.data && 
            <Typography sx={{ ...textStyles, p: 1, ml: 1, mb: 0, mt: '-16px' }} variant="body2">
              Player: {character.playerName}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
    </Card>
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <MenuItem sx={{ minWidth: '120px' }} onClick={handleEdit}>Edit {character.characterName} </MenuItem>
      <MenuItem sx={{ minWidth: '120px', height: '40px' }} disabled></MenuItem>
      <MenuItem sx={{ minWidth: '120px' }} onClick={handleDelete}>Remove From Roster </MenuItem>
    </Menu>
  </>
}

export default function List({ roster }) {
  const navigate = useNavigate()
  
  return <>
    <Container justifyContent="center" alignItems="start">
      <Grid container xs={12}>
        <Grid>
          <Button sx={{ color: 'black' }} onClick={() => navigate("/home")} startIcon={<ArrowBackIosNewIcon sx={{ color: "#000" }} /> }>
            Home
          </Button>
        </Grid>
        <Grid xs />
        <Grid>
          <Button sx={{ color: 'black' }} onClick={() => navigate('/wizard')} startIcon={<AddIcon sx={{ color: "#000" }} />}>
            Member
          </Button>
        </Grid>
      </Grid>        
      <Grid xs={12}>
        <Divider textAlign="left">Roster</Divider>
      </Grid>
      {
        roster.ready && <>
          <Grid container xs={12} spacing={2}>
            {
              roster.list.map((characterPath, index) => {
                return <Grid key={index} xs={12} sm={6}>
                  <CharacterCard index={index} characterPath={characterPath} roster={roster} />
                </Grid>
              })
            }
          </Grid>
        </>
      }
    </Container>
  </>
}