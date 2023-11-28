require('./env');
const app = require('./app');
// const {UserDAO, ArticleDAO} = require("./DAO");
const {indexPage} = require("./controller/ctrl");
const {signOut, signUpForm, signUp, signInForm, signIn} = require("./controller/auth/ctrl");

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Kudev backend listening on port ${port}.`);
});