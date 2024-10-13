const express = require("express");
const router = express.Router();
const quiz = require("../controller/quiz");
const auth = require("../middlewares/auth");

router.get("/get-all", quiz.getAllQuiz)

router.post("/add-quiz", auth, quiz.addQuiz);

router.put("/update-quiz", auth, quiz.updateQuiz);

router.delete("/delete-quiz/:id", auth, quiz.deleteQuiz);


router.post("/add-question", auth, quiz.addQuestionToQuiz);

router.put("/update-question", auth, quiz.updateQuestion);

router.delete("/delete-question", auth,quiz.deleteQuestion)

router.get("/get-allquestions", auth, quiz.getAllQuestion)

module.exports = router;