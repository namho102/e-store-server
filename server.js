'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: 3000,
    routes: { cors: true }
});

//Connect to db
server.app.db = mongojs('mongodb://heroku_pnc1crsd:i3rtrdok3604bn79t7uimr9hn6@ds049744.mongolab.com:49744/heroku_pnc1crsd', ['products']);


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
