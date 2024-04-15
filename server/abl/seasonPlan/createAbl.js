const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const seasonPlanDao = require("../../dao/seasonPlan-dao.js");

const schema = {
  type: "object",
  properties: {
    //property: { type: "datatype" },
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
  required: ["startDate", "endDate"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    seasonPlan = seasonPlanDao.create(seasonPlan);
    res.json(seasonPlan);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
