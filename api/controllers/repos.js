const mongoose = require("mongoose");
const Repos = require("../models/repo");


//Create an Repo
exports.repo_create_repo = (req, res, next) => {

	console.log(req.body);

	const repos = new Repos({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		url: req.body.url
	});
	repos.save()
		.then(result => {
			res.status(201).json({
				message: "You have created a new repo successfully",
				repo: result
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};