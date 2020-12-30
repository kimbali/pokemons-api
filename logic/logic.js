const pokemons = require("../dataMoc")
const { DEFAULT_SIZE, LANGUAGES } = require("../config.json");

const logic = {

    createCatalog(params) {
        if (!params) return [];
        const { page, lang, size = DEFAULT_SIZE } = params;

        if(!LANGUAGES[lang]) throw new Error('Invalid language')

        const startingAt = page * (size * 1);

        return Promise.resolve()
            .then(() => {
                const chunk = [];
                for (let i = startingAt; i < (startingAt + size * 1); i++) {
                    if (pokemons[i]) {
                        const { id, name, type } = pokemons[i];
                        const pokemon = { id, name: name[LANGUAGES[lang]], type};
                        chunk.push(pokemon);
                    } else {
                        break;
                    }
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
                            return pokemonsFilted.push({ id, name: name[LANGUAGES[lang]], type});
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