'use strict';

const Boom = require('boom');

exports.register = function(server, options, next) {

    const db = server.app.db;

    //get all order
    server.route({
        method: 'GET',
        path: '/orders',
        handler: function(request, reply) {
            db.orders.find((err, docs) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                reply(docs);
            });
        }
    });

    //get order by id
    server.route({
        method: 'GET',
        path: '/orders/{id}',
        handler: function(request, reply) {
            console.log("user get order by id");
            db.orders.findOne({
                'order_id': request.params.id
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

    //update order
    server.route({
        method: 'PUT',
        path: '/orders/{id}',
        handler: function(request, reply) {

            db.orders.update({
                'order_id': request.params.id
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

    //add new order
    server.route({
        method: 'POST',
        path: '/orders',
        handler: function (request, reply) {
            var order = request.payload;
            db.orders.insert(order, (err, doc) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                reply("Insert user successfully")
            });
        }
    });
    return next();
};

exports.register.attributes = {
    name: 'routes-orders'
};
