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
    const launchId = Number(req.params.id);

    if(!existsLaunchWithId(launchId)){
        return res.status(404).json({
            error: "Launch doesn't exist"
        });
    }

    console.log("dib")
    const aborted = abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
          error: 'Launch not aborted',
        });
    }   
    return res.status(200).json({
        ok: true,
      });

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};