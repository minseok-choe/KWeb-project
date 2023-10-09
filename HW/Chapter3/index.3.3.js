const express = require("express");
const app = express();
const port = 3000;

function range(a, b) {
  let size = b - a + 1;
  let start = a;
  return Array.from({ length: size }, (_, index) => index + start);
}

function facto(n, end = 1) {
  return range(end, n).reduce((prev, current) => {
    return prev * current;
  }, 1);
}

app.get("/factorial/:number", (req, res) => {
  res.send(`${facto(req.params.number)}`);
});

app.get("/factorial", (req, res) => {
  res.redirect(`/factorial/${req.query.number}`);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
