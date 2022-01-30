import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import logo from '../logo.png';

const RulebookLink = "https://docs.google.com/document/d/1s07JBt4ydLFZTLBsmE2q0BFiW32j7CPS1l54scmiiJo/edit?usp=sharing"
const BardsGuideLink = "https://docs.google.com/document/d/1sYbL_LNhaXJnUL4doECauA8FChkL0_o0P5XuVVxby20/edit?usp=sharing"
const CharacterSheetLink = "https://drive.google.com/file/d/1RHzUlfzSAGwazND7HJ1TnysoT8l59hZ7/view?usp=sharing"
const DiscordInviteLink = "https://discord.gg/2mkNaseFph"

function NavMenu({ label, menuItems}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return <>
    <Button
      id="demo-customized-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      disableElevation
      sx={{ color: "white" }}
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
              <Link target="_blank" href={menuItem.link} color="inherit" underline="none">{menuItem.name}</Link>
            </MenuItem>
          )
        })
      }
    </Menu>
  </>
}

function createMenuItem(name, link) {
  return { name, link }
}

function Navbar({ label }) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, p: 0.5 }}>
        <Avatar alt="Remy Sharp" src={logo}/>
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        <Hidden only="xs">{label}</Hidden>
      </Typography>
      <NavMenu label="Resources" menuItems={[
        createMenuItem('Rulebook', RulebookLink), 
        createMenuItem("Bard's Guide", BardsGuideLink), 
        createMenuItem('Printable Character Sheet', CharacterSheetLink), 
      ]} />
      <NavMenu label="Community" menuItems={[
        createMenuItem('Discord', DiscordInviteLink), 
        createMenuItem("DAO (coming soon!)", null), 
      ]} />
    </Toolbar>
  );
}

export default Navbar