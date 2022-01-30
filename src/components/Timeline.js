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

const rows = [
  createData(
    'January',
    "✓", 
    "Launch the Community Discord",
    "https://discord.com/channels/927340117637603370/927340117637603373"    
  ),
  createData(
    '', 
    "✓",  
    'Launch Website',
  ),
  createData(
    "", 
    "", 
    "Launch Hero Drop Community DAO"
  ),
  createData(
    "February", 
    "", 
    "Grow the Discord and Community DAO"
  ),
  createData(
    "", 
    "", 
    "Incentivize Playtesters"
  ),
  createData(
    "Members > 50", 
    "", 
    "Launch Hero Drop Asset DAO"
  ),
  createData(
    "", 
    "", 
    "Incentivize Content Creators"
  ),
  createData(
    "", 
    "", 
    "Define Partner Fee"
  ),
  createData(
    "", 
    "", 
    "Find Partners"
  ),
];

export default function Timeline() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow key={'Headers'}>
            <TableCell sx={{ width: '140px' }} key="Timeline"><b>Timeline</b></TableCell>
            <TableCell sx={{ width: '80px' }} key="Complete" align="center"><b>✔</b></TableCell>
            <TableCell key="Goals" align="left"><b>Goals</b></TableCell>
            <TableCell sx={{ width: '60px' }} key="Links" align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name + ' ' + index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell key="1" component="th" scope="row">{row.timeline}</TableCell>
              <TableCell key="2" align="center">{row.complete}</TableCell>
              <TableCell key="3" align="left">{row.goal}</TableCell>
              <TableCell key="4">
                { row.link ? <Button href={row.link} target="_blank">Link</Button> : null }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}