import * as React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

function RewardCard({ Links, array, color, action, children }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    <Card sx={{ borderRadius: '16px', p: 2, border: '4px solid rgba(' + color + ',1)' }} align="center">
      <Typography variant="subtitle1">{array[0]}</Typography>
      <Typography variant="h3">{array[1]}</Typography>
      <Typography variant="subtitle1">{array[2]}</Typography>
      <Typography variant="h4" sx={{ py: 2 }}>{array[3]}</Typography>
      <Button size="large" variant="contained" fullWidth onClick={handleClickOpen}
        sx={{ 
          backgroundColor: 'rgba(' + color + ',0.7)', 
          color: 'white', 
          '&:hover': {
            backgroundColor: 'rgba(' + color + ',1)',
            borderColor: '#0062cc',
          }, 
        }}>
        Learn More
      </Button>
      <Dialog
        maxWidth={'xs'}
        PaperProps={{ sx: { border: '4px solid rgba(' + color + ',1)' } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {children}
        <DialogActions sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button fullWidth component="a" variant="outlined" color="warning" href={Links.Community.DAOGuide} target="_blank" rel="noreferrer">
                What is a DAO?
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth 
              sx={{ 
                backgroundColor: 'rgba(' + color + ',0.7)', 
                color: 'white', 
                '&:hover': {
                  backgroundColor: 'rgba(' + color + ',1)',
                  borderColor: '#0062cc',
                }, 
              }} 
              href={action[1]} target="_blank" rel="noreferrer">
              {action[0]}</Button> 
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Card>
  </>
}

export default function Participation({ Links }) {

  const [currentAction, setCurrentAction] = React.useState('to Write!')

  React.useEffect(() => {
    const interval = setInterval(() => {
      if(currentAction === 'to Write!') {
        setCurrentAction('to Draw!')
      }
      else if(currentAction === 'to Draw!') {
        setCurrentAction('to Play!')
      }
      else if(currentAction === 'to Play!') {
        setCurrentAction('to Write!')
      }
      else
        console.error('not possible')
    }, 4000)

    return () => { clearInterval(interval) }
  }, [currentAction])

  return <>
    <Grid item xs={12} sx={{ mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 2 }} align="center">Earn Rewards for Participating!</Typography>      
    </Grid>    
    <Grid container spacing={6} sx={{ mt: 0 }} justifyContent="center">
      <Grid item xs={10} sm={7} md={5} lg={4}>
        <Typography variant="h5" sx={{ ml: 2, mb: 1 }}>Community DAO</Typography>
        <Card sx={{ p: 2, border: '1px solid white', borderRadius: '16px' }}>
          <RewardCard 
            Links={Links} 
            color={'111,113,189'} 
            array={["Earn","10 REP","per POST","to Promote!"]}
            action={['Explore the Community DAO', Links.Community.DAO]}>
            <DialogTitle>
              Earning Reputation
            </DialogTitle>
            <DialogContent>
              Reputation is used to vote on different proposals submitted to the Community DAO. You join by submitting a proposal to claim 1 reputation. Earn more by donating your time participating in the community. The Community DAO is deployed on the Rinkeby Test Network and is free to to use.
              <Divider sx={{ my: 4 }} />
              Earn 10 REPUTATION to post on social media (up to 3 platforms). Care must be taken not to create spam. Each post must have a reason for existing such as:
              <ul>
                <li>New content was tributed to the DAO</li>
                <li>You participated in a playtest session</li>
                <li>A new partnership is made</li>
              </ul>
              For more information join the discord or contact support.
            </DialogContent>            
          </RewardCard>
        </Card>
      </Grid>      
      <Grid item xs={10} sm={12} md={10} lg={8}>
        <Typography variant="h5" sx={{ ml: 2, mb: 1 }}>Asset DAO</Typography>
        <Card sx={{ p: 2, border: '1px solid white', borderRadius: '16px' }}>        
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <RewardCard 
                Links={Links} 
                color={'125,186,111'} 
                array={["Tribute","2 DAI","per SHARE","to Vote!"]}
                action={['Explore the Asset DAO', Links.Community.DAO]}>
                <DialogTitle>
                  Tribute Dai for Shares
                </DialogTitle>
                <DialogContent>
                  SHARES are used to decide on governance decisions in the DAO such as new partners, paid positions, and rewarding content creators for things such as NFTs and other IP. Any distribution phases after the first are approved by the DAO using SHARES as votes.
                  <Divider sx={{ my: 4 }} />
                  A total of 400,000 SHARES will be distributed to those who tribute Dai to the Asset DAO. <a style={{ color: 'white' }} href="https://makerdao.com/en/" >What is Dai?</a>
                  <Grid container justifyContent="center" sx={{ p: 2 }}>
                    <b>2 Dai</b>
                    <DoubleArrowIcon sx={{ mx: 2}} />
                    <b>1 Voting Share</b>
                  </Grid>
                  For more information join the discord or contact support.
                </DialogContent>
              </RewardCard>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <RewardCard 
                Links={Links} 
                color={'187,10,30'} 
                array={["Earn up to","60 LOOT","per HOUR",currentAction]}
                action={['Explore the Asset DAO', Links.Community.DAO]}>
                <DialogTitle>
                  Earn LOOT in the Asset DAO
                </DialogTitle>
                <DialogContent>
                  You can earn LOOT rewards by tributing your time to the Asset DAO.
                  <Divider sx={{ my: 4 }} />
                  A total of <b>150,000 LOOT</b> will be distributed to those who tribute their time. In the event all voting shares are distributed, each LOOT will be worth roughly <b>1 dollar.</b>
                  <ul>
                    <li>60 LOOT per hour per piece of concept art</li>
                    <li>60 LOOT per hour to write a campaign</li>
                    <li>60 LOOT per hour to translate content</li>
                    <li>60 LOOT per hour to create a unique creature</li>
                    <li>60 LOOT per hour to run a playtest session</li>
                    <li>30 LOOT per hour to join a playtest session</li>
                  </ul>
                  For more information join the discord or contact support.
                </DialogContent>
              </RewardCard>
            </Grid>
          </Grid>
        </Card>        
      </Grid>
    </Grid>
  </>
}