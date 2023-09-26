const { Router } = require("express");
const router = Router();
router.get("/", (req, res) => res.send("GET /"));
router.post("/", (req, res) => res.send("POST /"));

router.get("/main", (req, res) => {
  res.send("<h1>Hi!</h1>");
});

module.exports = router;
