const {runQuery} = require("../lib/database");

const formatDate = date => {
    const yr = date.getFullYear();
    const mon = date.getMonth() + 1;
    const dt = date.getDate();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    return `${yr}. ${mon}. ${dt} ${hrs}:${mins}:${secs}`;
};

const replaceDate = article => {
    if (article) {
        article.createdAt = formatDate(article.createdAt);
        article.lastUpdated = formatDate(article.lastUpdated);
    }
    return article;
};

const getList = async (start, count) => {
    const sql =
        `SELECT a.id           AS id,
                a.title        AS title,
                a.created_at   AS createdAt,
                a.last_updated as lastUpdated,
                u.display_name as displayName
         FROM users AS u
                  INNER JOIN articles AS a ON u.id = a.author
         WHERE a.is_active = 1
           AND a.is_deleted = 0
         ORDER BY a.id DESC
         LIMIT ? , ?`;

    let res = await runQuery(sql, [start, count]);
    return res.map(replaceDate);
}

const getTotalCount = async () => {
    const sql = `SELECT COUNT(*) AS cnt
                 FROM articles
                 WHERE is_active = 1
                   AND is_deleted = 0`;
    let res = await (runQuery(sql, []));
    console.log("TOTAL COUNT IS ->");
    console.log(res[0].cnt);
    return res[0].cnt;
}


const getById = async (id) => {
    const sql =
        `SELECT a.id           AS id,
                a.title        AS title,
                a.content      AS content,
                a.created_at   AS createdAt,
                a.last_updated AS lastUpdated,
                a.author       AS author,
                u.display_name as displayName

         FROM users AS u
                  INNER JOIN articles AS a ON u.id = a.author
         WHERE a.id = ?
           AND a.is_active = 1
           AND a.is_deleted = 0`;

    let res = await runQuery(sql, [id]);
    return replaceDate(res[0]);
}

const getByIdAndAuthor = async (id, author) => {
    const sql = `SELECT title, content, author, created_at AS createdAt, last_updated AS lastUpdated
                 FROM articles
                 WHERE id = ?
                   AND author = ?
                   AND is_active = 1
                   AND is_deleted = 0`;

    let res = await runQuery(sql, [id, author.id]);
    console.log(res[0]);
    return replaceDate(res[0]);

}

const create = async (title, content, author) => {
    const sql = `INSERT INTO articles
                 VALUES (DEFAULT, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT, DEFAULT)`
    let res = await runQuery(sql, [title, content, author.id]);
    return res.insertId; // (뭘 집어넣었는지 찾을 수 있음)
}

const update = async (id, title, content) => {
    const sql = `UPDATE articles
                 SET title=?,
                     content=?
                 WHERE id = ?`;

    let res = await runQuery(sql, [title, content, id]);
}

const remove = async (id) => {
    const sql = `UPDATE articles
                 SET is_deleted=1
                 WHERE id = ?`;
    let res = await runQuery(sql, [id]);
}

module.exports = {
    getList, getTotalCount, getById, getByIdAndAuthor, create, update, remove
};
