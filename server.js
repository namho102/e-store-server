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

var people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones'
    }
};

// bring your own validation function
var validate = function (decoded, request, callback) {
    return callback(null, true);
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return callback(null, false);
    }
    else {
      return callback(null, true);
    }
};


//Load plugins and start server
server.register([
    require('hapi-auth-jwt2'),
    require('./routes/products'),
    require('./routes/users')
], (err) => {

    if (err) {
        throw err;
    }

    server.auth.strategy('jwt', 'jwt',
    { key: 'NeverShareYourSecret',          // Never Share your secret key
      validateFunc: validate,            // validate function defined above
      // verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    });


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
