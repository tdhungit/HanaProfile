const Authenticate = (req, res, next) => {
    if (req.session && req.session.user_id >= 1) {
        return next();
    }

    return res.render('auth/401', {});
};

module.exports = Authenticate;
