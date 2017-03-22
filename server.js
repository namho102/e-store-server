'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');
var config = require('./config'); // get our config file


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: 3000,
    routes: { cors: true }
});

//Connect to db
server.app.db = mongojs(config.database);


//Load plugins and start server
server.register([
    require('./routes/products'),
    require('./routes/users')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});
