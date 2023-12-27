const { Router } = require("express");
const bikeController = require("../controllers/bikeControllers");

const router = Router();

router.get("/", bikeController.getBikes);
router.post("/", bikeController.createBike);
router.delete("/:id", bikeController.deleteBike);
router.patch("/:id", bikeController.updateBike);

module.exports = router;
