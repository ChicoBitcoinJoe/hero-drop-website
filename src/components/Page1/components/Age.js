import * as React from 'react'

import BorderedContainer from '../../../components/BorderedContainer'
import Clickable from '../../../components/Clickable'
import Score from './Score'

export default function Age({ character, onClick }) {
  // const { form, age, specializations } = character

  return (
    <BorderedContainer label="Age">
      <Clickable onClick={onClick} sx={{ p: 1 }}>
        <Score label="Current / Maximum" endLabel={'years'} />
        <Score label="Category" endLabel={character.form.maxAge && character.age.category} />
        <Score label="Penalty" endLabel={character.form.maxAge && character.form.agePenalty} />
      </Clickable>
    </BorderedContainer>
  )
}