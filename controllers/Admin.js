const BaseController = require('../core/BaseController');

class Admin extends BaseController {

    index(req, res, next) {
        this.render('index', res, {});
    }
}

module.exports = new Admin();
