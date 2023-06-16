import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"
import ThirdStep from "./ThirdStep"
import FourthStep from "./FourthStep"
import FifthStep from "./FifthStep"
import Container from '../../components/Container'

import useCharacter from '../../hooks/useCharacter'

export default function Wizard({ appReady, roster }) {
  let navigate = useNavigate()
  const characterPath = useParams()['*']
  const character = useCharacter()
  const [activeStep, setActiveStep] = React.useState(0)
  const [ready, setReady] = React.useState(false)
  const navigation = {activeStep, setActiveStep}
  
  React.useEffect(() => {
    if(!roster) return

    loadCharacter()
  }, [roster]) // eslint-disable-line

  async function loadCharacter() {
    if(characterPath) {
      const data = await roster.loadMember(characterPath)
      character.setData(data)
      setReady(true)
    }
    else {
      setReady(true)
    }
  }

  const handleReset = () => {
    setActiveStep(4)
  }
  
  const handleSubmit = async () => {
    let newCharacterPath = null
    console.log(characterPath, roster.list.indexOf(characterPath))
    const index = roster.list.indexOf(characterPath)
    if(!characterPath || index === -1) {
      console.log('add')
      newCharacterPath = await roster.addMember(character.data)
    }
    else {
      console.log('update')
      newCharacterPath = await roster.updateMember(index, character.data)
    }
    navigate('/print/' + newCharacterPath)
  }

  return <>
    <Container>
      <Grid container xs={12}>
        {
          !characterPath ?
          <Button sx={{ color: 'black' }} onClick={() => navigate("/roster")} startIcon={<ArrowBackIosNewIcon sx={{ color: "#000" }} /> }>
            Roster
          </Button>
          : <Button sx={{ color: 'black' }} onClick={() => navigate("/print/"+characterPath)} startIcon={<ArrowBackIosNewIcon sx={{ color: "#000" }} /> }>
            Cancel
          </Button>
        }
      </Grid>
      <Grid xs={12}>
        { ready && <Stepper activeStep={activeStep} orientation="vertical">
          <Step key="FirstStep"><FirstStep character={character} navigation={navigation} /></Step>
          <Step key="SecondStep"><SecondStep character={character} navigation={navigation} characterPath={characterPath}/></Step> 
          <Step key="ThirdStep"><ThirdStep character={character} navigation={navigation} /></Step>
          <Step key="FourthStep"><FourthStep character={character} navigation={navigation} /></Step>
          <Step key="FifthStep"><FifthStep character={character} navigation={navigation} /></Step>
        </Stepper>}
        {activeStep === 5 && (
          <Paper square elevation={0} sx={{ mt: 2, p: 3 }}>
            <Typography>All steps completed - If you are satisfied with your character hit the "save" button.</Typography>
            <Button variant="outlined" onClick={handleSubmit} sx={{ mt: 1, mr: 1 }}>
              Save
            </Button>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              back
            </Button>
          </Paper>
        )}
      </Grid>
    </Container>
  </>
}