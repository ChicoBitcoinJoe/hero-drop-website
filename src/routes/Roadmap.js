import * as React from 'react'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function Roadmap({ Links }) {
  function createData(left, middle, right) {
    return { left, middle, right }
  }
  
  const rows = [
    createData( 
      <b>Phase 0</b>,
      "✓",
      <b>Laying the Foundation</b>,
    ),
    createData( 
      "", 
      "✓",  
      'Create a website',
    ),
    createData(
      "",
      "✓", 
      "Start a Community Discord"
    ),  
    createData(
      "",
      "✓", 
      "Deploy the Community DAO",
    ),
    createData(
      <b>Phase 1</b>, 
      "✓", 
      <b>Public Alpha</b>
    ),
    createData(
      "", 
      "", 
      "Grow the Community"
    ),
    createData(
      "", 
      "", 
      "Fund the Community DAO vault"
    ),
    createData(
      <b>Phase 2</b>, 
      "", 
      <b>Public Beta</b>
    ),
    createData(
      "", 
      "", 
      "Incentivize Playtesters and Content Creators"
    ),
    createData(
      "", 
      "", 
      "Fill permanent positions"
    ),
    createData(
      <b>Phase 3</b>, 
      "", 
      <b>The Future</b>
    ),
    createData(
      "", 
      "", 
      "Launch!"
    ),
    createData(
      "", 
      "", 
      "Find Partners to distribute content"
    ),
    createData(
      "", 
      "", 
      "Run exciting events!"
    ),
  ]

  return <>
    <Grid item xs={12}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>Roadmap</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          {/* <TableHead>
            <TableRow key="Headers">
              <TableCell key="Timeline" align="center"><b>Timeline</b></TableCell>
              <TableCell key="Complete" align="center"><b>✔</b></TableCell>
              <TableCell key="Goals" align="left" sx={{ minWidth: '420px' }}><b>Goals</b></TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name + ' ' + index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell key="1" align="center"><b>{row.left}</b></TableCell>
                <TableCell key="2" align="center">{row.middle}</TableCell>
                <TableCell key="3" align="left">{row.right}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  </>
}