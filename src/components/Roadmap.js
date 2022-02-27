import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(left, middle, right) {
  return { left, middle, right };
}

export default function Roadmap({ Links }) {

  const rows = [
    createData( 
      <b>January 2022</b>, 
      "✓",
      <b>Phase 0 - Laying the Foundation</b>, 
    ),
    createData( 
      "", 
      "✓",  
      'Create the Website',
    ),
    createData(
      "",
      "✓", 
      "Create the community Discord"      
    ),  
    createData(
      "",
      "✓", 
      "Deploy the DAO on the Polygon Network",
    ),
    createData(
      <b>February</b>, 
      "✓", 
      <b>Phase 1 - It Is Dangerous To Go Alone!</b>
    ),
    createData(
      "", 
      "", 
      "Grow number of members in the community Discord to 1,000"
    ),
    createData(
      "",
      "", 
      "Grow the number of members in the Hero Drop DAO to 100",
    ),
    createData(
      "",
      "", 
      "Incentivize playtesters and content creators with rewards",
    ),
    createData(
      <b>July</b>, 
      "", 
      <b>Phase 2 - Boss Fight</b>
    ),
    createData(
      "", 
      "", 
      "Hero Drop leave alpha!"
    ),
    createData(
      "", 
      "", 
      "The DAO defines the partner Fee"
    ),
    createData(
      "", 
      "", 
      "Find Partners to distribute content"
    ),
    createData(
      <b>January 2023</b>, 
      "", 
      <b>Phase 3 - Treasure Room</b>
    ),
    createData(
      "", 
      "", 
      "Hero Drop leaves beta!"
    ),
    createData(
      "", 
      "", 
      "Continue growing the community"
    ),
    createData(
      "", 
      "", 
      "Use funds collected from partners to run exciting events!"
    ),
  ];

  return <>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow key="Headers">
            <TableCell key="Timeline" align="center"><b>Timeline</b></TableCell>
            <TableCell key="Complete" align="center"><b>✔</b></TableCell>
            <TableCell key="Goals" align="left" sx={{ minWidth: '420px' }}><b>Goals</b></TableCell>
          </TableRow>
        </TableHead>
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
  </>
}