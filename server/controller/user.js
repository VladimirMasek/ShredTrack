const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/user/getAbl");
const ListAbl = require("../abl/user/listAbl");
const CreateAbl = require("../abl/user/createAbl");
const UpdateAbl = require("../abl/user/updateAbl");
const UpdateAddOrSubtractPointsAbl = require("../abl/user/UpdateAddOrSubtractPointsAbl");
const DeleteAbl = require("../abl/user/deleteAbl");
const GetUserListByIdsAbl = require("../abl/user/getUserListByIdsAbl");

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

router.post("/updateAddOrSubtractPoints", (req, res) => {
  UpdateAddOrSubtractPointsAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

router.post("/getUserListByIds", (req, res) => {
  GetUserListByIdsAbl(req, res);
});

module.exports = router;
