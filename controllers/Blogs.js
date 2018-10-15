const AdminController = require('../core/AdminController');

class Blogs extends AdminController {

    constructor() {
        super();
        this.model = 'Blog';
    }

    edit(req, res, next) {

        let data = {
            model: this.model,
            controller: this.constructor.name.toLowerCase(),
            headerTitle: 'Create new'
        };

        this.setCss([
            'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css'
        ]);

        this.setJs([
            'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js'
        ]);

        this.render('edit', res, data, true);
    }
}

module.exports = new Blogs();
