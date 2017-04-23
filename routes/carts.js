'use strict';

const Boom = require('boom');


exports.register = function(server, options, next) {

  const db = server.app.db;

  server.route({
    method: 'GET',
    path: '/carts',
    handler: function(request, reply) {

      db.carts.find((err, docs) => {

        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        reply(docs);
      });

    }
  });

  server.route({
    method: 'POST',
    path: '/carts',
    handler: function(request, reply) {
      var cart = request.payload

      db.carts.insert(cart, (err, doc) => {
        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        reply("Insert successfully")
      });

    }
  });


  server.route({
    method: 'GET',
    path: '/carts/{id}',
    handler: function(request, reply) {

      db.carts.find({
        'user_id': request.params.id
      }, (err, doc) => {
        // console.log(doc);
        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        if (!doc) {
          return reply(Boom.notFound());
        }

        reply(doc);
      });

    }

  });

  server.route({
    method: 'POST',
    path: '/carts/{id}',
    handler: function(request, reply) {

      db.carts.update({
        'cart_id': request.params.id
      }, (err, doc) => {
        console.log(doc);
        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        if (!doc) {
          return reply(Boom.notFound());
        }

        reply(doc);
      });

    }

  });


  server.route({
    method: 'DELETE',
    path: '/carts/{id}',
    handler: function(request, reply) {

      db.carts.remove({
        'cart_id': request.params.id
      }, function(err, result) {
        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        if (result.n === 0) {
          return reply(Boom.notFound());
        }

        reply().code(204);
      });
    },
    // config: {
    //     auth: 'jwt'
    // }
  });



  return next();
};

exports.register.attributes = {
  name: 'routes-carts'
};