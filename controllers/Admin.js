const _ = require('underscore');
var fs = require('fs');
const path = require('path');

const AdminController = require('../core/AdminController');
const Setting = require('../models/Setting');

class Admin extends AdminController {

    constructor() {
        super();

        this.index = this.index.bind(this);
        this.settings = this.settings.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.applySettings = this.applySettings.bind(this);
        this.profile = this.profile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    index(req, res, next) {
        this.render('index', res, {});
    }

    settings(req, res, next) {
        this.render('settings', res, {});
    }

    saveSettings(req, res, next) {

        if (req.body.settings) {

            _.each(req.body.settings, (value, name) => {

                let data = {
                    name: name,
                    value: value
                };

                Setting.getSetting(name).then((result) => {

                    if (result && result.id) {
                        data.id = result.id;
                    }

                    Setting.save(data);
                });
            });

            setTimeout(function () {
                res.redirect('/admin/settings');
            }, 5000);
        } else {
            res.send('ERROR!');
        }
    }

    applySettings(req, res, next) {

        Setting.setSystemSettings().then((records) => {

            let data = {};
            _.each(records, (record) => {
                data[record.name] = record.value;
            });

            const filePath = path.join(__dirname, '../config/config.json');
            fs.writeFile(filePath, JSON.stringify(data), (error) => {
                res.redirect('/admin/settings');
            });
        });
    }

    profile(req, res, next) {
        this.render('profile', res, {});
    }

    uploadProfileFields() {
        return this.upload.getUpload().fields([
            {
                name: 'avatar',
                maxCount: 1
            },
            {
                name: 'cover',
                maxCount: 1
            }
        ]);
    }

    updateProfile(res, req, next) {
        console.log(res.files);
        req.send('OK!');
    }
}

module.exports = new Admin();
