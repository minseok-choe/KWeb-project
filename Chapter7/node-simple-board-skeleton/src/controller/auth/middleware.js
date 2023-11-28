const authRequired = async (req, res, next) => {
    try {
        if (req.session.user) return next();
        else return res.redirect("/auth/sign_in");
    } catch (e) {
        return next(e);
    }
}

module.exports = {authRequired}