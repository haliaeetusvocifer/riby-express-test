const express = require("express");
const router = express.Router();

const eventController = require('../controllers/events');




//delet all event in the document
router.delete("/erase", eventController.event_delete_event);

//create an event in the document
router.post("/events", eventController.event_create_event);

//get all  events in the document
router.get("/events", eventController.event_get_event);

//get all  events in the document by an actor using actor id
router.get("/events/actors/:actorId", eventController.event_get_actorId_event);

//get all  actors events and count
router.get("/actors", eventController.event_get_actor_event_event);




module.exports = router;