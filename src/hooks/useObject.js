import React from "react"

export function useObject(initialObject) {
  const [ state, setState ] = React.useState(initialObject)
  const updateState = (id, value) => {
    setState({
      ...state,
      [id]: value
    })
  }

  const updateDeepState = (id, id2, value) => {
    setState({
      ...state,
      [id]: {
        ...state[id],
        [id2]: value,
      }
    })
  }
  
  return {
    state,
    updateState,
    updateDeepState,
    setState,
  }
}