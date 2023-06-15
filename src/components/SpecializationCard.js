import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import BorderedContainer from './BorderedContainer'

export default function SpecializationCard({ isNatural, name, years, bonusYears, age, score, traits}) {
  const traitList = Object.keys(traits)
        
  return <>
    <BorderedContainer sx={{ minHeight: '102.5px' }} label={(isNatural ? '(N) ' : '') + name} label2={'Score: '+ score}>
      <Grid container>
        <Card sx={{ width: '100%', border: "none", boxShadow: "none" }}>
          <CardContent sx={{ p: 1, fontSize: '9px', "&:last-child": { paddingBottom: 1 } }} >
            <Grid container>
              <Grid xs={6}>
                { !years ? '' : years + ' year' + (years > 1 ? 's' : '') }
                { age && ('Age ' + age)}
              </Grid>
              <Grid xs={6}>
                Bonus: {bonusYears}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid xs={12} sx={{ pt: 1 }}>
                <Divider textAlign="left">Traits</Divider>
              </Grid>
              <Grid container xs={12} spacing={1}>
                { traitList.length === 0 && <>&nbsp;</>}
                {
                  traitList.map((trait, index) => {
                    return <React.Fragment key={index}>
                      { 
                        traits[trait] && <Grid xs="auio">
                          { trait }
                          { ' ('+ Math.round( traits[trait] === 'half' ? score/2 : score) +') ' }
                        </Grid> 
                      }
                    </React.Fragment>
                  })
                }
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </BorderedContainer>
  </>
}