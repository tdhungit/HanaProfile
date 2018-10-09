const View = require('../core/View');

const v = new View('auth');

const Authenticate = (req, res, next) => {
    if (req.session && req.session.user_id >= 1) {
        return next();
    }

    return v.render('401', res, {});
};

module.exports = Authenticate;
