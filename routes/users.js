'use strict';

const Boom = require('boom');


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


    return next();
};

exports.register.attributes = {
    name: 'routes-users'
};
