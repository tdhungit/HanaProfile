const bcrypt = require('bcrypt');

const BaseController = require('../core/BaseController');
const User = require('../models/User');

class Auth extends BaseController {

    constructor() {
        super();

        this.index = this.index.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.logout = this.logout.bind(this);
    };

    index(req, res, next) {
        this.render('index', res, {title: 'Login'});
    }

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
                            req.session.user_id = result.id;
                            req.session.username = result.username;

                            res.redirect('/admin');
                        }
                    });
                } else {

                    res.redirect('/admin/auth');
                }
            });
        }
    }

    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = new Auth();
