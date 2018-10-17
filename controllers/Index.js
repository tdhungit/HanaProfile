const bcrypt = require('bcrypt');
const _ = require('underscore');
const Promise = require('bluebird');

const BaseController = require('../core/BaseController');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Portfolio = require('../models/Portfolio');
const Blog = require('../models/Blog');
const User = require('../models/User');

class Index extends BaseController {

    constructor() {
        super();

        this.index = this.index.bind(this);
        this.install = this.install.bind(this);
    }

    index(req, res, next) {

        Promise.all([
            Profile.getProfile(),
            Experience.getByData([], true),
            Portfolio.getByData([], true),
            Blog.getByData([], true),
            Skill.getByData([], true),
        ]).then((result) => {
            console.log(result);

            const profile = result[0];
            const experiences = result[1];
            const portfolios = result[2];
            const blogs = result[3];
            const skills = result[4];

            let data = {
                title: profile.name,
                profile: this.fixProfile(profile),
                skills: skills,
                experiences: experiences,
                portfolios: portfolios,
                blogs: blogs
            };

            this.render('index', res, data);
        }).catch((error) => {
            res.send('ERROR! Please contact with Administrator!');
        });
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

    fixProfile(profile) {

        try {

            const profile_title = JSON.parse(profile.title);
            profile.title = '';
            profile.typed = [' ' + profile.name];
            _.each(profile_title, (item) => {
                profile.title += item + ', ';
                profile.typed.push(' ' + item);
            });

            profile.title = profile.title.substr(0, profile.title.length - 2);

            profile.social = JSON.parse(profile.social);

        } catch (e) {}

        return profile;
    }
}

module.exports = new Index();
