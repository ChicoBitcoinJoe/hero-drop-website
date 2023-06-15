import * as React from 'react'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import AddIcon from '@mui/icons-material/Add'

import Navigation from "./Navigation"
import SelectTraitsDialog from "../../components/SelectTraitsDialog"
import SpecializationCard from "../../components/SpecializationCard"

export default function ThirdStep({ character, navigation }) {
  const { data, getSpecializationScore, getTotalNaturalSpecializations, getClassScore } = character
  const { totalSpecializations } = data
  const maxSpecializations = 16
  const [key, setKey] = React.useState(null)
  const [contextMenu, setContextMenu] = React.useState(null)
  
  const [open, setOpen] = React.useState(false)
  const handleDialogOpen = () => {
    setOpen(true)
  }

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

  const editSpecialization = (key) => {
    setKey(key)
    setOpen(true)
  }

  const handleSubmit = (specialization) => {
    if(!key) {
      character.addSpecialization(specialization)
    }
    else {
      character.update(key, specialization)
      setKey(null)
    }
    closeDialog()
  }

  const closeDialog = () => {
    setOpen(false)
    setKey(null)
  }

  const deleteSpecialization = () => {
    character.deleteSpecialization(key)
    handleMenuClose()
  }

  return <>
    <StepLabel>
      Choose your Specializations
    </StepLabel>
    <StepContent>
      <Typography variant="subtitle2">
        Specializations are professions, hobbies, or ways of life that can be learned and improved by spending time engaging in that specialization. 
        {/* <i>For example, a lumberjack specialization would have an advantage at Strength, Axe, and Identify Tree related actions. Being a lumberjack is also dangerous, so Danger Sense may be applicable in situations outside of combat. If it's a modern setting, they would also know how to use Heavy Machinery</i> */}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        {
          Array(totalSpecializations).fill(null).map((_, i) => i+1).map((index) => {
            const key = "specialization" + index
            const { specializationName, specializationYears, isNatural, traits } = data[key]
            const traitList = Object.keys(traits)
            const score = getSpecializationScore(key)            

            const specialization = { 
              id: key, 
              isNatural,
              name: specializationName, 
              years: specializationYears,
              score,
              traitList,
              traits,
              edit: editSpecialization,
            }
            return <Grid xs={12} sm={6} key={key}>
              <Card sx={{ width: '100%', overflow: 'visible' }} onContextMenu={handleContextMenu}>
                <CardActionArea onClick={() => editSpecialization(key)}>
                  <SpecializationCard {...specialization} />
                </CardActionArea>
              </Card>
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
                <MenuItem sx={{ minWidth: '120px' }} onClick={deleteSpecialization}>Remove</MenuItem>
              </Menu>
            </Grid>
          })
        }
        <Grid container xs={12}>
          <Grid sx={{ width: '150px', pl: 2 }}>
            Age: {character.getAge()} / {character.sentienceMaxAge}
          </Grid>
          <Grid>
            Category: {character.getAgeCategory()}
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Button
            sx={{ p: 2 }}
            variant="outlined"
            onClick={handleDialogOpen} 
            startIcon={<AddIcon />} 
            disabled={character.totalSpecializations === maxSpecializations}
          >
              Specialization
          </Button>
        </Grid> 
      </Grid>
      <Divider sx={{ my: 2 }} />      
      <Navigation {...navigation} inputComplete={totalSpecializations>0} />
    </StepContent>
    {
      open && <SelectTraitsDialog 
        open={open} 
        closeDialog={closeDialog}
        deleteSpecialization={deleteSpecialization}
        handleSubmit={handleSubmit}
        initialData={character.getSpecialization(key)}
        naturalSpecializations={{
          current: getTotalNaturalSpecializations(),
          max: Number(getClassScore()) + Number(data.sentienceScore)
        }}
      />
    }
  </>
}