const {ArticleDAO} = require("../../DAO");

const readArticle = async (req, res, next) => {
    try {
        const {user} = req.session
        const {articleId} = req.params // ( GET /../...(\d+)이기 때문에 자동으로 정수

        const article = await ArticleDAO.getById(articleId);
        if (!article) throw new Error("NOT_FOUND");
        return res.render("articles/details.pug", {user, article})

    } catch (e) {
        next(e);
    }
}
const writeArticleForm = async (req, res, next) => {
    try {
        const {user} = req.session;
        return res.render("articles/editor.pug", {user}); //(근데 애초에 여기서 세션에 없으면 에러를 띄워야 되지 않나)
    } catch (e) {
        next(e)
    }
}

const writeArticle = async (req, res, next) => {
    try {
        const {user} = req.session;
        const {title, content} = req.body;
        const trimedTitle = title.trim()
        const trimedContent = content.trim()

        if (!title || !content) throw new Error("BAD_REQEUST")
        if (title.length > 50 || content.length > 65000) throw new Error("BAD_REQUEST")

        const articleId = await ArticleDAO.create(trimedTitle, trimedContent, user)
        res.redirect(`/article/${articleId}`);

    } catch (e) {
        // next(e)
        res.statusCode(e)
    }
}

const editArticleForm = async (req, res, next) => {
    try {
        const {user} = req.session;
        const {articleId} = req.params;

        const article = await ArticleDAO.getByIdAndAuthor(articleId, user);
        if (!article) throw new Error('NOT_FOUND');

        return res.render('articles/editor.pug', {user, article});
    } catch (err) {
        return next(err);
    }
};

const editArticle = async (req, res, next) => {
    try {
        const {articleId} = req.params;
        const {user} = req.session;
        const title = req.body.title.trim();
        const content = req.body.content.trim();

        if (!title || !content || title.length > 50 || content.length > 65000) {
            throw new Error("BAD_REQUEST")
        }

        const article = await ArticleDAO.getByIdAndAuthor(articleId, user);

        if (!article) throw new Error("NOT_FOUND");

        await ArticleDAO.update(articleId, title, content);
        return res.redirect(`/article/${articleId}`);
    } catch (e) {
        next(e)
    }
}

const deleteArticle = async (req, res, next) => {
    try {
        const {articleId} = req.params;
        const {user} = req.session;
        const article = await ArticleDAO.getByIdAndAuthor(articleId, user);

        if (!article) throw new Error("NOT_FOUND")

        await ArticleDAO.remove(articleId);

        return res.redirect("/articles/page/1")

    } catch (e) {
        next(e)
    }
}

module.exports = {
    readArticle,
    writeArticle,
    writeArticleForm,
    editArticle,
    editArticleForm,
    deleteArticle,
}