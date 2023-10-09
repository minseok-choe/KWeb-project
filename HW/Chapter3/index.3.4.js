const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/html/index.html`);
});

app.post("/login", (req, res) => {
  res.send(
    `Username is ${req.body.username} and Password is ${req.body.password}`,
  );
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
