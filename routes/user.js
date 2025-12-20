const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/user.js");

router
  .route("/signup")
  // signup form
  .get(userController.renderNewFrom)
  // signup logic
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  // login form
  .get(userController.renderLoginFrom)
  // login logic
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

//logout
router.get("/logout", userController.logout);

module.exports = router;
