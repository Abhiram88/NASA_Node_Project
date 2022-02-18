const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true
    }
});

// we can map schema to collections using Models. 
// NodeJS queries Models for info, which uses schemas that are mapped to collections of documents to look for the searched query.


module.exports = mongoose.Model('Planet', planetSchema)

