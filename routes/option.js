const express = require("express");
const router = express.Router();
const option = require("../controller/option");
const auth = require("../middlewares/auth");

router.post("/add-option", auth, option.addOption);

router.put("/update-option", auth, option.updateOption)

router.delete("/delete-option", auth, option.deleteOption)

router.get("/get-options",auth, option.getOptionforQuestion)

module.exports = router;