// bring your own validation function
var validate = function (decoded, request, callback) {
    if (decoded._id) {
      return callback(null, true);
    }
    return callback(null, false);
};

exports.register = function (server, options, next) {
  server.auth.strategy('jwt', 'jwt',
  {
    key: 'NeverShareYourSecret',
    validateFunc: validate
  });

  next();
}

exports.register.attributes = {
    name: 'routes-authorization'
};
