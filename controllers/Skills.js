const AdminController = require('../core/AdminController');

class Skills extends AdminController {

    constructor() {
        super();
        this.model = 'Skill';
    }
}

module.exports = new Skills();
