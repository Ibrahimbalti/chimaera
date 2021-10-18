const express = require("express");
const passport = require("passport");
const router = express.Router();

const userControllers = require("../controllers/user");
const middleware = require("../middleware/routeHelper");

router
  .route("/account")
  .post(
    passport.authenticate("jwt", { session: false }),
    userControllers.account
  );
// @Route: 'users/signup'
// @Description: Creating a user
// @Access: Public
router.route("/signup").post(userControllers.signUp);

router.route("/signin").post(userControllers.signIn);

// @Route: 'users/google-signin'
// @Description: login a user by google
// @Access: Public
router
  .route("/google-signin")
  .post(middleware.googleTokenVerify, userControllers.googleSignin);

// @Route: 'users/facebook-signin'
// @Description: login a user by facebook
// @Access: Public
router
  .route("/facebook-signin")
  .post(
    passport.authenticate("facebookToken", { session: false }),
    userControllers.facebookSignin
  );
// @Route: 'users/signin'
// @Description: login a user
// @Access: Public
router
  .route("/card-email")
  .post(
    passport.authenticate("jwt", { session: false }),
    userControllers.cardProvider
  );

// @Route: 'users/signin'
// @Description: login a user
// @Access: Public
router.route("/recover-password").post(userControllers.recoverPassword);

// @Route: 'users/signin'
// @Description: login a user
// @Access: Public
router.route("/password-reset/:id").post(userControllers.resetPassword);

// @Route: 'users/signin'
// @Description: login a user
// @Access: Public
router.route("/recover-email").post(userControllers.recoverEmail);

// @Route: 'users/signin'
// @Description: login a user
// @Access: Public
router.route("/email-reset/:id").post(userControllers.resetEmail);

// @Route: 'user/delete-accoun'
// @Description: Delete a user
// @Access: need to authenticate
router
  .route("/deleteAccount")
  .delete(
    passport.authenticate("jwt", { session: false }),
    userControllers.deleteUser
  );

// @Route: 'user/autopilot'
// @Description: set uatopilot
// @Access: need to authenticate
router
  .route("/autopilot")
  .put(
    passport.authenticate("jwt", { session: false }),
    userControllers.autoPilot
  );

// @Route: 'user/autopilot'
// @Description: set uatopilot
// @Access: need to authenticate
router
  .route("/add-contacts")
  .post(
    passport.authenticate("jwt", { session: false }),
    userControllers.addContact
  );
  router
  .route("/delete-contacts")
  .post(
    passport.authenticate("jwt", { session: false }),
    userControllers.deleteContact
  );

// @Route: 'user/update-primium'
// @Description: for primium feature
// @Access: need to authenticate
router
  .route("/update-primium")
  .post(
    passport.authenticate("jwt", { session: false }),
    userControllers.updatedPrimiumFeature
  );

// @Route: 'user/me'
// @Description: modification of profile
// @Access: need to authenticate
router
  .route("/me")
  .patch(
    passport.authenticate("jwt", { session: false }),
    middleware.uploadImage.single("avatar"),
    userControllers.updateMe,
    middleware.handleError
  );
// @Route: 'user/:id/avatar'
// @Description: getting avatar by id
// @Access: public
router.route("/:id/avatar").get(userControllers.getUserAvatar);

// @Route: 'user/me'
// @Description: modification of profile
// @Access: need to authenticate
router
  .route("/me/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    userControllers.getUser
  );
// @Route: 'user/me'
// @Description: modification of profile
// @Access: need to authenticate
router
  .route("/update-card")
  .post(
    passport.authenticate("jwt", { session: false }),
    userControllers.updateCard
  );
// @Route: 'user/'
// @Description: modification of profile
// @Access: need to authenticate
router
  .route("/delete-links/:index")
  .delete(
    passport.authenticate("jwt", { session: false }),
    userControllers.deleteLinks
  );
// @Route: 'user/'
// @Description: modification of profile
// @Access: need to authenticate
router
  .route("/update-links")
  .patch(
    passport.authenticate("jwt", { session: false }),
    userControllers.updateLinks
  );
// @Route: 'user/'
// @Description: modification of profile
// @Access: need to authenticate
router
  .route("/checkout")
  .post(
    passport.authenticate("jwt", { session: false }),
    userControllers.checkout
  );
// @Route: 'user/'
// @Description: modification of profile
// @Access: public
router.route("/update-links-views").patch(userControllers.updateLinkViwes);

module.exports = router;
