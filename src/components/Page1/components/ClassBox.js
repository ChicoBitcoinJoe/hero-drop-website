import * as React from 'react'

import BorderedContainer, { Label } from '../../BorderedContainer'
import Clickable from '../../Clickable'
import Score from './Score'

export default function ClassBox({ character, onClick }) {
  const { category, score, expertises } = character.class
  return (
    <BorderedContainer label="Class">
      <Clickable onClick={onClick} sx={{ p: 1 }}>
        <Score label="Category" endLabel={ category || ''} />
        <Score label="Score" endLabel={score || ''} />
        <Score label="Natural Specializations" endLabel={character.level !== '' ? expertises.current + " / " + expertises.max : ''} />
      </Clickable>
    </BorderedContainer>
  )
}