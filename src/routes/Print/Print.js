import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import { useCharacter } from '../../hooks/useCharacterManager'

export default function Print({ appReady, roster }) {
  const navigate = useNavigate()
  const characterPath = useParams()['*']
  const character = useCharacter()
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    if(appReady) asyncLoadCharacter(characterPath)
  }, [appReady]) // eslint-disable-line

  async function asyncLoadCharacter() {
    if(characterPath) {
      // console.log('async load', characterPath)
      const characterData = await roster.loadCharacter(characterPath)
      console.log(characterData)
      character.setData(characterData)
    }
    setReady(true)
  }

  return <>
    <Box sx={{ background: 'grey' }}>
      <Button 
        sx={{ m: 2, color: 'white', displayPrint: 'none' }} 
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/roster')}
      >
        Roster
      </Button>
      <Button 
        sx={{ m: 2, color: 'white', displayPrint: 'none' }}
        onClick={() => navigate('/wizard/'+characterPath)}
      >
        Edit Character
      </Button>

      {/* <Page0 character={character}  />

      <Divider sx={{ displayPrint: "none", my: 4 }} /> */}

      <Page1 character={character} />

      <Divider sx={{ displayPrint: "none", my: 4 }} />

      <Page2 character={character} />

      <Divider sx={{ displayPrint: "none", my: 4 }} />

      <Page3 character={character} />

    </Box>
  </>
}