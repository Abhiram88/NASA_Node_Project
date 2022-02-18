const fs = require('fs');
const path = require('path');
const {parse} = require('csv-parse');

const planets = require('./planets.mongo');


function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6;
  }
  

// when this file is called, node will try and export the module before the below async code is run resulting in an error.

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found!`);
                resolve();
         });
    });
}

async function getAllPlanets(){
    return await planets.find({});
}

async function savePlanet(planet){
    try{
        // insert + update = upsert
    await planets.updateOne({
        keplerName: planet.kepler_name, //matches the schema object
    }, {
        keplerName: planet.kepler_name,
    }, {
        upsert: true,
    });
    }catch(err){
        console.log(`Couldn't save planets data because of err: ${err}`);
    }
    
}

  module.exports = {
    loadPlanetsData,
    getAllPlanets,
  }