const AdminController = require('../core/AdminController');

class Pages extends AdminController {

    constructor() {
        super();
        this.model = 'Page';
    }
}

module.exports = new Pages();
