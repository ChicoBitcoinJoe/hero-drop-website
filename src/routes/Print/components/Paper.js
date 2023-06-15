import * as React from 'react'

export default function Paper({ size, margin, styles, children, landscape }) {

  const A4 = {
    width: '210mm',
    minWidth: '210mm',
    maxWidth: '210mm',
    height: '297mm',
    minHeight: '297mm',
    maxHeight: '297mm',
    overflow: 'hidden',
  }

  const Letter = landscape ?
  {
    height: '216mm',
    minHeight: '216mm',
    maxHeight: '216mm',
    width: '279mm',
    minWidth: '279mm',
    maxWidth: '279mm',
    overflow: 'hidden',
  }
  : {
    width: '216mm',
    minWidth: '216mm',
    maxWidth: '216mm',
    height: '279mm',
    minHeight: '279mm',
    maxHeight: '279mm',
    overflow: 'hidden',
  }

  const paper = size === 'A4' ? A4 : size === 'Letter' ? Letter : {}
  
  const defaultStyles = { 
    backgroundColor: 'white', 
    padding: margin ? margin : '0.5in'
  }
  
  return (
    <div style={{ ...defaultStyles, ...paper, ...styles }}>
      {children}
    </div>
  )
}