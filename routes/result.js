const express = require("express");
const router = express.Router();
const Result = require("../controller/result");
const auth = require("../middlewares/auth");

router.post("/take-quiz", auth, Result.takeQuiz);

router.get("/get-result", auth, Result.getResults);
module.exports = router;