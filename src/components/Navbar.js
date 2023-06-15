import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Hidden from '@mui/material/Hidden'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import TwitterIcon from '@mui/icons-material/Twitter'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import { FaDiscord as DiscordIcon } from "react-icons/fa"

import logo from '../logo.png'

function NavMenu({ label, menuItems}) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [openList, setOpenList] = React.useState(false)

  const handleListClick = () => {
    setOpenList(!openList)
  }

  return <>
    <Button
      id="demo-customized-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      disableElevation
      sx={{ color: "white", borderColor: 'white', display: { xs: 'none', sm: 'flex' } }}
      endIcon={<KeyboardArrowDownIcon/>}
    >
      {label}
    </Button>
    <Button
      id="demo-customized-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      disableElevation
      size="small"
      sx={{ color: "white", borderColor: 'white', display: { xs: 'flex', sm: 'none' } }}
      endIcon={<KeyboardArrowDownIcon/>}
    >
      {label}
    </Button>
    <Menu
      id="basic-menu"
      elevation={1}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {
        menuItems.map((menuItem, index) => {
          return (
            <MenuItem key={index} sx={{ minWidth: '130px' }} disabled={!menuItem.link}>
              <MuiLink sx={{ width: '100%' }} target={ menuItem.options.newWindow ? "_blank" : null } href={menuItem.link} color="inherit" underline="none">
                <Grid container>
                  <Grid item xs>
                    {menuItem.name}
                  </Grid>
                  <Grid item>
                    {menuItem.icon}
                  </Grid>
                </Grid>
              </MuiLink>
            </MenuItem>
          )
        })
      }
      <List>
        <ListItemButton onClick={handleListClick}>          
          <ListItemText primary="Hero Templates" />
          &nbsp;&nbsp;
          {openList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={MuiLink} sx={{ pl: 4 }} href="/templates/fighter">
              <ListItemText primary="Fighter" />
            </ListItemButton>
            <ListItemButton component={MuiLink} sx={{ pl: 4 }} href="/character-sheet/rogue">
              <ListItemText primary="Rogue" />
            </ListItemButton>
            <ListItemButton component={MuiLink} sx={{ pl: 4 }} href="/character-sheet/wizard">
              <ListItemText primary="Wizard" />
            </ListItemButton>
            <ListItemButton component={MuiLink} sx={{ pl: 4 }} href="/character-sheet/cleric">
              <ListItemText primary="Cleric" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Menu>
  </>
}

function createMenuItem(name, link, options) {
  return { name, link, options }
}

export const Links = {
  Resources: {
    Rulebook: "https://docs.google.com/document/d/1s07JBt4ydLFZTLBsmE2q0BFiW32j7CPS1l54scmiiJo/edit?usp=sharing",
    BardsGuide: "https://docs.google.com/document/d/1sYbL_LNhaXJnUL4doECauA8FChkL0_o0P5XuVVxby20/edit?usp=sharing",
    CharacterSheet: "https://drive.google.com/file/d/1RHzUlfzSAGwazND7HJ1TnysoT8l59hZ7/view?usp=sharing",
  },
  DAO: {
    LearnMore: "https://docs.google.com/document/d/1SPz2uUbLthxfkQSCgItmYpRw7QTx8EuxqW6qox5R0DQ/edit?usp=sharing",
    Website: "https://app.daohaus.club/dao/0x89/0xa7ddfaaa605b9699e08543d980b40ffb94894ba7",
    Testnet: "https://app.daohaus.club/dao/0x4/0x9747a913f50a2f1b9f1a7bb2d4fbc4fb1d678bbb",
  },
  Community: {
    Discord: "https://discord.com/channels/927340117637603370/927340117637603373",
    Twitter: "https://twitter.com/HeroDropTTRPG",
  },
  HowTo: {
    LearnMore: "https://ethereum.org/en/dao/",
    Metamask: "https://metamask.io/",
    Ledger: "https://www.ledger.com/",
    StoreSeed: "https://www.coinbase.com/learn/crypto-basics/what-is-a-seed-phrase",
    Polygon: "https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/",
    Matic: "https://www.moonpay.com/buy/matic",
    Dai: "https://makerdao.com/en/",
    Uniswap: "https://app.uniswap.org/#/swap?chain=polygon",
  },
  ProfilePicture: "https://avatars.githubusercontent.com/u/21048886?v=4"
}

export default function Navbar({ label }) {
  const ref = React.createRef()
  return <>    
    <Toolbar>
      <IconButton component={Link} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, p: 0.5 }} to="/">
        <Avatar alt="Remy Sharp" src={logo}/>
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        <Hidden only="xs">{label}</Hidden>
      </Typography>
      <NavMenu label="Resources" menuItems={[
        createMenuItem('Rulebook', Links.Resources.Rulebook, { newWindow: true }), 
        createMenuItem("Bard's Guide", Links.Resources.BardsGuide, { newWindow: true }),
        createMenuItem('Character Sheet', '/character-sheet', { newWindow: true }),
      ]} />
      {/* <Divider orientation="vertical" flexItem sx={{ m: 1 }} />       */}
      {/* <Button component={Link} sx={{ color: "white" }} to="/dao">DAO</Button> */}
      <Divider orientation="vertical" flexItem sx={{ m: 1 }} />
      <IconButton href={Links.Community.Twitter} target="_blank"><TwitterIcon sx={{ color: "#fff" }} /></IconButton>
      <IconButton href={Links.Community.Discord} target="_blank"><DiscordIcon color="#fff" /></IconButton>
    </Toolbar>
  </>
}