const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const seasonPlanDao = require("../../dao/seasonPlan-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    startDate: { type: "string", format: "date-time" },
    endDate: { type: "string", format: "date-time" },
    userId: { type: "string" },
    trickList: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          finished: { type: "integer", enum: [0, 1] },
        },
        required: ["id", "finished"],
        additionalProperties: false,
      },
    },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let seasonPlan = req.body;

    // validate input
    const valid = ajv.validate(schema, seasonPlan);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedEvent = seasonPlanDao.update(seasonPlan);
    if (!updatedEvent) {
      res.status(404).json({
        code: "seasonPlanNotFound",
        message: `SeasonPlan ${seasonPlan.id} not found`,
      });
      return;
    }

    res.json(updatedEvent);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
