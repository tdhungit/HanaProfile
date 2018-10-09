const bcrypt = require('bcrypt');

const BaseController = require('../core/BaseController');
const User = require('../models/User');

class Index extends BaseController {

    constructor() {
        super();

        this.index = this.index.bind(this);
        this.install = this.install.bind(this);
    }

    index(req, res, next) {
        this.render('index', res, {title: 'Express'});
    }

    install(req, res, next) {

        const self = this;

        User.getByUsername('jacky').then(function (result) {

            if (result && result.id) {

                self.render('install', res, {
                    error: 0,
                    message: 'Installed! Please login with account: jacky/jacky',
                    id: result.id
                });
            } else {

                let hash = bcrypt.hashSync('jacky', 10);

                User.insert({
                    username: "jacky",
                    password: hash
                }).then(function (result) {

                    self.render('install', res, {
                        error: 0,
                        message: 'Installed successful! Please login with account: jacky/jacky',
                        id: result.id
                    });
                }).catch(function (error) {
                    console.log(error);
                    res.send('INSERT ERROR!');
                });
            }
        }).catch(function (error) {
            console.log(error);
            res.send('QUERY ERROR!');
        });
    }
}

module.exports = new Index();
