<img alt="Magic mashroom"
    src="https://github.com/kimbali/pokemons-app/blob/main/src/images/pokemon-logo.png?raw=true"
    height="100px" />
	
# APP

- [Live Demo](https://pokemon-catalog.netlify.app)
- [APP](https://github.com/kimbali/pokemons-app)

## How its done

1. Is a server made by Node and using Express framework. 

2. In `index.js` are setted all API routes.

3. In `logic.js` is where pokemons magic happens. 

4. All methods in `logic.js` are been tested with mocha chai. Run `npm test` and change to true the conditional to choose which ones do you want to run in local. 

5. Firebase is prepared to be used but, by the moment, the data es stored as a mok in the same server. The idea is to use the schemes of mongoDB to handle the data base solution.

6. Main important data can be found in process.env. 

7. I've used postman to test the routes. 

## Local script

`nodex index.js`
Turns on the server in local. In order to see details in react APP, url should be changed in [logic.js app file](https://github.com/kimbali/pokemons-app/blob/main/src/logic/logic.js)
Open [http://localhost:8080](http://localhost:8080).

## Deployment

Is deployed in Heroku [SEE WEB PAGE](https://pokemon-catalog.netlify.app)
APP is desployed in Netlify. 
