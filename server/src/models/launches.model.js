const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo'); 

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'ISRO'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);


function existsLaunchWithId(launchId){
    console.log(launches);
    return launches.has(launchId);
}


function addNewLaunch(launch){
    latestFlightNumber += 1;
    launches.set(
        latestFlightNumber, 
        Object.assign(launch, {
            customers: ['NASA', 'ISRO'],
            upcoming: true,
            success: true,
            flightNumber: latestFlightNumber,
    }));
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;

}

async function getAllLaunches(){
    return await launchesDatabase.find({}, {
        '__v':0,
        '_id':0,
    });
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target,
    });
    
    if(!planet){
        throw new Error(`Planet ${launch.target} was not found`);
    }
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch // we are inserting launch
    , {
        upsert: true,
    });
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};
