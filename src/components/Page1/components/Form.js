import * as React from 'react'

import Divider from '@mui/material/Divider'

import BorderedContainer from '../../BorderedContainer'
import Clickable from '../../Clickable'
import Score from './Score'
import { 
  getSizeFromWeight, 
  getAgeCategoryFromScore
} from '../../../hooks/useCharacter'

export default function Form({ character, onClick }) {
  return <>
    <BorderedContainer label={"Form" + (character.form.name && (": " + character.form.name))}>
      <Clickable sx={{ p: 1 }} onClick={onClick}>
        <Score label="Style" endLabel={character.form.style && '+' + character.form.style} />
        <Score label="Peak" endLabel={getAgeCategoryFromScore(character.form.peak)} />
        <Score label="Aptitude" endLabel={character.form.aptitude && '+' + character.form.aptitude} />
        <Divider sx={{ my: .3 }} />
        <Score label="Size" endLabel={getSizeFromWeight(character.form.weight)} />
        <Score label="Weight" endLabel={character.form.weight + ' lb'} />
      </Clickable>
    </BorderedContainer>
  </>
}