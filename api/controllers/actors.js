const mongoose = require("mongoose");
const Actors = require("../models/actor");


//Create an Actor
exports.actor_create_actor = (req, res, next) => {

  console.log(req.body);

  const actors = new Actors({
    _id: new mongoose.Types.ObjectId(),
    login: req.body.login,
    avatar_url: req.body.avatar_url,

  });
  actors
    .save()

    .then(result => {

      res.status(201).json({
        message: "You have created a new actor successfully",
        actor: result
      })

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


//get all  actors in the document
exports.actor_get_actor = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Actors.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Actors.find()
        .sort({
          eventId: 1
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(result => {
      res.status(200).json({
        message: 'All Actors fetched successfully',
        count: result.length,
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        currentPage: currentPage,
        actors: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



//update an Actor avatar
exports.actor_update_actor = (req, res, next) => {
  console.log(req.body)
  const actorId = req.params.actorId;
  const avatar_url = req.body.avatar_url;

  Actors.findById(actorId)
    .then(actors => {
      console.log(actors)
      if (!actors) {
        const error = new Error('Could not find the Id for the said actor');
        error.statusCode = 404;
        throw error;
      }
      actors.avatar_url = avatar_url;

      return actors.save();
    })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'actor record updated!',
        actor: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};