const pokemons = require("../dataMoc")
const languages = require("../config")

const logic = {
    createCatalog(params) {
        if (!params) return [];
        const { page, lang } = params;

        if(!languages[lang]) throw new Error('Invalid language')

        const size = 20;
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
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }