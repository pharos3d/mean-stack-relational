/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * Find camp by id
 * Note: This is called every time that the parameter :campId is used in a URL. 
 * Its purpose is to preload the camp on the req object then call the next function. 
 */
exports.camp = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Camp.find({ where: {id: id}, include: [db.User]}).then(function(camp){
        if(!camp) {
            return next(new Error('Failed to load camp ' + id));
        } else {
            req.camp = camp;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a camp
 */
exports.create = function(req, res) {
    // augment the camp by adding the UserId
    req.body.UserId = req.user.id;
    // save and return and instance of camp on the res object. 
    db.Camp.create(req.body).then(function(camp){
        if(!camp){
            return res.send('users/signup', {errors: err});
        } else {
            return res.jsonp(camp);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a camp
 */
exports.update = function(req, res) {

    // create a new variable to hold the camp that was placed on the req object.
    var camp = req.camp;



    camp.updateAttributes({
        title: req.body.title,
        site: req.body.size,
        description: req.body.description,
        address: req.body.address,
        telephone: req.body.telephone,
        email: req.body.email,
        url: req.body.url,
        facebook: req.body.facebook

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
 * Delete an camp
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the camp that was placed on the req object.
    var camp = req.camp;

    camp.destroy().then(function(){
        return res.jsonp(camp);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an camp
 */
exports.show = function(req, res) {
    // Sending down the camp that was just preloaded by the camps.camp function
    // and saves camp on the req object.
    return res.jsonp(req.camp);
};

/**
 * List of Camps
 */
exports.all = function(req, res) {
    db.Camp.findAll({include: [db.User]}).then(function(camps){
        return res.jsonp(camps);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Camp authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.camp.User.id != req.user.id) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
