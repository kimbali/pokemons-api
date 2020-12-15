'use strict'

const { logic } = require('./logic')
const { expect } = require('chai')

describe('logic', () => {

    describe('Create a filtered catalog', () => {

        true && it('should return an empty array without params', () => {
            const result = logic.createCatalog();
            expect(result).to.be.an('array');
            expect(result).to.have.lengthOf(0);
        })

        true && it('should throw new error if language is not found', () => {
            expect( function(){ logic.createCatalog({ page: 0, lang: 'Swahili'})})
                .throw('Invalid language');
        })

        true && it('should retrive a list of 30 pokemons', () =>
            logic.createCatalog({ page: 0, lang: 'GB'})
                .then(pokemons => {
                    expect(pokemons).to.be.an('array');
                    expect(pokemons).to.have.lengthOf(20);
                })
        )

        true && it('should retrive the first page', () =>
            logic.createCatalog({ page: 0, lang: 'GB'})
                .then(pokemons => {
                    expect(pokemons[0].id).to.equal(1);
                    expect(pokemons[pokemons.length - 1].id).to.equal(20);
                })
        )

        true && it('should the second page', () =>
            logic.createCatalog({ page: 1, lang: 'GB'})
                .then(pokemons => {
                    expect(pokemons[0].id).to.equal(21);
                    expect(pokemons[pokemons.length - 1].id).to.equal(40);
                })
        )

        true && it('Each pokemon of the list should have only id, name and type', () =>
            logic.createCatalog({ page: 0, lang: 'GB'})
                .then(pokemons => {
                    const singlePokemonProp = Object.keys(pokemons[0]);
                    const expectedProperties = [ 'id', 'name', 'type']

                    expect(singlePokemonProp).to.be.an('array');
                    expect(singlePokemonProp).to.have.lengthOf(3);
                    expect(singlePokemonProp[0]).to.equal(expectedProperties[0]);
                    expect(singlePokemonProp[1]).to.equal(expectedProperties[1]);
                    expect(singlePokemonProp[2]).to.equal(expectedProperties[2]);
                })
        )

        true && it('should retrive a pokemons list with english language', () =>
            logic.createCatalog({ page: 0, lang: 'GB'})
                .then(pokemons => {
                    expect(pokemons[0].name).to.equal('Bulbasaur')
                })
        )

        true && it('should retrive a pokemons list with french language', () =>
            logic.createCatalog({ page: 0, lang: 'FR'})
                .then(pokemons => {
                    expect(pokemons[0].name).to.equal('Bulbizarre')
                })
        )

        true && it('should retrive a pokemons list with chinese language', () =>
            logic.createCatalog({ page: 0, lang: 'CN'})
                .then(pokemons => {
                    expect(pokemons[0].name).to.equal('妙蛙种子')
                })
        )

        true && it('should retrive a pokemons list with japanese language', () =>
            logic.createCatalog({ page: 0, lang: 'JP'})
                .then(pokemons => {
                    expect(pokemons[0].name).to.equal('フシギダネ')
                })
        )
    })
})