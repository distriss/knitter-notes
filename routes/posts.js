const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);
router.get("/:id/editPost", ensureAuth, postsController.getEditPost)
router.post("/createPost", upload.single("file"), postsController.createPost);

// edit details route
// router.put("/editPostCraft/", postsController.editPostCraft);
/* router.put("/editPostYarnWeight/", postsController.editPostYarnWeight);
router.put("/editPostNeedleSize/", postsController.editPostNeedleSize);
router.put("/editPostGauge/", postsController.editPostGauge);
router.put("/editPostYardage/", postsController.editPostYardage);
router.put("/editPostYarn/", postsController.editPostYarn);
router.put("/editPostCategory/", postsController.editPostCategory);
router.put("/editPostSize/", postsController.editPostSize);
router.put("/editPostOrigin/", postsController.editPostOrigin); */

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;