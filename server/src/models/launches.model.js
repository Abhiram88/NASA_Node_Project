const launches = new Map();

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

launches.set(launch.flightNumber, launch);


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

function getAllLaunches(){
    return Array.from(launches.values());
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};
