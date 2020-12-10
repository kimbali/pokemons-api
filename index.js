require('dotenv').config();

const express = require("express");
const cors = require('cors')

const { logic, LogicError } = require("./logic/logic");
const { name, version} = require('./package.json')
const { PORT } = process.env;

const app = express();
app.use(cors())

app.get('/catalog', function (req, res) {
    logic.createCatalog()
        .then(pokemons => res.status(200).json({ status: 'OK', pokemons }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
});

app.listen(PORT, () => {
    console.log(`${name} ${version} up and running on port ${PORT}`);
});