const AdminController = require('../core/AdminController');

class Experiences extends AdminController {

    constructor() {
        super();
        this.model = 'Experience';
    }
}

module.exports = new Experiences();
