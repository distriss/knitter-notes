const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);
router.post("/createPost", upload.single("file"), postsController.createPost);

// Edit Post Routes
router.get("/editPost/:id", ensureAuth, postsController.getEditPost);
router.put("/editPost/editPostDetails/:id", postsController.editPostDetails);
router.put("/editPost/updateImageUpload/:id", upload.single("file"), postsController.updateImageUpload);

router.put("/likePost/:id", postsController.likePost);

// Delete Routes
router.delete("/editPost/deletePost/:id", postsController.deletePost);

module.exports = router;