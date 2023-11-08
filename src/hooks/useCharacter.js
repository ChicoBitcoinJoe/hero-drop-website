import * as React from 'react'

export function rollDice(min, max) {
  if(!max) {
    max = min
    min = 1
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}

function getAbilityModifier(score) {
  let mod = score - 10
  return mod >= 0 ? Math.floor(mod / 2) : Math.round(mod / 2)
}

function getClassFromLevel(level) {
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

function getClassScoreFromLevel(level) {
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

function getAgeCategoryFromScore(score) {
  if(score === 0) return 'Adolescant'
  else if(score === 1) return 'Young Adult'
  else if(score === 2) return 'Adult'
  else if(score === 3) return 'Aging Adult'
  else if(score === 4) return 'Elder'
  else if(score === 5) return 'Ancient'
}

function getCurrentAge(proficiencies) {
  let age = 0
  proficiencies.map((sp) => {
    age += Number(sp.training.years)
  })
  
  return age
}

function getAgeScore(proficiencies, maxAge) {
  const age = getCurrentAge(proficiencies)
  if(age <= maxAge * 0.15) return 0
  else if(age <= maxAge * 0.35) return 1
  else if(age <= maxAge * 0.55) return 2
  else if(age <= maxAge * 0.7) return 3
  else if(age <= maxAge * 0.85) return 4
  else if(age <= maxAge) return 5
  else return 6
}

function getCurrentNaturals(proficiencies) {
  let naturals = 0
  proficiencies.map((sp) => {
    naturals += sp.natural && 1
  })
  // console.log({ proficiencies, naturals })
  return naturals
}

function getMaxNaturals(level) {
  return 1 + getClassScoreFromLevel(level)
}

function convertScoreToDamageDie(score) {
  if(score >= 6) return (score-5)+'d12'
  else if(score === 5) return '1d10'
  else if(score === 4) return '1d8'
  else if(score === 3) return '1d6'
  else if(score === 2) return '1d4'
  else if(score === 1) return '1d2'
  else return ''
}

function getAbility(ability, data) {
  const { proficiencies, abilityScoreChanges } = data

  function getAgePenalty() {
    return 0
  }
  
  let scoreFromProficiencies = 0
  proficiencies.forEach(sp => {
    if(sp.abilities[ability] === '') return
    scoreFromProficiencies += Math.floor(Number(sp.score) / (sp.abilities[ability] === 'half' ? 2 : 1))
  })
  
  let score = 8 + scoreFromProficiencies 
    + Number(abilityScoreChanges[ability]) 
    + (ability === "dexterity" ? getAgePenalty() : 0)
    + (ability === "strength" ? getAgePenalty() : 0)
    + (ability === "constitution" ? getAgePenalty() : 0)
  
  const modifier = getAbilityModifier(score)
  const die = convertScoreToDamageDie(modifier)

  return {
    score,
    modifier,
    die,
  }
}

function getAbilities(data) {
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
      current: getCurrentNaturals(data.proficiencies)
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
  if(data.proficiencies.length === 0) return 0

  return getAbility('dexterity', data).modifier + Number(data.initiativeBonus)
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
    proficiencies: Array(11).fill({
      name: '',
      score: '',
      expert: false,
      abilities: {
        dexterity: '',
        strength: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: '',
      },
    }),
    coreValues: [],
    miracles: [],
    abilityScoreChanges: {
      dexterity: '',
      strength: '',
      constitution: '',
      intelligence: '',
      wisdom: '',
      charisma: '',
    },
    inspiration: '',
    initiativeBonus: '',
    hitDice: '',
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
    proficiencyBonus: 2 + getClassScoreFromLevel(data.level),
    class: getClassObject(data),
    ...getAbilities(data),
    form: getFormObject(data),
    initiative: getInitiative(data)
  }
}