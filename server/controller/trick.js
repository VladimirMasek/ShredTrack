const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/trick/getAbl");
const ListAbl = require("../abl/trick/listAbl");
const CreateAbl = require("../abl/trick/createAbl");
const UpdateAbl = require("../abl/trick/updateAbl");
const DeleteAbl = require("../abl/trick/deleteAbl");
const listByFeatureAndDifficultyAbl = require("../abl/trick/listByFeatureAndDifficultyAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

router.get("/listByFeatureAndDifficulty", (req, res) => {
  listByFeatureAndDifficultyAbl(req, res);
});

module.exports = router;
