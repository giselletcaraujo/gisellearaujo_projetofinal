const express = require("express")
const router = express.Router()
const controller = require("../controllers/communityController")

router.get("/", controller.getAllCommunities)
router.post("/", controller.createCommunity)
router.get("/:id", controller.getCommunity)
router.put("/:id", controller.updateCommunity)
router.patch("/:id/received", controller.updateReceivedStatus)
router.delete("/:id", controller.deleteCommunity)


module.exports = router