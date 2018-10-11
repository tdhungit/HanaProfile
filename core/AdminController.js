const path = require('path');

const BaseController = require('../core/BaseController');
const Upload = require('../core/Upload');

class AdminController extends BaseController {

    constructor() {

        super();

        this.model = '';
        this.upload = new Upload();
        this.config_path = this.themePath + '/config/' + this.constructor.name.toLowerCase();

        this.save = this.save.bind(this);
        this.list = this.list.bind(this);
        this.edit = this.edit.bind(this);
    }

    getModel(modelName = '') {

        modelName = modelName || this.model;

        const model_path = path.join(__dirname, '../models/' + modelName);
        return require(model_path);
    }

    saveRecord(modelName, data) {
        const model = this.getModel(modelName);
        return model.save(data);
    }

    save(req, res, next) {

        const modelName = req.body.model || '';

        const controller = this.constructor.name.toLowerCase();
        const model = this.getModel(modelName);

        model.save(req.body).then((result) => {
            res.redirect('/admin/' + controller);
        });
    }

    list(req, res, next) {

        let data = {
            model: this.model,
            controller: this.constructor.name.toLowerCase(),
            layouts: require(this.config_path + '/list')
        };

        const model = this.getModel();
        model.getByData({}, true).then((records) => {

            data.records = records;

            this.render('list', res, data, true);
        });
    }

    edit(req, res, next) {

        let data = {
            model: this.model,
            controller: this.constructor.name.toLowerCase(),
            headerTitle: 'Create new',
            layouts: require(this.config_path + '/edit')
        };

        if (req.params.id) {

            const model = this.getModel();
            model.getById(req.params.id).then((record) => {
                data.headerTitle = 'Edit: ' + record.name;
                data.record = record;

                this.render('edit', res, data, true);
            });
        } else {
            this.render('edit', res, data, true);
        }
    }

    upload(req, res, next) {

        const upload = this.upload.getUpload().single('file');

        upload(req, res, (error) => {

            if (error) {
                res.json(error);
            } else {
                res.json(req.file);
            }
        });
    }
}

module.exports = AdminController;
