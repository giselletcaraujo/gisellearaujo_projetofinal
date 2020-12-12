const express = require("express")
const router = express.Router()
const controller = require("../controllers/communitiesController")

router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.post("/", controller.postCommunity)
router.delete("/:id", controller.deleteCommunity)
router.put("/:id", controller.putCommunity)


module.exports = router