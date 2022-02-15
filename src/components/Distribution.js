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

export default function Distribution() {

  const rows = [
    createData( 
      "250,000", 
      "",
      "To the creator for past work and to use as a benevolent dictator until the community takes over.", 
    ),
    createData( 
      "400,000", 
      "",  
      "To community members who give tribute to the DAO in exchange for voting shares",
    ),
    createData( 
      "", 
      "150,000",  
      "To playtesters and content creators that donate their time to improving Hero Drop before leaving beta",
    ),
  ];

  return <>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow key="Headers">
            <TableCell key="1"><b>Shares</b></TableCell>
            <TableCell key="2"><b>Loot</b></TableCell>
            <TableCell key="3"><b>Distribution</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name + ' ' + index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell key="1">{row.left}</TableCell>
              <TableCell key="2">{row.middle}</TableCell>
              <TableCell key="3">{row.right}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}