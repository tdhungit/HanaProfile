const path = require('path');

const BaseController = require('../core/BaseController');
const Upload = require('../core/Upload');
const config = require('../config/config');

class AdminController extends BaseController {

    constructor() {

        super();

        this.upload = new Upload();

        const theme = config.theme || 'hana';
        this.config_path = path.join(__dirname, '../themes/' + theme + '/config/' + this.constructor.name.toLowerCase());
    }

    save(req, res, next) {

    }
}

module.exports = AdminController;
