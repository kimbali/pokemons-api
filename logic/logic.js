const pokemons = require("../dataMoc")
const languages = require("../config")

const logic = {

    createCatalog(params) {
        if (!params) return [];
        const { page, lang } = params;

        if(!languages[lang]) throw new Error('Invalid language')

        const size = 30;
        const startingAt = page * size;

        return Promise.resolve()
            .then(() => {
                const chunk = [];
                for (let i = startingAt; i < (startingAt + size); i++) {
                    const { id, name, type } = pokemons[i];
                    const pokemon = { id, name: name[languages[lang]], type};
                    chunk.push(pokemon);
                }
                return chunk;
            })
    },

    retrievePokemonById(id) {
        if(!id || isNaN(id)) throw new Error('Invalid id');
        return Promise.resolve()
            .then(() => {
                const [ foundedPokemon ] = pokemons.filter(one => one.id == id);
                return foundedPokemon;
            })
    },

    createTypesList() {
        return Promise.resolve()
            .then(() => {
                let pokemonTypes = [];
                pokemons.forEach(pokemon => {
                    pokemonTypes = pokemonTypes.concat(pokemon.type);
                })

                pokemonTypes = [...new Set(pokemonTypes)];
                return pokemonTypes.sort();
            })
    },

    findPokemonsByType({ type, lang }) {
        return Promise.resolve()
            .then(() => {
                let pokemonsFilted = [];

                if(!type) return [];
                
                pokemons.forEach(pokemon => {
                    return pokemon.type.forEach(element => {
                        if(element === type) {
                            const { id, name, type } = pokemon;
                            return pokemonsFilted.push({ id, name: name[languages[lang]], type});
                        } 
                    }) 
                })
                
                return pokemonsFilted;
            })
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }