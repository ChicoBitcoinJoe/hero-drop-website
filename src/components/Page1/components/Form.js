import * as React from 'react'

import Divider from '@mui/material/Divider'

import Score from './Score'
import { 
  getSizeFromWeight, 
  getAgeCategoryFromScore, 
  getClassFromLevel, 
  getClassScoreFromLevel 
} from '../../../hooks/useCharacter'

export default function Form({ character }) {
  const className = getClassFromLevel(character.level)
  const classScore = getClassScoreFromLevel(character.level)
  return <>
    <Score label="Style" endLabel={character.form.style && '+' + character.form.style} />
    <Score label="Peak" endLabel={getAgeCategoryFromScore(character.form.peak)} />
    <Score label="Aptitude" endLabel={character.form.aptitude && '+' + character.form.aptitude} />
    <Divider sx={{ my: 1.25 }} />
    <Score label="Size" endLabel={getSizeFromWeight(character.form.weight)} />
    <Score label="Weight" endLabel={character.form.weight + ' lb'} />
    <Divider sx={{ my: 1.25 }} />
    <Score label="Class" endLabel={character.level && (className + ' (' + (classScore>=1 ? '+' : '') + classScore + ')')} />
  </>
}