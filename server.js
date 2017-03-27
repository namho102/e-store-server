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

// bring your own validation function
var validate = function (decoded, request, callback) {
    if (decoded._id) {
      return callback(null, true);
    }
    return callback(null, false);
};



//Load plugins and start server
server.register([
    require('hapi-auth-jwt2'),
    require('./routes/authorization'),
    require('./routes/products'),
    require('./routes/users')
], (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {

          reply({text: 'You used a Token!'})
          .header("Authorization", request.headers.authorization);
        },
        config: {
            auth: 'jwt'
        }
    });


    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});
