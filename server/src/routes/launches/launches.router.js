const express = require('express');
const { httpGetAllLaunches, httpAddNewLaunch} = require('./launches.controller');
const launchesRouter = express.Router();

// launchesRouter.get('/launches', httpGetAllLaunches);
// launchesRouter.post('/launches', httpAddNewLaunch);

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);


module.exports = launchesRouter ;