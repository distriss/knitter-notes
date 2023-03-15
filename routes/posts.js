const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

// edit Details Routes
router.put("/editCraft/", postsController.editPostCraft);
router.put("/editYarnWeight/", postsController.editYarnWeight);
router.put("/editNeedleSize/", postsController.editNeedleSize);
router.put("/editGauge/", postsController.editGauge);
router.put("/editYardage/", postsController.editYardage);
router.put("/editYarn/", postsController.editYarn);
router.put("/editCategory/", postsController.editCategory);
router.put("/editSize/", postsController.editSize);
router.put("/editOrigin/", postsController.editOrigin);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;