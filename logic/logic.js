const pokemons = require("../dataMoc")
const { ENG } = require("../config")

const logic = {
    createCatalog(lang = ENG) {
        return Promise.resolve()
            .then(() => {
                if(pokemons.length === 0) throw new LogicError ('There are no pokemons in town');
                let pokemonsFiltered = pokemons.map(pokemon => {
                    const { id, name, type } = pokemon;
                    return { id, name: name[lang], type}
                })
                return pokemonsFiltered;
            })
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }