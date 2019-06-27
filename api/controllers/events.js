const mongoose = require("mongoose");
const Events = require("../models/event");

//delete a doctortoggle using toggleid
exports.event_delete_event = (req, res, next) => {
  Events.deleteMany()
    .exec()
    .then(result => {
      res.status(200).json({
        message: "All events has been deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};



//create an event in the document
exports.event_create_event = (req, res, next) => {
  const eventId = req.body.eventId;

  Events.findOne({
      eventId
    })
    .then(eventid => {
      if (eventid) {
        res.status(400).json({
          message: "The event with eventid already exist"
        });
      } else {
        const event = new Events({
          _id: new mongoose.Types.ObjectId(),
          eventId: req.body.eventId,
          type: req.body.type,
          actor: req.body.actorId,
          repo: req.body.repoId
        });
        event
          .save()

          .then(result => {
            res.status(201).json({
              message: "You have successfully created a new event",
              newEvent: result
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    });
};



//get all  event in the document
exports.event_get_event = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Events.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Events.find()
        .populate('actor', ['_id', 'login', 'avatar_url'])
        .populate('repo', ['_id', 'name', 'url'])
        .sort({
          eventId: 1
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(result => {
      res.status(200).json({
        message: 'Allevents fetched successfully',
        count: result.length,
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        currentPage: currentPage,
        events: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



////get all  events in the document for an actor using actor id
exports.event_get_actorId_event = (req, res, next) => {

  console.log('Actor ID:', req.params.actorId)
  const currentPage = req.query.page || 1;
  const perPage = 2;
  const actor = req.params.actorId;
  let totalItems;
  Events.find({
      actor
    })
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Events.find({
          actor
        })
        .populate('actor', ['_id', 'login', 'avatar_url'])
        .populate('repo', ['_id', 'name', 'url'])
        .sort({
          eventId: 1
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(result => {
      if (result) {
        res.status(200).json({
          message: 'All events for an actor using actor Id fetched successfully',
          count: result.length,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / perPage),
          currentPage: currentPage,
          events: result
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for actor Id"
        });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



//get all  actors events and count
exports.event_get_actor_event_event = (req, res, next) => {

  Events.aggregate([{
      $group: {
        _id: "$actor",
        // data: {
        //   $push: "$$ROOT"
        // },
        count: {
          $sum: 1
        }
      }
    }])
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: "All facility booking count has been fetched",
        event: result

      });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};