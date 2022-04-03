import * as React from 'react'
import { Link } from 'react-router-dom'

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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import TwitterIcon from '@mui/icons-material/Twitter'
import { FaDiscord as DiscordIcon } from "react-icons/fa"
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import { useNavigate } from "react-router-dom"
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
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
            <ListItemButton component={MuiLink} sx={{ pl: 4 }} href="/character-sheet/fighter">
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

export default function Navbar({ label, Links }) {
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
      <IconButton ref={ref} href={Links.Community.Twitter} target="_blank"><TwitterIcon /></IconButton>
      <IconButton ref={ref} href={Links.Community.Discord} target="_blank"><DiscordIcon /></IconButton>
    </Toolbar>
  </>
}