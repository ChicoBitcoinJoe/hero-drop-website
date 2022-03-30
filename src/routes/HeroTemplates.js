import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

import Header from '../components/Header'
import WhatIsHeroDrop from '../components/WhatIsHeroDrop'
import HowToPlay from '../components/HowToPlay'
import ReasonsToTry from '../components/ReasonsToTry'
import AboutTheCreator from '../components/About'
import Navbar from '../components/Navbar'

function useWindowWidth() {
  
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return windowWidth
}

export default function ClassTemplates({ Links }) {
  const windowWidth = useWindowWidth()
  return <>
    <AppBar position="fixed" color="primary" elevation={0} className="hide-on-print">
      <Navbar label='Hero Drop' Links={Links} />
    </AppBar>
    <div style={{ height: '56px' }}></div>
    <AppBar position="static" color="primary" elevation={2} sx={{ mt: 8, p: 3, textAlign: 'center' }} className="hide-on-print">
      <div>
        Any questions? Email <Link sx={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }} href="mailto:support@herodrop.org" target="_blank">support@herodrop.org</Link>
      </div>
    </AppBar>
  </>
}