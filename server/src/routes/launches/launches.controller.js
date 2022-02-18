const {getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById} = require('../../models/launches.model');


async function httpGetAllLaunches(req, res){
    return res.status(200).json(await getAllLaunches());
}

function httpAddNewLaunch(req, res){
    const launch = req.body;
    
    if (!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target) {
             console.log("miss")
        return res.status(400).json({
            error: 'Missing required launch property',
        });
        }
        console.log("entered")
    launch.launchDate = new Date(launch.launchDate); // comverting string to date
    
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
        error: 'Invalid launch date',
        });
    }

        addNewLaunch(launch);
        return res.status(201).json(launch);    
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