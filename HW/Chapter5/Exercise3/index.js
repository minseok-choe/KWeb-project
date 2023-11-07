const express = require('express');
const {runQuery} = require('./database');
const mysql = require("mysql");
const app = express();
const port = 3000;

app.get('/fare', async (req, res) => {
    const userId = req.query.uid;
    const query = `
        SELECT SUM(ROUND(types.fare_rate * (trains.distance / 1000), -2)) AS total_fare
        FROM tickets
                 INNER JOIN trains ON tickets.train = trains.id
                 INNER JOIN types ON trains.type = types.id
        WHERE tickets.user = ${userId}`;

    const result = await runQuery(query);
    const name = await runQuery(`SELECT \`name\`
                                 from \`users\`
                                 where \`users\`.\`id\` = ${userId}`)
    res.send(`Total fare of ${name[0].name} is ${result[0].total_fare} KRW.`);
});

app.get('/train/status', async (req, res) => {
    const trainId = req.query.tid;
    const query = `
        SELECT (SELECT COUNT(*) FROM tickets WHERE train = ${mysql.escape(trainId)}) AS booked_seats,
               (SELECT max_seats
                FROM types
                         INNER JOIN trains ON types.id = trains.type
                WHERE trains.id = ${mysql.escape(trainId)})                          AS max_seats`;

    const result = await runQuery(query);
    const isSoldOut = result[0].booked_seats >= result[0].max_seats;
    res.send(`Train ${trainId} is ${isSoldOut ? '' : 'not '}sold out`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});