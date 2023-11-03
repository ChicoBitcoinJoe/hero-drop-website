import * as React from 'react'
import useIpfs from './useIpfs'

export function rollDice(min, max) {
  if(!max) {
    max = min
    min = 1
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}

export const utils = {
  rollDice,
  getSpecializationScore,
  traits: [
    'Agility',
    'Alertness',
    'Charisma',
    'Constitution',
    'Insight',
    'Lethal',
    'Luck',
    'Movement Speed',
    'Spellcasting',
    'Strength',
    'Wealth',
  ],
  schools: [
    'Abjuration',
    'Conjuration',
    'Divination',
    'Enchantment',
    'Evocation',
    'Illusion',
    'Necromancy',
    'Transmutation',
  ],
  damageTypes: [
    'Slashing',
    'Bludgeoning',
    'Piercing',
    'Fire',
    'Cold',
    'Lightning',
    'Thunder',
    'Poison',
    'Acid',
    'Psychic',
    'Radiant',
    'Necrotic',
    'Force'
  ],
}

const template = {
  details: {
    playerName: '',
    characterName: '',
    class: '',
    description: '',
  },
  sentience: {
    name: '',
    score: 0,
    weight: 0,
    years: 0,
    bonusYears: 0,
    traits: {
    //  traitName: 'half' || 'full'
    },
  },
  age: {
    current: 0,
    max: 0,
    maxBeautyScore: 0,
    peakBeauty: 0,
  },
  specializations: [
    //{
    //  name: '',
    //  years: 0,
    //  bonusYears: 0,
    //  isNatural: false,
    //  traits: {
    //    traitName: 'half' || 'full'
    //  },
    //}
  ],
  coreValues: [
    // {
    //   text: '',
    //   conviction: 0    // A value between 0 and 100
    // }
  ],
  miracles: [
    // {
    //   title: ''
    //   text: '',
    // }
  ],
  version: 'HeroDrop-v0.0.1',
}

export function getSpecializationScore(years, isNatural) {
  let score = 0
  if(years >= 1024) score = 10
  else if(years >= 512) score = 9
  else if(years >= 256) score = 8
  else if(years >= 128) score = 7
  else if(years >= 64) score = 6
  else if(years >= 32) score = 5
  else if(years >= 16) score = 4
  else if(years >= 8) score = 3
  else if(years >= 4) score = 2
  else if(years >= 2) score = 1
  else if(years >= 1) score = 0
  if(isNatural) return score + 1
  return score
}

export function useCharacter2(path) {
  const { ipfsReady, loadJSON } = useIpfs()
  const [ data, setData ] = React.useState()

  React.useState(() => {
    loadCharacter()
  }, [ipfsReady])

  async function loadCharacter() {
    if(!ipfsReady) return

    if(path) {
      const character = await loadJSON(path)
      setData(character)
      console.log('Loaded character', character)
    }
    else {
      console.log('No roster saved')
      setData(template)
    }
  }

  function update(id, value) {
    let newData = {}
    newData[id] = value
    setData(oldData => {return {...oldData, ...newData}})
  }

  function getDetails() {
    return {
      ...data.sentience,
      set: (id, value) => {
        if(['playerName', 'characterName', 'class', 'description'].indexOf(id) === -1) return

        update('details', { 
          ...data.sentience, 
          [id]: value
        })
      }
    }
  }

  function getSentience() {
    return {
      ...data.sentience,
      set: (id, value) => {
        if(['name', 'score', 'weight', 'years', 'bonusYears', 'traits'].indexOf(id) === -1) return

        update('sentience', { 
          ...data.sentience, 
          [id]: value
        })
      }
    }
  }
  
  function getAge() {
    return {
      ...data.sentience,
      set: (id, value) => {
        if(['current', 'max', 'maxBeautyScore', 'peakBeauty'].indexOf(id) === -1) return
        update('age', { 
          ...data.age, 
          [id]: value
        })
      }
    }
  }

  function getSpecializations() {

    // for each speciliazation return a rich object specialization

    return {
      list: data.specializations,
      add: (value) => {
        update('specialization', [...data.specialization, value])
      },
      update: (index, value) => {
        const newList = [...data.specialization]
        newList[index] = value
        update('specialization', newList)
      },
      remove: (index) => {
        let newList = [...data.specialization]
        newList.slice(index,1)
        update('specialization', newList)
      }
    }
  }

  function get(id) {
    return {
      list: data[id],
      add: (value) => {
        update('id', [...data[id], value])
      },
      update: (index, value) => {
        const newList = [...data[id]]
        newList[index] = value
        update('id', newList)
      },
      remove: (index) => {
        let newList = [...data[id]]
        newList.slice(index,1)
        update('id', newList)
      }
    }
  }

  return {
    data,
    getDetails,
    getSentience,
    getAge,
    getSpecializations,
    getCoreValues: () => get('coreValues'),
    getMiracles: () => get('miracles'),
    set: {
      playerName: (value) => update('playerName', value),
      name: (value) => update('name', value),
      class: (value) => update('class', value),
    }
  }
}

export function getClassFromLevel(level) {
  if(!level) return ''
  level = Number(level)
  let className = null
  if(level === 0) className = 'Common'
  else if(level === 1) className = 'Uncommon'
  else if(level >= 2 && level <= 3) className = 'Rare'
  else if(level >= 4 && level <= 7) className = 'Hero'
  else if(level >= 8 && level <= 15) className = 'Legend'
  else if(level >= 16 && level <= 31) className = 'God'
  else if(level >= 32) className = 'Primordial'
  // console.log(level, className)
  return className
}

export function getClassScoreFromLevel(level) {
  if(!level) return ''
  level = Number(level)
  let classScore = null
  if(level <= 0) classScore = 0
  else if(level === 1) classScore = 0
  else if(level >= 2 && level <= 3) classScore = 1
  else if(level >= 4 && level <= 7) classScore = 2
  else if(level >= 8 && level <= 15) classScore = 3
  else if(level >= 16 && level <= 31) classScore = 4
  else if(level >= 32) classScore = 5
  return classScore
}

function getSizeScoreFromWeight(weight) {
  if(weight >= Math.round(Math.pow(8,7.5))) return 8
  else if(weight >= 131073) return 9
  else if(weight >= 32769) return 8
  else if(weight >= 8193) return 7
  else if(weight >= 2049) return 6
  else if(weight >= 513) return 5
  else if(weight >= 129) return 4
  else if(weight >= 33) return 3
  else if(weight >= 9) return 2
  else if(weight >= 3) return 1
  else /* if(weight >= 0) */ return 0
}

export function getSizeFromWeight(weight) {
  const sizeScore = getSizeScoreFromWeight(weight)
  if(sizeScore === 9) return 'Titan'
  else if(sizeScore === 8) return 'Gargantuan'
  else if(sizeScore === 7) return 'Giant'
  else if(sizeScore === 6) return 'Huge'
  else if(sizeScore === 5) return 'Large'
  else if(sizeScore === 4) return 'Medium'
  else if(sizeScore === 3) return 'Small'
  else if(sizeScore === 2) return 'Tiny'
  else if(sizeScore === 1) return 'Mini'
  else if(sizeScore === 0) return 'Toy'
  else return ''
}

export function getAgeCategoryFromScore(score) {
  if(score === 0) return 'Adolescant'
  else if(score === 1) return 'Young Adult'
  else if(score === 2) return 'Adult'
  else if(score === 3) return 'Aging Adult'
  else if(score === 4) return 'Elder'
  else if(score === 5) return 'Ancient'
}

export function getCurrentAge(specializations) {
  let age = 0
  specializations.map((sp) => {
    age += Number(sp.training.years)
  })
  
  return age
}

export function getAgeScore(specializations, maxAge) {
  const age = getCurrentAge(specializations)
  if(age <= maxAge * 0.15) return 0
  else if(age <= maxAge * 0.35) return 1
  else if(age <= maxAge * 0.55) return 2
  else if(age <= maxAge * 0.7) return 3
  else if(age <= maxAge * 0.85) return 4
  else if(age <= maxAge) return 5
  else return 6
}

export function getCurrentNaturals(specializations) {
  let naturals = 0
  specializations.map((sp) => {
    naturals += sp.natural && 1
  })
  // console.log({ specializations, naturals })
  return naturals
}

export function getMaxNaturals(level) {
  return 1 + getClassScoreFromLevel(level)
}

export function convertScoreToDamageDie(score) {
  if(score >= 6) return (score-5)+'d12'
  else if(score === 5) return '1d10'
  else if(score === 4) return '1d8'
  else if(score === 3) return '1d6'
  else if(score === 2) return '1d4'
  else if(score === 1) return '1d2'
  else return ''
}

function getAbilitiesObject(data) {

  function getAbility(ability, character) {
    const { specializations, abilityScoreChanges } = character
  
    function getAgePenalty() {
      return 0
    }
    
    let years = 0
    specializations.map((sp) => {
      if(sp.traits[ability] === 'full') {
        years += Number(sp.training.years) + Number(sp.training.bonus)
      }
      else if(sp.traits[ability] === 'half') {
        years += Math.round((Number(sp.training.years) + Number(sp.training.bonus)) / 2)
      }
    })
    let score = 8 + getSpecializationScore(years) 
      + Number(abilityScoreChanges[ability]) 
      + (ability === "strength" ? getAgePenalty() : 0)
      + (ability === "dexterity" ? getAgePenalty() : 0)
    
    return {
      score: score,
      modifier: getSpecializationScore(score)
    }
  }

  return {
    constitution: getAbility('constitution', data),
    dexterity: getAbility('dexterity', data),
    strength: getAbility('strength', data),
    intelligence: getAbility('intelligence', data),
    wisdom: getAbility('wisdom', data),
    charisma: getAbility('charisma', data),
    wealth: getAbility('wealth', data),
  }
}

function getClassObject(data) {
  return {
    category: getClassFromLevel(data.level),
    score: getClassScoreFromLevel(data.level),
    expertises: {
      max: getMaxNaturals(data.level),
      current: getCurrentNaturals(data.specializations)
    },
  }
}

function getAgePenalty(age, maxAge) {
  return 0
}

function getFormObject(data) {
  return {
    ...data.form,
    size: getSizeFromWeight(data.form.weight),
    damageReduction: getSizeScoreFromWeight(data.form.weight),
    sizeDie: convertScoreToDamageDie(getSizeScoreFromWeight(data.form.weight)),
    agePenalty: getAgePenalty(data),
  }
}

function getInitiative(data) {
  if(data.specializations.length === 0) return ''

  return getAbilitiesObject(data).dexterity.mod
}

export default function useCharacter(rawData) {
  const [ data, setData ] = React.useState({ 
    playerName: '',
    name: '',
    title: '',
    level: '',
    form: {
      name: '',
      weight: '',
      maxAge: '',
      speed: '',      
    },
    specializations: [],
    coreValues: [],
    miracles: [],
    abilityScoreChanges: {
      dexterity: '',
      strength: '',
      constitution: '',
      intelligence: '',
      wisdom: '',
      charisma: '',
      wealth: '',
    },
    inspiration: '',
    version: 1,
    ...(rawData || {})
  })

  function update(id, value) {
    setData(oldData => { 
      return {
        ...oldData, 
        [id]: value
      } 
    })
  }

  function updateMany(array) {
    const newData = { ...data }
    array.map((change) => {
      const [ id, value ] = change
      newData[id] = value
    })
    setData(newData)
  }

  return {
    raw: data,
    ...data,
    update,
    updateMany,
    
    class: getClassObject(data),
    abilities: getAbilitiesObject(data),
    form: getFormObject(data),
    initiative: getInitiative(data)
  }
}