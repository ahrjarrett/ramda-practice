const R = require('ramda')
const pokemon = require('../data/pokemon.json')

describe('pokemon lenses:', () => {

  // OLD FUNCTIONS:
  const old_setSpecies = (species, pokemon) => {
    const newPokemon = shallowClone(pokemon)
    const newSpecies = shallowClone(pokemon.species)
    newSpecies.name = species
    newPokemon.species = newSpecies
    return newPokemon
  }

  const old_addSpeciesMetadata = (metadata, pokemon) => {
    const newPokemon = shallowClone(pokemon)
    const newSpecies = shallowClone(pokemon.species)
    newPokemon.species = newSpecies
    for(let metadataKey in metadata) {
      newPokemon.species[metadataKey] = metadata[metadataKey]
    }
    return newPokemon
  }


  const old_getSpecies = (pokemon) => {
    return pokemon.species.name
  }

  // This function is now defunct
  const old_shallowClone = (pokemon) => {
    let result = {}
    for(let someKey in pokemon) {
      result[someKey] = pokemon[someKey]
    }
  }


  // NEW FUNCTIONS:
  // Lenses ->
  const speciesLens = R.lensProp('species')
  const nameLens = R.lensProp('name')
  const speciesNameLens = R.compose(speciesLens, nameLens)

  // Functions rewritten using Lenses ->
  const setSpecies = (species, pokemon) => {
    return R.set(speciesNameLens, species, pokemon)
  }

  // R.merge here is partially applied
  const addSpeciesMetadata = (metadata, pokemon) => {
    return R.over(speciesLens, R.merge(metadata), pokemon)
  }

  const getSpecies = (pokemon) => {
    return R.view(speciesNameLens, pokemon)
  }

  // TESTS:
  it.only('getSpecies should return species name', () => {
    let result = getSpecies(pokemon)
    result.should.eql('gyarados')
  })

  // FAILING:
  it.only('setSpecies should allow us to set species name', () => {
    let result = setSpecies('magikarp', pokemon)
    result.should.eql('magikarp')
  })
})
