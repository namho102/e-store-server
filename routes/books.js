'use strict';

const Boom = require('boom');


exports.register = function (server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/products',
        handler: function (request, reply) {

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
        path: '/products/{id}',
        handler: function (request, reply) {

            db.products.findOne({
                _id: request.params.id
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



    return next();
};

exports.register.attributes = {
    name: 'routes-products'
};
