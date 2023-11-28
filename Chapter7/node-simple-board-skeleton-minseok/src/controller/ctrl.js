const {ArticleDAO} = require("../DAO");
const indexPage = async (req, res, next) => {
    try {
        // Controller function
        const {user} = req.session;
        return res.render("index.pug", {user})
    } catch (err) {
        return next(err);
    }
};

const listArticles = async (req, res, next) => {
    try {
        const {page} = req.params;
        const {user} = req.session;
        const pageNum = parseInt(page, 10);
        if (pageNum <= 0) throw new Error('BAD_REQUEST');
        const ARTICLES_PER_PAGE = 10;
        const startIndex = (pageNum - 1) * ARTICLES_PER_PAGE;
        const articles = await ArticleDAO.getList(startIndex, ARTICLES_PER_PAGE);
        const articleCount = await ArticleDAO.getTotalCount();
        const pageCount = Math.ceil(articleCount / ARTICLES_PER_PAGE);
        return res.render('articles/index.pug', {
            user,
            articles,
            page: pageNum,
            hasPrev: pageNum > 1,
            hasNext: pageNum < pageCount,
        });
    } catch (err) {
        return next(err);
    }
};
const listArticles_my_version_with_error = async (req, res, next) => {
    try {
        const {user} = req.session;
        const {page} = req.params;

        if (page <= 0) throw new Error("BAD_REQUEST")
        const articles = await ArticleDAO.getList(10 * page - 1, 10);
        const hasPrev = page > 1;

        const articleNumber = await ArticleDAO.getTotalCount();
        const hasNext = articleNumber > page * 10

        return res.render("articles/index.pug", {user, articles, page, hasPrev, hasNext});
    } catch (e) {
        next(e)
    }
}

const latestArticles = async (req, res, next) => {
    try {
        return res.redirect("/articles/page/1");
    } catch (e) {
        next(e)
    }
}

module.exports = {indexPage, listArticles, latestArticles};