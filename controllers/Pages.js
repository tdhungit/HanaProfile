const AdminController = require('../core/AdminController');
const Page = require('../models/Page');

class Pages extends AdminController {

    constructor() {
        super();
        this.model = 'Page';
    }

    edit(req, res, next) {

        this.setCss([
            'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css'
        ]);

        this.setJs([
            'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js'
        ]);

        let data = {
            model: this.model,
            controller: this.constructor.name.toLowerCase(),
            headerTitle: 'Create new',
            record: {}
        };

        if (req.params.id) {

            Pages.getById(req.params.id).then((record) => {
                data.headerTitle = 'Edit: ' + record.name;
                data.record = record;

                this.render('edit', res, data, true);
            });
        } else {
            this.render('edit', res, data, true);
        }
    }
}

module.exports = new Pages();
