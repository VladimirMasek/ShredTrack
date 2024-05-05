const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const seasonPlanDao = require("../../dao/seasonPlan-dao.js");

const schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    trickId: { type: "string" },
    finished: { type: "integer", enum: [0, 1] },
  },
  required: ["userId", "trickId", "finished"],
  additionalProperties: false,
};

async function UpdateUserTrickStatusAbl(req, res) {
  try {
    let seasonPlan = req.body;

    // Validate input
    const valid = ajv.validate(schema, seasonPlan);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Update the user trick status in the DAO
    const updatedEvent = seasonPlanDao.updateUserTrickStatus(
      seasonPlan.userId,
      seasonPlan.trickId,
      seasonPlan.finished
    );
    if (!updatedEvent) {
      res.status(404).json({
        code: "seasonPlanNotFound",
        message: `SeasonPlan ${seasonPlan.userId} not found`,
      });
      return;
    }

    res.json(updatedEvent);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateUserTrickStatusAbl;
