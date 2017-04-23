'use strict';

const Boom = require('boom');


exports.register = function(server, options, next) {

  const db = server.app.db;

  server.route({
    method: 'GET',
    path: '/products',
    handler: function(request, reply) {

      db.products.find((err, docs) => {

        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        reply(docs);
      });

    }
  });

  server.route({
    method: 'GET',
    path: '/search/{query}',
    handler: function(request, reply) {
      let regex = {$regex : ".*" + request.params.query + ".*", $options: 'i'}   
      db.products.find({
        'name': regex
      }, (err, docs) => {

        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        reply(docs);
      });

    }
  });

  server.route({
    method: 'POST',
    path: '/products',
    handler: function(request, reply) {
      var product = request.payload

      db.products.insert(product, (err, doc) => {
        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        reply("Insert successfully")
      });

    }
  });


  server.route({
    method: 'GET',
    path: '/products/{id}',
    handler: function(request, reply) {

      db.products.findOne({
        'product_id': request.params.id
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
    method: 'PUT',
    path: '/products/{id}',
    handler: function(request, reply) {

      console.log(request.payload);
      db.products.update({
        'product_id': request.params.id
      }, {
        $set: request.payload
      }, (err, doc) => {

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
    path: '/products/{id}',
    handler: function(request, reply) {

      db.products.update({
        'product_id': request.params.id
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
    path: '/products/{id}',
    handler: function(request, reply) {

      db.products.remove({
        'product_id': request.params.id
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
  name: 'routes-products'
};