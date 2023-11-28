const {ArticleDAO, UserDAO} = require("../../DAO");
const {verifyPassword, generatePassword} = require("../../lib/authentication");
const signInForm = async (req, res, next) => {
    try {
        const {user} = req.session
        if (user === undefined) {
            return res.render("auth/sign-in.pug", {user})
        } else {
            res.redirect("/"); //로그인 정보를 넘겨주지 않아도 됨 - http를 리다이렉트한다는건 갈아끼운다는게 아니고 보내는거기 때문에 (?)
        }
    } catch (err) {
        return next(err);
    }
}

const signIn = async (req, res, next) => {
    try {
        let {username, password} = req.body
        if (!username || !password) throw new Error("BAD_REQUEST");

        const user = await UserDAO.getByUsername(username);
        if (!user) throw new Error("UNAUTHORIZED");
        const isTrue = await verifyPassword(password, user.password);
        if (!isTrue) throw new Error("UNAUTHORIZED");

        req.session.user = {
            id: user.id,
            username: username,
            displayName: user.displayName,
            isActive: user.isActive,
            isStaff: user.isStaff,
        };

        return res.redirect("/"); //POST 로 signin을 보내면 -

    } catch (err) {
        return next(err);
    }
}

const signUpForm = async (req, res, next) => {
    try {
        const {user} = req.session
        res.render("auth/sign-up.pug", {user});
    } catch (e) {
        next(e)
    }
}

const signUp = async (req, res, next) => {
    try {
        const {username, password, displayName} = req.body
        const hashedPW = await generatePassword(password);

        if (!username || !password || !displayName || username.length > 16 || displayName.length > 32 || hashedPW > 151) {
            throw new Error("BAD_REQUEST")
        }

        await UserDAO.create(username, hashedPW, displayName);

        res.redirect("/auth/sign_in");

    } catch (e) {
        next(e)
    }
}

const signOut = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) throw err;
            else return res.redirect("/");
        })
    } catch (e) {

    }
}

module.exports = {signInForm, signIn, signUpForm, signUp, signOut}