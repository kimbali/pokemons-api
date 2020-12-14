const pokemons = require("../dataMoc")
const { ENG } = require("../config")

const logic = {
    createCatalog({ page, lang = ENG }) {
        const size = 30;
        const startingAt = page * size;

        return Promise.resolve()
            .then(() => {
                if(pokemons.length === 0) throw new LogicError ('There are no pokemons in town');
                const chunk = [];
                for (let i = startingAt; i < (startingAt + size); i++) {
                    const { id, name, type } = pokemons[i];
                    const pokemon = { id, name: name[lang], type};
                    chunk.push(pokemon);
                }
                return chunk;
            })
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }