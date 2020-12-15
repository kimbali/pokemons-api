require('dotenv').config();

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const { logic, LogicError } = require("./logic/logic");
const { name, version} = require('./package.json');
const ofirebase = require("./firebase/setData");

const { PORT } = process.env;
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/catalog/:page?/:lang?', function (req, res) {
    const { params: { page, lang }} = req;
    logic.createCatalog({ page, lang })
        .then(pokemons => res.status(200).json({ status: 'OK', pokemons }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
});

app.get('/pokemon/:id', function (req, res) {
    const { params: { id }} = req;
    logic.retrievePokemonById(id)
        .then(pokemon => {
            res.status(200).json({ status: 'OK', pokemon })})
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
});

app.get('/types', function (req, res) {
    logic.createTypesList()
        .then(typesList => {
            res.status(200).json({ status: 'OK', typesList })})
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
});

app.get('/type/:type/:lang', function (req, res) {
    const { params: { type, lang }} = req;
    logic.findPokemonsByType({ type, lang })
        .then(pokemons => {
            res.status(200).json({ status: 'OK', pokemons })})
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
});

app.post("/hola", function (req, res) {
    ofirebase.saveData(req.body, function( err, data){
        res.send(data)
    })
})

app.listen(PORT, () => {
    console.log(`${name} ${version} up and running on port ${PORT}`);
});

