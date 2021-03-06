var passport = require('passport');
var User = require('../models/User');

// GET '/' - renders index page
module.exports.renderUserIndex = function(req, res, next) {
  User.find({}, function(err, users){
    res.render('users/index', {title: 'SMOKN', users: users});
  })
  res.render('users/index', {title: 'SMOKN'});
};

// module.exports.renderUserIndex = function(req, res, next) {
//   res.render('users/index', {title: 'SMOKN'});
// };


module.exports.renderUserNew = function(req, res, next) {
  res.render('auth/new', {title: 'SMOKN', user: req.user});
};

module.exports.renderUserShow = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    res.render('users/show', {title: 'SMOKN', user: req.user});
  });
};

module.exports.renderAbout = function(req, res, next) {
  res.render('users/about', {title: 'About SMOKN', user: req.user});
};

module.exports.renderUserEdit = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    res.render('users/edit', {title: 'SMOKN', user: req.user});
  });
};

//change routes, render profile page after revisions. (save to profile and return to profile)
//CM redirects to show but doesn't update in db
// module.exports.renderUserUpdate = function(req, res, next) {
//   User.update(
//       {
//       email: req.body.email,
//       userDescription: req.body.userDescription,
//       birthday: req.body.birthday,
//       userGender: req.body.userGender,
//       matchPreference: req.body.matchPreference,
//       type: req.body.type,
//       photo_url: req.body.photo_url
//     }, function(err, user) {
//     if (err) return res.json({message: 'error:' + err});
//       res.redirect('/users/show');
//       })
//   }


module.exports.renderUserCreate = function(req, res, next) {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      userDescription: req.body.userDescription,
      birthday: req.body.birthday,
      userGender: req.body.userGender,
      matchPreference: req.body.matchPreference,
      type: req.body.type,
      photo_url: req.body.photo_url
    }), req.body.password, function(err, user) {
    if (err) return res.render('auth/new', {user: user});
    passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) {
          return next(err);
      }
      res.redirect('/users/' + user.id);
      });
    });
  });
};

module.exports.editUser = function(req, res, next) {
  var id = req.params.id;
  User.findById(req.params.id, function (err, user) {
    if (err) res.json({message: 'could not find user'});

    user.username = req.body.username;
    user.email = req.body.email;
    user.userDescription = req.body.userDescription;
    user.birthday = req.body.birthday;
    user.userGender = req.body.userGender;
    user.matchPreference = req.body.matchPreference;
    user.type = req.body.type;
    user.photo_url = req.body.photo_url;

    req.user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/users/' + user.id);
    });
  });
};

module.exports.deleteUser = function(req, res, next) {
  var user = req.user;
  user.remove(function (err) {
    req.flash('info', 'deleted profile');
    res.redirect('/');
  });
};

