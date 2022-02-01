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

function Navbar({ label, Links }) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, p: 0.5 }}>
        <Avatar alt="Remy Sharp" src={logo}/>
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        <Hidden only="xs">{label}</Hidden>
      </Typography>
      <NavMenu label="Resources" menuItems={[
        createMenuItem('Rulebook', Links.Rulebook), 
        createMenuItem("Bard's Guide", Links.BardsGuide), 
        createMenuItem('Printable Character Sheet', Links.CharacterSheet), 
      ]} />
      <NavMenu label="Community" menuItems={[
        createMenuItem('Discord', Links.Discord), 
        createMenuItem("Community DAO", Links.CommunityDAO), 
      ]} />
    </Toolbar>
  );
}

export default Navbar