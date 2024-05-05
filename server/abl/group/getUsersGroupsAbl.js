const Ajv = require("ajv");
const ajv = new Ajv();
const groupDao = require("../../dao/group-dao.js");

const schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
  },
  required: ["userId"],
  additionalProperties: false,
};

async function GetUsersGroupsAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.userId ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const group = groupDao.getUsersGroups(reqParams.userId);
    if (!group) {
      res.status(404).json({
        code: "groupNotFound",
        message: `Group ${reqParams.userId} not found`,
      });
      return;
    }

    res.json(group);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetUsersGroupsAbl;
