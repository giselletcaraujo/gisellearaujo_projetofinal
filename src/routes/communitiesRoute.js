const express = require("express")
const router = express.Router()
const controller = require("../controllers/communitiesController")

router.get("/", controller.getAll)
router.get("/genre", controller.getByGenre)
router.get("/:id", controller.getById)
router.post("/", controller.postCommunity)
router.delete("/genre", controller.deleteCommunitiesByGenre)
router.delete("/:id", controller.deleteCommunity)
router.put("/:id", controller.putCommunity)


module.exports = router