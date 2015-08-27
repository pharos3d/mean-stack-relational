/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * Find contact by id
 * Note: This is called every time that the parameter :contactId is used in a URL. 
 * Its purpose is to preload the contact on the req object then call the next function. 
 */
exports.contact = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Contact.find({ where: {id: id}, include: [db.User]}).then(function(contact){
        if(!contact) {
            return next(new Error('Failed to load contact ' + id));
        } else {
            req.contact = contact;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a contact
 */
exports.create = function(req, res) {
    // augment the contact by adding the UserId
    req.body.UserId = req.user.id;
    // save and return and instance of contact on the res object. 
    db.Contact.create(req.body).then(function(contact){
        if(!contact){
            return res.send('users/signup', {errors: err});
        } else {
            return res.jsonp(contact);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a contact
 */
exports.update = function(req, res) {

    // create a new variable to hold the contact that was placed on the req object.
    var contact = req.contact;

    contact.updateAttributes({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        telephone: req.body.telephone,
        email: req.body.email
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};

/**
 * Delete an contact
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the contact that was placed on the req object.
    var contact = req.contact;

    contact.destroy().then(function(){
        return res.jsonp(contact);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an contact
 */
exports.show = function(req, res) {
    // Sending down the contact that was just preloaded by the contacts.contact function
    // and saves contact on the req object.
    return res.jsonp(req.contact);
};

/**
 * List of Contacts
 */
exports.all = function(req, res) {
    db.Contact.findAll({include: [db.User]}).then(function(contacts){
        return res.jsonp(contacts);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Contact authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.contact.User.id != req.user.id) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
