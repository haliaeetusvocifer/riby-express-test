const express = require("express");
const router = express.Router();


const repoController = require('../controllers/repos');

//Create an Repo
router.post("/", repoController.repo_create_repo);


module.exports = router;