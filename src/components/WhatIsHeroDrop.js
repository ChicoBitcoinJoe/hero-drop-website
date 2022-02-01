import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

export default function WhatIsHeroDrop() {
  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <Typography variant="h4">What is Hero Drop?</Typography>
      <Typography variant="body1" sx={{ my: 2, textAlign: 'justify'}}>
        Hero Drop is a simple to learn tabletop roleplaying game with a strong focus on teamwork and creativity. Heroes, both good and evil, roam the land. Some fight divine wars, others fight for themselves, or choose not to fight at all, but all heroes leave a mark wherever they travel. Gameplay is divided into three pillars of adventure: Combat, Social, and Exploration. Combat occurs when a hostile enemy attacks and ends when there are no more hostile enemies. Social interactions occur whenever you interact with a sentient being. Exploration focuses on travel and surviving in different environments. Each pillar is further divided into six talents that define a unique style of gameplay within each pillar.
      </Typography>
    </Card>
  )
}