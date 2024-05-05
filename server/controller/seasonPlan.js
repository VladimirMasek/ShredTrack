const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/seasonPlan/getAbl");
const GetUserTrickListAbl = require("../abl/seasonPlan/getUserTrickListAbl");
const UpdateUserTrickStatusAbl = require("../abl/seasonPlan/updateUserTrickStatusAbl");
const UpdateAddOrRemoveTrickAbl = require("../abl/seasonPlan/updateAddOrRemoveTrickAbl");
const ListAbl = require("../abl/seasonPlan/listAbl");
const CreateAbl = require("../abl/seasonPlan/createAbl");
const UpdateAbl = require("../abl/seasonPlan/updateAbl");
const DeleteAbl = require("../abl/seasonPlan/deleteAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/getUserTrickList", (req, res) => {
  GetUserTrickListAbl(req, res);
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

router.post("/updateUserTrickStatus", (req, res) => {
  UpdateUserTrickStatusAbl(req, res);
});

router.post("/updateAddOrRemoveTrick", (req, res) => {
  UpdateAddOrRemoveTrickAbl(req, res);
});

module.exports = router;
