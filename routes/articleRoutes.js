 
const router = require('express').Router(),
      controller = require('../controllers/articleController'); 

router.get("/articles", controller.index);
router.get("/articles/:id", controller.show);
router.post("/articles", controller.create);
router.put("/articles/:id", controller.update);
router.delete("/articles/:id", controller.delete);

module.exports = router;