const {getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById} = require('../../models/launches.model');


function httpGetAllLaunches(req, res){
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res){
    launch = req.body;
    launch.launchDate = new Date(launch.launchDate); // converting string to date object.

    addNewLaunch(launch);
    res.status(201).json(launch);    
}

function httpAbortLaunch(req, res){
    const launchId = req.params.id;

    if(!existsLaunchWithId(launchId)){
        return res.status(200).json({
            error: "Launch doesn't exist"
        });
    }

    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}