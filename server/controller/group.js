const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/group/getAbl");
const ListAbl = require("../abl/group/listAbl");
const CreateAbl = require("../abl/group/createAbl");
const UpdateAbl = require("../abl/group/updateAbl");
const DeleteAbl = require("../abl/group/deleteAbl");
const GetUsersGroupsAbl = require("../abl/group/getUsersGroupsAbl");

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

router.get("/getUsersGroups", (req, res) => {
  GetUsersGroupsAbl(req, res);
});

module.exports = router;
