const mongoose = require('mongoose');
const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        //default:100
    },
    mission: {
        type:String,
        required: true
    },
    rocket: {
        type:String,
        required: true
    },
    launchDate: {
        type:Date,
        required: true
    },
    target: {
        type: String,
        required:true,
    },
    upcoming:{
        type: Boolean,
        required:true,
    },
    success:{
        type: Boolean,
        required:true,
        default: true,
    },
    customers: [String]
});



// we can map schema to collections using Models. 
// NodeJS queries Models for info, which uses schemas that are mapped to collections of documents to look for the searched query.


// connects launchesSchema with the "launches" collection
module.exports = mongoose.Model('Launch', launchesSchema);
