
'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
contacts = require('../../app/controllers/contacts');

module.exports = function(app) {
// contacts Routes
app.route('/contacts')
    .get(contacts.all)
    .post(users.requiresLogin, contacts.create);
app.route('/contacts/:contactId')
    .get(contacts.show)
    .put(users.requiresLogin, contacts.hasAuthorization, contacts.update)
    .delete(users.requiresLogin, contacts.hasAuthorization, contacts.destroy);

// Finish with setting up the contactId param
// Note: the contacts.contact function will be called everytime then it will call the next function.
app.param('contactId', contacts.contact);
};

