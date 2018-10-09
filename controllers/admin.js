const View = require('../core/View');

const v = new View('admin');

module.exports = {

    index(req, res, next) {

        v.render('index', res, {});
    }
};
