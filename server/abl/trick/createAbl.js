const Ajv = require("ajv");
const ajv = new Ajv();

const trickDao = require("../../dao/trick-dao.js");

const schema = {
  type: "object",
  properties: {
    //property: { type: "datatype" },
    name: { type: "string" },
    image: { type: "string" },
    description: { type: "string" },

    difficulty: { type: "integer" },
    feature: { type: "string" },

    points: { type: "integer" },
  },
  required: ["name", "image", "description", "difficulty", "feature", "points"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let trick = req.body;
    console.log(trick);

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

    trick = trickDao.create(trick);
    res.json(trick);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
