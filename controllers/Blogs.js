const AdminController = require('../core/AdminController');
const Upload = require('../core/Upload');
const Blog = require('../models/Blog');

class Blogs extends AdminController {

    constructor() {
        super();

        this.model = 'Blog';
        this.upload = new Upload('files/blog/');

        this.uploadFields = [
            {
                name: 'imageFile',
                maxCount: 1
            }
        ];
    }

    preSave(data, req) {

        const image = req.files.imageFile && req.files.imageFile[0] || null;

        if (image) {
            data.image = image.filename;
        }

        return data;
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

            Blog.getById(req.params.id).then((record) => {
                data.headerTitle = 'Edit: ' + record.name;
                data.record = record;

                this.render('edit', res, data, true);
            });
        } else {
            this.render('edit', res, data, true);
        }
    }
}

module.exports = new Blogs();
