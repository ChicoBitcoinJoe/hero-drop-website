import * as React from 'react'

import BorderedContainer from '../../BorderedContainer'
import Clickable from '../../Clickable'
import Score from './Score'

export default function Form({ character, onClick }) {
  const { size, weight, damageReduction } = character.form
  return <>
    <BorderedContainer label={"Form" + (character.form.name && (": " + character.form.name))}>
      <Clickable sx={{ p: 1 }} onClick={onClick}>
        <Score label="Weight" endLabel={character.form.weight + ' lb'} />
        <Score label="Size" endLabel={character.form.weight && size} />
        <Score label="Size Die" endLabel={character.form.sizeDie || ''} />
        {/* <Score label="DR" endLabel={character.form.damageReduction || ''} /> */}
      </Clickable>
    </BorderedContainer>
  </>
}