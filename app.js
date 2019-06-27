const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const MONGODB_URI =
	'mongodb://haliaeetus:ejXBUNncYq20rkMQ@cluster0-shard-00-00-wbyxw.mongodb.net:27017,cluster0-shard-00-01-wbyxw.mongodb.net:27017,cluster0-shard-00-02-wbyxw.mongodb.net:27017/doctoora?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';


mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true
});


// ROutes
const eventRoutes = require("./api/routes/events");
const actorRoutes = require("./api/routes/actors");
const repoRoutes = require("./api/routes/repos");


//Body parser
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});




app.use("/event", eventRoutes);
app.use("/actor", actorRoutes);
app.use("/repo", repoRoutes);



//Error handling
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

//error handling
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;