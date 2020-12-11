
const firebase = require("firebase");

const app = firebase.initializeApp({
    apiKey: "",
    authDomain: "pokemon-db-803b1.firebaseapp.com",
    databaseURL: "https://pokemon-db-803b1-default-rtdb.europe-west1.firebasedatabase.app/"
})

module.exports = app;