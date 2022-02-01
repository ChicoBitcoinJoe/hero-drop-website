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

export default function Timeline({ Links }) {

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
      Links.CommunityDAO   
    ),  
    createData(
      "", 
      "✓",
      "Create the Hero Drop Community DAO (Free on the Rinkeby Network)",
      Links.Discord 
    ),  
    createData(
      "", 
      "", 
      "Create the Hero Drop Asset DAO (costs real money on the Polygon Network)"
    ),
    createData(
      "February", 
      "", 
      "Grow the Discord and both DAOs"
    ),
    createData(
      "", 
      "", 
      "Incentivize Playtesters and Content Creators"
    ),
    createData(
      "June", 
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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow key={'Headers'}>
            <TableCell key="Timeline"><b>Timeline</b></TableCell>
            <TableCell key="Complete" align="center"><b>✔</b></TableCell>
            <TableCell key="Goals" align="left"><b>Goals</b></TableCell>
            <TableCell key="Links" align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name + ' ' + index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell key="1" component="th" scope="row">{row.timeline}</TableCell>
              <TableCell key="3" align="center">{row.complete}</TableCell>
              <TableCell key="4" align="left">{row.goal}</TableCell>
              <TableCell key="5">
                { row.link ? <Button href={row.link} target="_blank">Link</Button> : null }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}