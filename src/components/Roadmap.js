import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(timeline, complete, goal, link) {
  return { timeline, complete, goal, link };
}

export default function Roadmap({ Links }) {

  const rows = [
    createData( 
      "January", 
      "✓",  
      'Create a Website',
    ),
    createData(
      "",
      "✓", 
      "Create the Community Discord",
      Links.Discord
    ),  
    createData(
      "", 
      "✓",
      "Create the Hero Drop Community DAO",
      Links.CommunityDAO   
    ),  
    createData(
      "", 
      "✓", 
      "Create the Hero Drop Asset DAO",
      Links.AssetDAO
    ),
    createData(
      "February", 
      "", 
      "Grow the number of members in the Discord",
      "4/1000"
    ),
    createData(
      "", 
      "", 
      "Grow the number of members in the Community DAO",
      "1/250"
    ),
    createData(
      "", 
      "", 
      "Grow the number of members in the Asset DAO",
      "1/100"
    ),
    createData(
      "", 
      "", 
      "Define Partner Fee and find Partners"
    ),
    createData(
      "December", 
      "", 
      "Hero Drop leaves beta"
    ),
    createData(
      "", 
      "", 
      "Continue growing the community and run exciting events!"
    ),
  ];

  return <>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow key={'Headers'}>
            <TableCell key="Timeline"><b>Timeline</b></TableCell>
            <TableCell key="Complete" align="center"><b>✔</b></TableCell>
            <TableCell key="Goals" align="left" sx={{ minWidth: '420px' }}><b>Goals</b></TableCell>
            <TableCell key="Links" align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name + ' ' + index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell key="1" component="th" scope="row">{row.timeline}</TableCell>
              <TableCell key="2" align="center">{row.complete}</TableCell>
              <TableCell key="3" align="left">{row.goal}</TableCell>
              <TableCell key="4" align="center">
                { row.link && row.link.includes('https') ? <Button size="small" href={row.link} target="_blank">Link</Button> : row.link }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}