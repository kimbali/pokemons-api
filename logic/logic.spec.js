'use strict'

const { logic } = require('./logic')
const { expect } = require('chai')

describe('logic', () => {

    describe('Create a filtered catalog', () => {

        it('should retrive pokemons list', () =>
            logic.createCatalog()
                .then(pokemons => {
                    expect(pokemons).to.be.an('array');
                })
        )

        it('Each pokemon of the list should have only id, name and type', () =>
            logic.createCatalog()
                .then(pokemons => {
                    const singlePokemon = Object.keys(pokemons[0]);
                    const expectedProperties = [ 'id', 'name', 'type']

                    expect(singlePokemon).to.be.an('array');
                    expect(singlePokemon).to.have.lengthOf(3);
                    expect(singlePokemon[0]).to.equal(expectedProperties[0]);
                    expect(singlePokemon[1]).to.equal(expectedProperties[1]);
                    expect(singlePokemon[2]).to.equal(expectedProperties[2]);
                })
        )
    })
})