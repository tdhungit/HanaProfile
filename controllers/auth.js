const bcrypt = require('bcrypt');

const View = require('../core/View');
const User = require('../models/User');

const v = new View('auth');

module.exports = {

    index(req, res, next) {
        v.render('index', res, {title: 'Express'});
    },

    doLogin(req, res, next) {

        if (req.body.username && req.body.password) {
            User.getByData({
                username: req.body.username
            }).then(function (result) {

                if (result && result.id) {
                    bcrypt.compare(req.body.password, result.password, (error, compared) => {
                        if (error || compared !== true) {
                            res.send('Error!');
                        } else {
                            res.send('OK!');
                        }
                    });
                } else {

                    req.redirect('/admin/auth');
                }
            });
        }
    }
};
