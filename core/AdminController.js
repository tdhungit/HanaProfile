const path = require('path');

const BaseController = require('../core/BaseController');
const Upload = require('../core/Upload');

class AdminController extends BaseController {

    constructor() {

        super();

        this.model = '';
        this.upload = new Upload();
        this.config_path = this.themePath + '/config/' + this.constructor.name.toLowerCase();

        this.uploadFields = [];

        this.save = this.save.bind(this);
        this.list = this.list.bind(this);
        this.edit = this.edit.bind(this);
    }

    getModel(modelName = '') {

        modelName = modelName || this.model;

        const model_path = path.join(__dirname, '../models/' + modelName);
        return require(model_path);
    }

    setUploadFields(fields) {
        return this.uploadFields = fields;
    }

    getUploadFields() {
        return this.upload.getUpload().fields(this.uploadFields);
    }

    preSave(data, req) {
        return data;
    }

    saveRecord(modelName, data) {
        const model = this.getModel(modelName);
        return model.save(data);
    }

    save(req, res, next) {

        const upload = this.getUploadFields();

        upload(req, res, (error) => {

            if (error) {
                console.log(error);
                res.send('Upload error!');
            } else {

                const modelName = req.body.model || '';

                const controller = this.constructor.name.toLowerCase();
                const model = this.getModel(modelName);

                const data = this.preSave(req.body, req);
                model.save(data).then((result) => {
                    res.redirect('/admin/' + controller);
                });
            }
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
            layouts: require(this.config_path + '/edit'),
            record: {}
        };

        if (req.params.id) {

            const model = this.getModel();
            model.getById(req.params.id).then((record) => {
                data.headerTitle = 'Edit: ' + record.name;
                data.record = model.fixRecord(record);

                this.render('edit', res, data, true);
            });
        } else {
            this.render('edit', res, data, true);
        }
    }
}

module.exports = AdminController;
