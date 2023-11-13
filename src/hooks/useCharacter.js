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

function getAgePenalty(data) {
  const score = getAgeScore(data)
  let penalty = null
  if(score === 0) penalty = -2
  else if(score === 1) penalty = 0
  else if(score === 2) penalty = -1
  else if(score === 3) penalty = -2
  else if(score === 4) penalty = -3
  else if(score === 5) penalty = -4
  penalty = penalty + getClassScoreFromLevel(data.level)
  if(penalty > 0) penalty = 0
  return penalty
}

function getAgeScore(data) {
  const { currentAge, maxAge } = data.form
  if(currentAge <= maxAge * 0.15) return 0
  else if(currentAge <= maxAge * 0.35) return 1
  else if(currentAge <= maxAge * 0.55) return 2
  else if(currentAge <= maxAge * 0.70) return 3
  else if(currentAge <= maxAge * 0.85) return 4
  else if(currentAge <= maxAge) return 5
  else return 6
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
  
  let scoreFromProficiencies = 0
  proficiencies.forEach(sp => {
    if(sp.abilities[ability] === '') return
    scoreFromProficiencies += Math.floor(Number(sp.score) / (sp.abilities[ability] === 'half' ? 2 : 1))
  })
  
  let score = 8 + scoreFromProficiencies 
    + Number(abilityScoreChanges[ability]) 
    + (ability === "dexterity" ? getAgePenalty(data) : 0)
    + (ability === "strength" ? getAgePenalty(data) : 0)
    + (ability === "constitution" ? getAgePenalty(data) : 0)
  
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
  const classScore = getClassScoreFromLevel(data.level)
  return {
    category: getClassFromLevel(data.level),
    score: classScore,
    proficiencyBonus: 2 + classScore,
  }
}

function getFormObject(data) {
  return {
    ...data.form,
    size: getSizeFromWeight(data.form.weight),
    damageReduction: getSizeScoreFromWeight(data.form.weight),
    sizeDie: convertScoreToDamageDie(getSizeScoreFromWeight(data.form.weight)),
    agePenalty: getAgePenalty(data),
    ageCategory: getAgeCategoryFromScore(getAgeScore(data))
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
      currentAge: '',
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
    feats: [],
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

  const abilities = getAbilities(data)
  const maxHitPoints = Math.round(Math.sqrt(data.form.weight))
  let recovery = Math.round(maxHitPoints / 10 + abilities.constitution.modifier)
  if(recovery < 1) recovery = 1

  return {
    raw: data,
    ...data,
    update,
    updateMany,
    
    class: getClassObject(data),
    ...abilities,
    form: getFormObject(data),
    maxHitPoints,
    recovery,
    initiative: getInitiative(data)
  }
}