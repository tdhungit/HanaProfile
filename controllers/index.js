const bcrypt = require('bcrypt');

const View = require('../core/View');
const User = require('../models/User');

const v = new View('index');

module.exports = {

    index(req, res, next) {

        v.render('index', res, {title: 'Express'});
    },

    install(req, res, next) {

        User.getByUsername('jacky').then(function (result) {

            if (result && result.id) {

                v.render('install', res, {
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

                    v.render('install', res, {
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
};
