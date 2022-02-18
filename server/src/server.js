const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONOGO_URL = "mongodb+srv://admin:pass@cluster0.6fe8z.mongodb.net/nasa?retryWrites=true&w=majority"

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log("MongoDB connection established");
});

mongoose.connection.on('error', (err)=> {
    console.error(err)
});

async function startServer() {
    await mongoose.connect(MONOGO_URL);
    await loadPlanetsData();

    server.listen(PORT, ()=>{
        console.log(`listening on ${PORT}`);
    });
}

startServer();

