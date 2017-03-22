'use strict';

const Boom = require('boom');
const jwt  = require('jsonwebtoken');
var config = require('./../config');

exports.register = function (server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/users',
        handler: function (request, reply) {

            db.users.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    });


    server.route({
        method: 'POST',
        path: '/authenticate',
        handler: function (request, reply) {
          db.users.findOne({
            username: request.payload.name,
          }, (err, user) => {

              if (err) {
                  return reply(Boom.wrap(err, 'Internal MongoDB error'));
              }

              if(!user) {
                reply({ success: false, message: 'Authentication failed. User not found.' });
              }

              else if (user.password != request.payload.password) {
                reply({ success: false, message: 'Authentication failed. Wrong password.' });
              }
              else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.secret, {
                  expiresIn: 86400 // expires in 24 hours
                });

                // return the information including token as JSON
                reply({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token
                });
              }

          });


        }
    });


    return next();
};

exports.register.attributes = {
    name: 'routes-users'
};
