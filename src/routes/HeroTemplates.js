import * as React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"

import CharacterSheet from '../routes/CharacterSheet'
import Fighter from '../HeroTemplates/Fighter'

export default function HeroTemplates() {
  return <>
    <Routes>
      <Route exact path="/fighter" element={<CharacterSheet file={Fighter} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </>
}