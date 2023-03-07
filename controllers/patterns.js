const Pattern = require("../models/Pattern");

module.exports = {

    createPattern: async (req, res) => {
        try {
          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);

          await Pattern.create({
              patternTitle: req.body.patternTitle,
              patternSection: req.body.patternSection,
              image: result.secure_url,
              cloudinaryId: result.public_id,
              post: req.params.id,
              user: req.user.id,
          });
          console.log("Pattern has been added!");
          res.redirect("/post/"+req.params.id);
        } catch (err) {
            console.log(err);
        }
    },
    
   /* deletePattern: async (req, res) => {
        
      }, */
};