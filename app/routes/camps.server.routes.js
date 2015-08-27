
'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
camps = require('../../app/controllers/camps');

module.exports = function(app) {
// Camps Routes
app.route('/camps')
    .get(camps.all)
    .post(users.requiresLogin, camps.create);
app.route('/camps/:campId')
    .get(camps.show)
    .put(users.requiresLogin, camps.hasAuthorization, camps.update)
    .delete(users.requiresLogin, camps.hasAuthorization, camps.destroy);

// Finish with setting up the campId param
// Note: the camps.camp function will be called everytime then it will call the next function.
app.param('campId', camps.camp);
};

