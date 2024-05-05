const Ajv = require("ajv");
const ajv = new Ajv();
const seasonPlanDao = require("../../dao/seasonPlan-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetUserTrickListAbl(req, res) {
  try {
    // Get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // Validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Read user's season plan by userId
    const userTrickList = seasonPlanDao.getUserTrickList(reqParams.id);
    if (!userTrickList) {
      res.status(404).json({
        code: "seasonPlanNotFound",
        message: `SeasonPlan for user ${reqParams.id} not found`,
      });
      return;
    }

    res.json(userTrickList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetUserTrickListAbl;
