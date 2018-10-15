const AdminController = require('../core/AdminController');

class Portfolios extends AdminController {

    constructor() {
        super();
        this.model = 'Portfolio';
    }
}

module.exports = new Portfolios();
