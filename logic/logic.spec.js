'use strict'

const { logic } = require('./logic')
const { expect } = require('chai')

describe('logic', () => {
    const filteredSinglePokemon = {
        "id": 1,
        "name": "Bulbasaur",
        "type": [
          "Grass",
          "Poison"
        ]
      };

    const completeSinglePokemon = {
        "id": 1,
        "name": {
          "english": "Bulbasaur",
          "japanese": "フシギダネ",
          "chinese": "妙蛙种子",
          "french": "Bulbizarre"
        },
        "type": [
          "Grass",
          "Poison"
        ],
        "base": {
          "HP": 45,
          "Attack": 49,
          "Defense": 49,
          "Sp. Attack": 65,
          "Sp. Defense": 65,
          "Speed": 45
        }
      };

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
                    expect(pokemons).to.have.lengthOf(30);
                })
        )

        true && it('should retrive the first page', () =>
            logic.createCatalog({ page: 0, lang: 'GB'})
                .then(pokemons => {
                    expect(pokemons[0].id).to.equal(1);
                    expect(pokemons[pokemons.length - 1].id).to.equal(30);
                })
        )

        true && it('should the second page', () =>
            logic.createCatalog({ page: 1, lang: 'GB'})
                .then(pokemons => {
                    expect(pokemons[0].id).to.equal(31);
                    expect(pokemons[pokemons.length - 1].id).to.equal(60);
                })
        )

        true && it('Each pokemon of the list should have only id, name and type', () =>
            logic.createCatalog({ page: 0, lang: 'GB'})
                .then(pokemons => {
                    const singlePokemon = pokemons[0];
                    expect(singlePokemon).to.not.have.property('base');
                    expect(singlePokemon).to.deep.equal(filteredSinglePokemon);
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
    
    describe('Retrieve a single pokemon', () => {

        true && it('should retrieve a complete single pokemon', ()  => 
            logic.retrievePokemonById(1)
                .then(pokemon => {
                    expect(pokemon).to.exist
                    expect(pokemon).to.be.an('object')
                    expect(pokemon).to.have.property('base');
                    expect(pokemon).to.deep.equal(completeSinglePokemon);
                })
        )

        true && it('should throw new error without id as a param', () => {
            expect( function(){ logic.retrievePokemonById()})
                .throw('Invalid id');
        })

        true && it('should throw new error with invalid param', () => {
            expect( function(){ logic.retrievePokemonById('banana')})
                .throw('Invalid id');
        })
    })
})