import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(talent, combatDescription, socialDescription, explorationDescription) {
  return { talent, combatDescription, socialDescription, explorationDescription };
}

const rows = [
  createData('Athletics', 
    'Combat(Athletics) determines your skill with attacking and defending against attacks', 
    'Social(Athletics) determines your attractiveness and skill at activities such as dancing', 
    'Exploration(Athletics) determines your skill at parkour and how fast you move'
  ),
  createData('Fortitude', 
    'Combat(Fortitude) is your ability to hold concentration and resist things like poison', 
    'Social(Fortitude) is your ability to resist mind control effects', 
    'Exploration(Fortitude) is your capacity for forced marches, starvation, and dehydration'
  ),
  createData('Influence', 
    'Combat(Influence) determines your ability to intimidate others', 
    'Social(Influence) determines your skill at persuading others', 
    'Exploration(Influence) is your skill at handling animals and other creatures'
  ),
  createData('Knowledge', 
    'Combat(Knowledge) determines your knowledge in tactics as well as detecting wounds and treating them', 
    'Social(Knowledge) determines how much culture, history, and religion you have absorbed', 
    'Exploration(Knowledge) is your knowledge in magic, technology, and nature'
  ),
  createData('Perception', 
    'Combat(Perception) allows you to detect surprise attacks and increases your ranged accuracy', 
    'Social(Perception) gives insight into others motives, disguises, and lies', 
    'Exploration(Perception) is your skill at detecting dangerous environments'
  ),
  createData('Stealth', 
    'Combat(Stealth) allows you to hide your intentions in battle and make surprise attacks', 
    'Social(Stealth) determines your skill at deceiving others and using disguises', 
    'Exploration(Stealth) is your skill at hiding, traveling covertly, and lockpicking'
  ),
];

export default function ActionTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow key={'Headers'}>
            <TableCell key="Talent"><b>Talent</b></TableCell>
            <TableCell key="Combat" align="left"><b>Combat Pillar</b></TableCell>
            <TableCell key="Social" align="left"><b>Social Pillar</b></TableCell>
            <TableCell key="Exploration" align="left"><b>Exploration Pillar</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name + ' ' + index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell key="1" component="th" scope="row">{row.talent}</TableCell>
              <TableCell key="2" align="left">{row.combatDescription}</TableCell>
              <TableCell key="3" align="left">{row.socialDescription}</TableCell>
              <TableCell key="4" align="left">{row.explorationDescription}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}