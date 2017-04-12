'use strict';

const Boom = require('boom');
const jwt = require('jsonwebtoken');
const config = require('./../config');


exports.register = function(server, options, next) {

  const db = server.app.db;

  server.route({
    method: 'GET',
    path: '/users',
    handler: function(request, reply) {

      db.users.find((err, docs) => {

        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        reply(docs);
      });

    }
  });

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    handler: function(request, reply) {
      console.log(request.params.id);

      db.users.remove({
        'user_id': request.params.id
      }, function(err, result) {
        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        if (result.n === 0) {
          return reply(Boom.notFound());
        }

        reply().code(204);
      });

    }
  });

  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: function(request, reply) {
      console.log(request.params.id);

      db.users.find({
        'user_id': request.params.id
      }, function(err, result) {
        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        if (result.n === 0) {
          return reply(Boom.notFound());
        }

        reply(result);
      });

    }
  });


  var cookie_options = {
    ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
    encoding: 'none',    // we already used JWT to encode
    isSecure: true,      // warm & fuzzy feelings
    isHttpOnly: true,    // prevent client alteration
    clearInvalid: false, // remove invalid cookies
    strictHeader: true   // don't allow violations of RFC 6265
  }

  server.route({
      method: 'POST',
      path: '/authenticate',
      handler: function(request, reply) {
        db.users.findOne({
          email: request.payload.email,
        }, (err, user) => {

          if (err) {
            return reply(Boom.wrap(err, 'Internal MongoDB error'));
          }

          if (!user) {
            reply({
              success: false,
              message: 'Authentication failed. User not found.'
            });
          } else if (user.password != request.payload.password) {
            reply({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {
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
            }).state("token", token, cookie_options)
          }

        });


      }
    }

  );


  return next();
};

exports.register.attributes = {
  name: 'routes-users'
};