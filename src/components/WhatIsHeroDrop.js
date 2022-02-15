import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'


import ActionTable from './ActionTable'

export default function WhatIsHeroDrop() {
  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">The Three Pillars of Adventure</Typography>
        <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
          Gameplay is divided into three pillars of adventure: Combat, Social, and Exploration. Combat occurs when a hostile enemy attacks and ends when there are no more hostile enemies. Social interactions occur whenever you interact with a sentient being. Exploration focuses on travel and surviving in different environments. Each pillar is further divided into six talents that define a unique style of gameplay within each pillar.
        </Typography>
      </Box>
      <ActionTable />
    </Card>
  )
}