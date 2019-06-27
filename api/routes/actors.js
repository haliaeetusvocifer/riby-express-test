const express = require("express");
const router = express.Router();




const actorController = require('../controllers/actors');

//Create an Actor
router.post("/", actorController.actor_create_actor);

//Get all Actor
router.get("/", actorController.actor_get_actor);

//update an Actor avatar
router.put("/actors/:actorId", actorController.actor_update_actor);


module.exports = router;