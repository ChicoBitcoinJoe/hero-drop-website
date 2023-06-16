import * as React from 'react'

const rollDice = (min, max) => {
  if(!max) {
    max = min
    min = 1
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}

function getSpecializationScore(years, isNatural) {
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
  if(years >= 1 && isNatural) return score + 1
  return score
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
    'Move Speed',
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

export function useCharacter2(initialData) {
  const [ data, setData ] = React.useState(initialData || { 
    playerName: '',
    name: '',
    class: '',
    sentience: {
      name: '',
      score: 0,
      traits: []
    },
    weight: 0,
    currentAge: 0,
    maxAge: 0,
    maxBeautyScore: 0,
    maxBeautyAgeScore: 0,
    specializations: [],
    coreValues: [],
    miracles: [],
    version: 'HD_v0.0.1',
  })

  function update(id, value) {
    let newData = {}
    newData[id] = value
    setData(oldData => {return {...oldData, ...newData}})
  }
  
  function onChange(event) {
    const { id, name, value} = event.target
    update(id || name, value)
  }

  return {
    ...data,
    data,
    setData,
    update,
    onChange,
  }
}

export default function useCharacter(initialData) {
  const [ data, setData ] = React.useState(initialData || { 
    playerName: '',
    characterName: '',
    characterClass: '',
    sentienceName: '',
    sentienceWeight: 0,
    sentienceCurrentAge: 0,
    sentienceMaxAge: 0,
    sentienceScore: 0,
    sentienceBeautyScore: 0,
    sentiencePeakBeauty: 0,
    sentienceTraits: {},
    totalSpecializations: 0,
    traits: {},
    totalCoreValues: 0,
    totalMiracles: 0,
    version: 'HD_v0.0.1',
  })

  function update(id, value) {
    let newData = {}
    newData[id] = value
    setData(oldData => {return {...oldData, ...newData}})
  }
  
  function onChange(event) {
    const { id, name, value} = event.target
    update(id || name, value)
  }

  function getClassScore() {
    if(data.characterClass === 'Common') return 0
    else if(data.characterClass === 'Uncommon') return 0
    else if(data.characterClass === 'Rare') return 1
    else if(data.characterClass === 'Hero') return 2
    else if(data.characterClass === 'Legend') return 3
    else if(data.characterClass === 'God') return 4
    else if(data.characterClass === 'Primordial') return 5
    else return 0
  }

  function getSpecializationScore(key) {
    const years = Number(data[key].specializationYears)
    const bonusYears = Number(data[key].specializationBonusYears)
    const isNatural = data[key].isNatural
    return utils.getSpecializationScore(years + bonusYears, isNatural)
  }

  function getAge() {
    let age = 0
    for(let index = 1; index <= data.totalSpecializations; index++) {
      const specialization = data['specialization'+index]
      age += Number(specialization.specializationYears)
    }
    return age
  }

  function getMaxAge(category) {
    const max = data.sentienceMaxAge
    if(!category) return max

    if(category === 'Adolescant') return Math.round(max * .2)
    else if(category === 'Young Adult') return Math.round(max * .35)
    else if(category === 'Adult') return Math.round(max * .55)
    else if(category === 'Aging Adult') return Math.round(max * .75)
    else if(category === 'Elder') return Math.round(max * .95)
    else if(category === 'Ancient') return Math.round(max * 1.25)

    return null
  }

  function getAgeScore() {
    const max = data.sentienceMaxAge
    if(!max) return null
    
    const age = getAge()
    if(age <= getMaxAge('Adolescant')) return 0
    else if(age <= getMaxAge('Young Adult')) return 1
    else if(age <= getMaxAge('Adult')) return 2
    else if(age <= getMaxAge('Aging Adult')) return 3
    else if(age <= getMaxAge('Elder')) return 4
    else if(age <= getMaxAge('Ancient')) return 5
    else return 6
  }

  function addSpecialization(newSpecialization) {
    const totalSpecializations = data.totalSpecializations+1
    update('totalSpecializations', totalSpecializations)
    update("specialization"+totalSpecializations, newSpecialization)
  }

  function deleteSpecialization(key) {
    const lastSpecializations = 'specialization' + data.totalSpecializations
    update(key, data[lastSpecializations])
    update(lastSpecializations, null)
    update('totalSpecializations', data.totalSpecializations - 1)
  }
  
  function getTotalNaturalSpecializations() {
    let total = 0
    
    for(let index = 1; index <= data.totalSpecializations; index++) {
      const specialization = data['specialization' + index]
      if(specialization.isNatural) 
        total++
    }

    return total
  }

  function swapSentienceAndBeauty() {
    const sentience = data.sentienceScore
    const beauty = data.sentienceBeautyScore
    update('sentienceScore', beauty)
    update('sentienceBeautyScore', sentience)
  }
  
  function swapBeautyAndPeak() {
    const peak = data.sentiencePeakBeauty
    const beauty = data.sentienceBeautyScore
    update('sentiencePeakBeauty', beauty-2)
    update('sentienceBeautyScore', peak+2)
  }

  function getSpecialization(key) {
    return data[key]
  }

  function getTraitScore(id) {
    const sentienceTraitType = data['sentienceTraits'][id]
    const fullTrait = sentienceTraitType === 'full' && data.sentienceScore
    const halfTrait = sentienceTraitType === 'half' && Math.round(data.sentienceScore / 2)
    let score = Number(fullTrait || halfTrait || '0')
    for(let index = 1; index <= data.totalSpecializations; index++) {
      const key = 'specialization'+index
      const specialization = data[key]
      const specializationScore = getSpecializationScore(key)
      const traitType = specialization.traits[id]
      if(traitType) {
        const fullTrait = traitType === 'full' && specializationScore
        const halfTrait = traitType === 'half' && Math.round(specializationScore / 2)
        score += Number(fullTrait || halfTrait)
      }
    }

    if(utils.damageTypes.indexOf(id) >= 0) {
      if(id !== 'Psychic') score += getSizeScore()
      else if(id === 'Psychic') {
        score += getTraitScore('Insight')
      }
    }

    return score
  }

  function getMaxHealth() {
    const base = Math.round(Math.sqrt(data.sentienceWeight))
    const con = getTraitScore('Constitution') * getSizeScore()
    const score = getClassScore()
    const charClass = Math.pow(2, score)
    return (base + con) * charClass
  }
  
  function getRecovery() {
    return Math.round(getMaxHealth() / 7)
  }
  
  function getSizeScore() {
    if(data.sentienceWeight >= Math.round(Math.pow(8,7.5))) return 8
    else if(data.sentienceWeight >= Math.round(Math.pow(8,6.5))) return 7
    else if(data.sentienceWeight >= Math.round(Math.pow(8,5.5))) return 6
    else if(data.sentienceWeight >= Math.round(Math.pow(8,4.5))) return 5
    else if(data.sentienceWeight >= Math.round(Math.pow(8,3.5))) return 4
    else if(data.sentienceWeight >= Math.round(Math.pow(8,2.5))) return 3
    else if(data.sentienceWeight >= Math.round(Math.pow(8,1.5))) return 2
    else if(data.sentienceWeight >= Math.round(Math.pow(8,0.5))) return 1
    else if(data.sentienceWeight !== 0) return 0
    return null
  }

  function getSize() {
    const sizeScore = getSizeScore()
    if(sizeScore === 8) return 'Titan'
    else if(sizeScore === 7) return 'Gargantuan'
    else if(sizeScore === 6) return 'Giant'
    else if(sizeScore === 5) return 'Huge'
    else if(sizeScore === 4) return 'Large'
    else if(sizeScore === 3) return 'Medium'
    else if(sizeScore === 2) return 'Small'
    else if(sizeScore === 1) return 'Tiny'
    else if(sizeScore === 0) return 'Minute'
    else return null
  }

  function getSpeed() {
    return 20 + getTraitScore('Move Speed') * 5
  }

  function getMaxStamina() {
    return (getTraitScore('Strength') + getTraitScore('Move Speed') + getClassScore()) * 10
  }

  function getMaxEgo() {
    return (getTraitScore('Charisma') + getClassScore()) * 10
  }

  // function getMaxInspiration() {
  //   return getTraitScore('Intelligence') * 10 + data.totalSpecializations * 5
  // }

  function getMaxMana() {
    let base = getClassScore()
    utils.schools.forEach((school) => {
      base += getTraitScore(school)
    })
    return base * 10
  }

  function getCarryCapacity() {
    return Math.round(data.sentienceWeight * (.1 + .1*getTraitScore('Strength')))
  }

  function getDodge() {
    let dodgeModifier = null
    let sizeScore = getSizeScore()
    // console.log(sizeScore)
    if(sizeScore === '0') dodgeModifier = 3
    else if(sizeScore === 1) dodgeModifier = 2
    else if(sizeScore === 2) dodgeModifier = 1
    else if(sizeScore === 3) dodgeModifier = 0
    else if(sizeScore === 4) dodgeModifier = -1
    else if(sizeScore === 5) dodgeModifier = -2
    else if(sizeScore === 6) dodgeModifier = -3
    else if(sizeScore === 7) dodgeModifier = -4
    else if(sizeScore === 8) dodgeModifier = -5
    // console.log(dodgeModifier)
    return 100 - (dodgeModifier + getTraitScore('Agility')) * 10
  }

  function convertScoreToDamageDie(score) {
    if(score >= 6) return (score-5)+'d12'
    else if(score === 5) return '1d10'
    else if(score === 4) return '1d8'
    else if(score === 3) return '1d6'
    else if(score === 2) return '1d4'
    else if(score === 1) return '1d2'
    else if(score === 0) return '1d1'

    return null
  }

  function getSizeDie() {
    return convertScoreToDamageDie(getSizeScore())
  }
  
  function getLethalDie() {
    return convertScoreToDamageDie(getTraitScore('Lethal'))
  }

  function getAgeCategory() {
    const ageScore = getAgeScore()
    if(ageScore === 0) return 'Adolescent'
    else if(ageScore === 1) return 'Young Adult'
    else if(ageScore === 2) return 'Adult'
    else if(ageScore === 3) return 'Aging Adult'
    else if(ageScore === 4) return 'Elder'
    else if(ageScore === 5) return 'Ancient'
    else if(ageScore === 6) return 'Immortal'
    return null
  }

  return {
    ...data,
    data,
    setData,
    update,
    onChange,
    getAge,
    getClassScore,
    getDodge,
    addSpecialization,
    deleteSpecialization,
    getSpecialization,
    getSpecializationScore,
    getTotalNaturalSpecializations,
    getTraitScore,
    getAgeScore,
    swapSentienceAndBeauty,
    swapBeautyAndPeak,
    getMaxHealth,
    getRecovery,
    getSize,
    getSpeed,
    getSizeScore,
    getMaxStamina,
    getMaxEgo,
    // getMaxInspiration,
    getMaxMana,
    getCarryCapacity,
    getSizeDie,
    getLethalDie,
    getAgeCategory,
    getMaxAge,
  }
}
