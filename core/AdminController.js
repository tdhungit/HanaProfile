const BaseController = require('../core/BaseController');
const Upload = require('../core/Upload');

class AdminController extends BaseController {

    constructor() {
        super();
        this.upload = new Upload();
    }

    save(req, res, next) {

    }
}

module.exports = AdminController;
