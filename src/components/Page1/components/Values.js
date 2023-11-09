import * as React from 'react'

import Score from '../../Score'

export default function Values({ character }) {
  return <>
    {
      Array(character.totalValues).fill(null).map((_, i) => i+1).map((index) => {
        const key = 'value' + index
        const label = character[key]
        const score = character[key+'Score']
        return <React.Fragment key={key}>
          <Score label={label} endLabel={score} />
        </React.Fragment>
      })
    }
  </>
}