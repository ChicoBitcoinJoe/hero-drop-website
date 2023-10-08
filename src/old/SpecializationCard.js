import * as React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

import BorderedContainer from './BorderedContainer'

export default function SpecializationCard({ isNatural, name, years, bonusYears, age, score, traits}) {
  const traitList = Object.keys(traits)
        
  return <>
    {/* <BorderedContainer sx={{ minHeight: '102.5px' }} label={(isNatural ? '(N) ' : '') + name} label2={'Score: '+ score}>
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
    &nbsp;
    <BorderedContainer sx={{ p: 0, minHeight: '102.5px' }} label2={'Score: '+ score}>
      <Card square sx={{ p: 0, width: '100%', border: "none", boxShadow: "none" }}>
        <CardContent sx={{ p: 0, fontSize: '9px' }}>
          <Grid container sx={{ pl: .5, fontSize: '12px', backgroundColor: 'black', color: 'white' }}>
            {(isNatural ? '(N) ' : '') + name}
          </Grid>
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
    </BorderedContainer> */}
    <Grid container sx={{ border: '1px solid black', fontSize: '16px', }}>
      <Grid xs={6} sx={{ px: 1, borderRight: '1px solid black' }}>
        {name + (isNatural ? '(N) ' : '')}
      </Grid>
      <Grid xs container>
        <Grid xs={5.5} px={1}>
          <Grid container justifyContent={'center'}>
            <Grid xs={6}>
            </Grid>
            <Grid xs={6}>
              { !years && !age ? 'Years' : years }  
              { age && ('Age ' + age)}
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs justifyContent={'center'}>
        { !age && '+' }
        </Grid>
        <Grid xs={5.5} container justifyContent={'center'}>
          {!age && !years ? 'Bonus' : bonusYears}
        </Grid>
      </Grid>
      <Grid xs="auto" sx={{ px: .5, borderLeft: '1px solid black' }}>
        { years ? `+ ${score}` : 'Sc.' }
      </Grid>
      <Grid xs={12}>
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
    </Grid>
  </>
}