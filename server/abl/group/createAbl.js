const Ajv = require("ajv");
const ajv = new Ajv();

const groupDao = require("../../dao/group-dao.js");

const schema = {
  type: "object",
  properties: {
    //property: { type: "datatype" },
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    group = groupDao.create(group);
    res.json(group);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
