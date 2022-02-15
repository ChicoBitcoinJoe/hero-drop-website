import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded'

import Distribution from '../components/Distribution'

function HowToJoin({ Links }) {
  return <>
    <Grid item>
      <Typography variant="h4" sx={{ pb: 1 }}>
        How to Join the DAO
      </Typography>
      <Typography variant="body1" sx={{ color: '#ff5d5d' }}>
        WARNING: If you don’t understand something when handling cryptocurrency it is better to do nothing and ask questions first. Even when using a test network you need to use best practices to be ready for and ensure that you make the correct choice when using real currency.
      </Typography>
    </Grid>
    <Grid container item spacing={4}>
      <Typography component={Grid} item variant="body1">
        <b style={{ float: 'left', padding: '6px 16px', fontSize: '24px' }}>1.</b>
        Choose an Ethereum Wallet such as <Link href={Links.HowTo.Metamask} target="_blank">Metamask</Link> BUT for large amounts you should use a hardware wallet such as from <Link href={Links.HowTo.Ledger} target="_blank">Ledger</Link> or a multisignature setup. Securely store your wallet seed and passphrase or you may <Link href={Links.HowTo.StoreSeed} target="_blank">lose your funds</Link> in the future!
      </Typography>
      <Typography component={Grid} item variant="body1">
        <b style={{ float: 'left', padding: '6px 16px', fontSize: '24px' }}>2.</b>
        Connect your wallet to the Polygon Network. If you are using Metamask follow <Link href={Links.HowTo.Polygon} target="_blank">these instructions</Link>. Otherwise follow the instruction provided by your own wallet.
      </Typography>
      <Typography component={Grid} item variant="body1">
        <b style={{ float: 'left', padding: '6px 16px', fontSize: '24px' }}>3.</b>
        Polygon requires the Matic token to execute transactions on the Polygon Network. Use a service such as <Link href={Links.HowTo.Matic} target="_blank">Moonpay</Link> to get your own Matic if you do not have any.
      </Typography>
      <Typography component={Grid} item variant="body1">
        <b style={{ float: 'left', padding: '6px 16px', fontSize: '24px' }}>4.</b>
        The DAO requires <Link href={Links.HowTo.Dai} target="_blank">Dai</Link> in order to give tribute for voting shares or to make proposals for the DAO to vote on. Use a service such as <Link href={Links.HowTo.Uniswap} target="_blank">Uniswap</Link> to trade Matic for Dai. Take care to keep a reserve amount of Matic to execute transactions.
      </Typography>
      <Typography component={Grid} item variant="body1">
        <b style={{ float: 'left', padding: '6px 16px 0px', fontSize: '24px' }}>5.</b>
        Go to the <Link href={Links.Community.DAO} target="_blank">Hero Drop DAO website</Link> and sign in to the Polygon Network with your wallet of choice and go to the Proposals tab by clicking the <CollectionsBookmarkRoundedIcon sx={{ mx: 1 }} /> icon.
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1, pl: 10 }}>
        <ol>
          <li>
            <Typography component={Grid} xs={12} container alignItems="center" item variant="body1" sx={{ ml: 2 }}>
              Click the <Button sx={{ mx: 1, backgroundColor: '#ED963A', color: 'white !important', textTransform: 'none' }} disabled>New Proposals +</Button> button to start a new proposal and select the “Request shares for tokens” option.
            </Typography>
          </li>
          <li>
            <Typography component={Grid} xs={12} container alignItems="center" item variant="body1" sx={{ ml: 2 }}>
              Enter “Join DAO Request” for the title
            </Typography>
          </li>
          <li>
            <Typography component={Grid} xs={12} container alignItems="center" item variant="body1" sx={{ ml: 2 }}>
              Enter the amount of voting shares you desire for “Shares Requested”
            </Typography>
          </li>
          <li>
            <Typography component={Grid} xs={12} container alignItems="center" item variant="body1" sx={{ ml: 2 }}>
              Enter 2 dai per voting share you desire for “Tribute Offered”
            </Typography>
          </li>
          <li>
            <Typography component={Grid} xs={12} container alignItems="center" item variant="body1" sx={{ ml: 2 }}>
              Enter a brief description of why you are supporting Hero Drop and how you might contribute
            </Typography>
          </li>
        </ol>
      </Grid>
    </Grid>
  </>
}

export default function Dao({ Links }) {
  return <>
    <div style={{ height: '10vh' }}></div>
    <Grid container item xs={12} justifyContent={'center'}>
      <Grid sx={{ maxWidth: '996px', p: 2 }}>
        <Typography variant="h1" align="center" sx={{ display: { xs: 'none', sm: 'block' }}}>
          Hero Drop DAO
        </Typography>
        <Typography variant="h2" align="center" sx={{ display: { xs: 'block', sm: 'none' }}}>
          Hero Drop DAO
        </Typography>
        
        <Grid container spacing={2} sx={{ pt: 8 }}>
          <Grid item>
            <Typography variant="h4">
              What is a DAO?
            </Typography>
            <Typography variant="body1" sx={{ py: 2 }}>
              A DAO is a community of people with a shared goal. The community as a whole decide where resources owned by the community are used. Using blockchain technology, DAOs have become one of the easiest and safest ways to fund your favorite projects.
            </Typography>
            <Button variant="outlined" href={Links.LearnMore} target="_blank">Learn more</Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ pt: 8 }}>
          <Grid item xs={12}>
            <Typography variant="h4">
              The Hero Drop DAO
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="body1">
              The Hero Drop DAO holds blockchain assets such as cryptocurrencies and NFTs. Funds sent to the DAO are used to pay for permanent positions in the DAO as well as anything else the DAO votes on. The creator acts as a benevolent dictator until enough shares are distributed over time and the DAO becomes owned by the community. Shares are used for voting whereas Loot has the same value as a Share but has no voting power. Should each Share and Loot be distributed then each will be worth roughly 1 Dai. Future distributions are decided by the DAO using voting shares.
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}href={Links.Community.DAO} target="_blank" color="warning">
              Explore the DAO
            </Button>
          </Grid>
          <Grid item xs={12} md={7}>
            <Distribution />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ pt: 8 }}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Earning Rewards
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <ul>
                <li>60 LOOT per hour per piece of concept art</li>
                <li>60 LOOT per hour to run a Hero Drop session</li>
                <li>30 LOOT per hour to play in a Hero Drop session</li>
                <li>60 LOOT per hour to write a scenario or campaign</li>
                <li>30 LOOT per hour to create a unique monster or character</li>
              </ul>
              Currently you must email <b>joe@herodrop.org</b> if you want to earn Loot rewards in the DAO.              
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ pt: 8 }}>
          <HowToJoin Links={Links} />
        </Grid>
      </Grid>
    </Grid>
  </>
}