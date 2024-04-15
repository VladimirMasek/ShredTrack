const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const groupDao = require("../../dao/group-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    creatorId: { type: "string" },
    membersList: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let group = req.body;

    // validate input
    const valid = ajv.validate(schema, group);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedEvent = groupDao.update(group);
    if (!updatedEvent) {
      res.status(404).json({
        code: "groupNotFound",
        message: `Group ${group.id} not found`,
      });
      return;
    }

    res.json(updatedEvent);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
