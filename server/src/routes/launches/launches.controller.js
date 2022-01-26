const {getAllLaunches, addNewLaunch} = require('../../models/launches.model');


function httpGetAllLaunches(req, res){
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res){
    launch = req.body;
    launch.launchDate = new Date(launch.launchDate); // converting string to date object.

    addNewLaunch(launch);
    res.status(201).json(launch);    
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}