

const router = require('express').Router(), 
      controller = require("../controllers/userController");

router.route("/signin")
    .post(controller.signin);

router.route("/signup")
    .post(controller.signup);

module.exports = router;