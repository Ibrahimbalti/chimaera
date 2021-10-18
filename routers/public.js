const express = require("express");
const router = express.Router();

const publicControllers = require("../controllers/public")


// @Route: 'dashboard/getAllIcons'
// @Description: creating a account
// @Access: public
router.get('/getAllIcons', publicControllers.getAllIcons)

// @Route: 'dashboard/getAllIcons'
// @Description: creating a account
// @Access: public
router.get('/get-blogs', publicControllers.getAllBlogs)


// @Route: 'dashboard/getAllIcons'
// @Description: creating a account
// @Access: public
router.get('/getSponsore/:userName', publicControllers.getSponsore)

router.get('/vcf/:userName', publicControllers.getUserVCf)

// @Route: 'public/:userName'
// @Description: Creating a user
// @Access: Public
router.route("/:userName").patch(publicControllers.updateMe);

// @Route: 'public/:userName'
// @Description: Creating a user
// @Access: Public
router.route("/avatar/:userName").get(publicControllers.getUserAvatar);

// @Route: 'public/:userName'
// @Description: Creating a user
// @Access: Public
router.route("/:userName").get(publicControllers.getUser);

module.exports = router;