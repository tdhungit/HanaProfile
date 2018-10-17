const AdminController = require('../core/AdminController');

class Portfolios extends AdminController {

    constructor() {
        super();

        this.model = 'Portfolio';

        this.uploadFields = [
            {
                name: 'imageUpload',
                maxCount: 1
            }
        ];
    }

    preSave(data, req) {

        const image = req.files.imageUpload && req.files.imageUpload[0] || null;

        if (image) {
            data.image = image.filename;
        }

        return data;
    }
}

module.exports = new Portfolios();
