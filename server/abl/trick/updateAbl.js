const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const trickDao = require("../../dao/trick-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    image: { type: "string" },
    description: { type: "string" },

    difficulty: { type: "integer" },
    feature: { type: "string" },

    points: { type: "integer" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let trick = req.body;

    // validate input
    const valid = ajv.validate(schema, trick);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedEvent = trickDao.update(trick);
    if (!updatedEvent) {
      res.status(404).json({
        code: "trickNotFound",
        message: `Trick ${trick.id} not found`,
      });
      return;
    }

    res.json(updatedEvent);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
