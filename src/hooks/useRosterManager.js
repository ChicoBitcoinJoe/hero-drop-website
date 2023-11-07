import * as React from 'react'
import useIpfs from './useIpfs'

export default function useRosterManager(key) {
  const history = [localStorage.getItem(key)]
  const [rosterPath, setRosterPath] = React.useState(history[0])
  const { ipfsReady, saveJSON, loadJSON } = useIpfs()

  const [roster, setRoster] = React.useState()

  React.useEffect(() => {  
    async function loadRoster() {
      if(rosterPath) {
        const initialRoster = await loadJSON(rosterPath)
        setRoster(initialRoster)
        console.log('Loaded roster', initialRoster)
      }
      else {
        console.log('No roster saved')
        setRoster([])
      }
    }

    console.log({ ipfsReady })
    if(!ipfsReady) return
    loadRoster()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipfsReady])


  async function saveRoster(newRoster) {
    console.log('saving roster:', newRoster)
    const newRosterPath = await saveJSON(newRoster)
    console.log('saving roster path:', newRosterPath)
    localStorage.setItem(key, newRosterPath)
    setRosterPath(newRosterPath)
  }

  async function addMember(data) {
    const characterPath = await saveJSON(data)
    const newRoster = [...roster, characterPath]
    saveRoster(newRoster)
    setRoster(newRoster)
    return characterPath
  }

  async function loadMember(path) {
    return loadJSON(path)
  }

  async function updateMember(index, data) {
    const newPath = await saveJSON(data)
    console.log('update', index, newPath)
    const newRoster = [...roster]
    newRoster[index] = newPath
    saveRoster(newRoster)    
    setRoster(newRoster)
    return newPath
  }
  
  function removeMember(index) {
    let newRoster = [...roster]
    newRoster.splice(index, 1)
    saveRoster(newRoster)
    setRoster(newRoster)
  }

  function isMember(path) {
    return roster.indexOf(path)
  }

  return {
    ready: !!roster,
    list: roster,
    history,
    isMember,
    addMember,
    loadMember,
    updateMember,
    removeMember,
  }
}