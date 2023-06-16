import { create } from 'ipfs-core'
import { useEffect, useState } from 'react'

import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import all from 'it-all'

let ipfs = null

export default function useIpfs() {  
  const [ isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
  const [ ipfsInitError, setIpfsInitError] = useState(null)

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs()
    return function cleanup () {
      if (ipfs && ipfs.stop) {
        console.log('Stopping IPFS')
        ipfs.stop().catch(err => console.error(err))
        ipfs = null
        setIpfsReady(false)
      }
    }
  }, [])

  async function startIpfs () {
    if (ipfs) {
      console.log('IPFS already started')
    } else if (window.ipfs && window.ipfs.enable) {
      console.log('Found window.ipfs')
      ipfs = await window.ipfs.enable({ commands: ['id'] })
    } else {
      try {
        console.time('IPFS Started')
        ipfs = await create()
        console.timeEnd('IPFS Started')
      } catch (error) {
        console.error('IPFS init error:', error)
        ipfs = null
        setIpfsInitError(error)
      }
    }

    setIpfsReady(Boolean(ipfs))
  }

  async function saveJSON(data) {
    return saveString(JSON.stringify(data))
  }
  
  async function loadJSON(path) {
    return JSON.parse(await loadString(path))
  }
  
  async function saveString(data) {
    if(!isIpfsReady) return
    const id = await ipfs.add(data)
    return id.path
  }

  async function loadString(path) {
    if(!isIpfsReady) return
    
    const promises = ipfs.cat(path)
    const resolved = await all(promises)
    const uint8Array = uint8ArrayConcat(resolved)
    return String.fromCharCode.apply(null, uint8Array)
  }

  return {
    ipfs,
    ipfsReady: isIpfsReady,
    ipfsInitError,
    saveJSON,
    loadJSON,
    saveString,
    loadString,
  }
}